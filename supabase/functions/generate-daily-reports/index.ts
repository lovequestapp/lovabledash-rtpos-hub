import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { storeId, reportDate } = await req.json()
    const targetDate = reportDate || new Date().toISOString().split('T')[0]

    // Generate store scorecard data
    const scorecard = await generateStoreScorecard(supabase, storeId, targetDate)
    
    // Generate rep leaderboard
    const leaderboard = await generateRepLeaderboard(supabase, storeId, targetDate)
    
    // Generate inventory alerts
    const inventoryAlerts = await generateInventoryAlerts(supabase, storeId)
    
    // Calculate KPI baselines and check for anomalies
    await updateKPIBaselines(supabase, storeId, targetDate)
    const anomalies = await checkForAnomalies(supabase, storeId, targetDate)

    const report = {
      storeId,
      reportDate: targetDate,
      scorecard,
      leaderboard,
      inventoryAlerts,
      anomalies,
      generatedAt: new Date().toISOString()
    }

    // Store report for later retrieval
    await supabase
      .from('daily_reports')
      .upsert({
        store_id: storeId,
        report_date: targetDate,
        report_data: report
      }, {
        onConflict: 'store_id,report_date'
      })

    return new Response(
      JSON.stringify({ success: true, report }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Report generation error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function generateStoreScorecard(supabase: any, storeId: string, date: string) {
  const startOfDay = `${date}T00:00:00.000Z`
  const endOfDay = `${date}T23:59:59.999Z`

  // Daily metrics
  const { data: dailyStats } = await supabase
    .from('transactions')
    .select(`
      total_amount,
      transaction_type,
      employee_id
    `)
    .eq('store_id', storeId)
    .gte('transaction_date', startOfDay)
    .lte('transaction_date', endOfDay)

  const totalRevenue = dailyStats
    ?.filter(t => t.transaction_type === 'sale')
    .reduce((sum, t) => sum + parseFloat(t.total_amount), 0) || 0

  const totalRefunds = dailyStats
    ?.filter(t => t.transaction_type === 'refund')
    .reduce((sum, t) => sum + parseFloat(t.total_amount), 0) || 0

  const transactionCount = dailyStats?.filter(t => t.transaction_type === 'sale').length || 0
  const averageTicket = transactionCount > 0 ? totalRevenue / transactionCount : 0

  // Active employees today
  const activeEmployees = new Set(dailyStats?.map(t => t.employee_id).filter(Boolean)).size

  return {
    date,
    totalRevenue,
    totalRefunds,
    netRevenue: totalRevenue - totalRefunds,
    transactionCount,
    averageTicket,
    activeEmployees
  }
}

async function generateRepLeaderboard(supabase: any, storeId: string, date: string) {
  const startOfDay = `${date}T00:00:00.000Z`
  const endOfDay = `${date}T23:59:59.999Z`

  const { data: repStats } = await supabase
    .from('transactions')
    .select(`
      employee_id,
      total_amount,
      transaction_type,
      employees!inner(name, employee_code)
    `)
    .eq('store_id', storeId)
    .eq('transaction_type', 'sale')
    .gte('transaction_date', startOfDay)
    .lte('transaction_date', endOfDay)

  const repTotals = {}
  
  repStats?.forEach(transaction => {
    const empId = transaction.employee_id
    if (!empId) return

    if (!repTotals[empId]) {
      repTotals[empId] = {
        employeeId: empId,
        name: transaction.employees.name,
        employeeCode: transaction.employees.employee_code,
        totalSales: 0,
        transactionCount: 0
      }
    }

    repTotals[empId].totalSales += parseFloat(transaction.total_amount)
    repTotals[empId].transactionCount += 1
  })

  return Object.values(repTotals)
    .sort((a: any, b: any) => b.totalSales - a.totalSales)
    .slice(0, 10) // Top 10
}

async function generateInventoryAlerts(supabase: any, storeId: string) {
  const { data: lowStock } = await supabase
    .from('inventory_snapshots')
    .select(`
      quantity_on_hand,
      items!inner(name, sku, category)
    `)
    .eq('store_id', storeId)
    .lte('quantity_on_hand', 5) // Items with 5 or fewer in stock
    .order('quantity_on_hand', { ascending: true })

  return lowStock?.map(item => ({
    sku: item.items.sku,
    name: item.items.name,
    category: item.items.category,
    quantityOnHand: item.quantity_on_hand,
    alertLevel: item.quantity_on_hand === 0 ? 'critical' : 'warning'
  })) || []
}

async function updateKPIBaselines(supabase: any, storeId: string, date: string) {
  const currentDate = new Date(date)
  
  // Calculate 7-day baseline
  const sevenDaysAgo = new Date(currentDate)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const { data: sevenDayStats } = await supabase
    .from('transactions')
    .select('total_amount')
    .eq('store_id', storeId)
    .eq('transaction_type', 'sale')
    .gte('transaction_date', sevenDaysAgo.toISOString())
    .lt('transaction_date', currentDate.toISOString())

  const sevenDayAverage = sevenDayStats?.length > 0 
    ? sevenDayStats.reduce((sum, t) => sum + parseFloat(t.total_amount), 0) / 7
    : 0

  // Calculate 28-day baseline
  const twentyEightDaysAgo = new Date(currentDate)
  twentyEightDaysAgo.setDate(twentyEightDaysAgo.getDate() - 28)
  
  const { data: twentyEightDayStats } = await supabase
    .from('transactions')
    .select('total_amount')
    .eq('store_id', storeId)
    .eq('transaction_type', 'sale')
    .gte('transaction_date', twentyEightDaysAgo.toISOString())
    .lt('transaction_date', currentDate.toISOString())

  const twentyEightDayAverage = twentyEightDayStats?.length > 0 
    ? twentyEightDayStats.reduce((sum, t) => sum + parseFloat(t.total_amount), 0) / 28
    : 0

  // Update baselines
  await supabase
    .from('kpi_baselines')
    .upsert([
      {
        store_id: storeId,
        metric_name: 'daily_revenue',
        baseline_value: sevenDayAverage,
        calculation_period: 7,
        last_calculated: new Date().toISOString()
      },
      {
        store_id: storeId,
        metric_name: 'daily_revenue',
        baseline_value: twentyEightDayAverage,
        calculation_period: 28,
        last_calculated: new Date().toISOString()
      }
    ], {
      onConflict: 'store_id,metric_name,calculation_period'
    })
}

async function checkForAnomalies(supabase: any, storeId: string, date: string) {
  const startOfDay = `${date}T00:00:00.000Z`
  const endOfDay = `${date}T23:59:59.999Z`

  // Get today's revenue
  const { data: todayStats } = await supabase
    .from('transactions')
    .select('total_amount')
    .eq('store_id', storeId)
    .eq('transaction_type', 'sale')
    .gte('transaction_date', startOfDay)
    .lte('transaction_date', endOfDay)

  const todayRevenue = todayStats?.reduce((sum, t) => sum + parseFloat(t.total_amount), 0) || 0

  // Get baselines
  const { data: baselines } = await supabase
    .from('kpi_baselines')
    .select('*')
    .eq('store_id', storeId)
    .eq('metric_name', 'daily_revenue')

  const anomalies = []

  for (const baseline of baselines || []) {
    const thresholdAmount = baseline.baseline_value * 0.30 // 30% threshold
    const difference = Math.abs(todayRevenue - baseline.baseline_value)
    
    if (difference > thresholdAmount) {
      const percentageChange = ((todayRevenue - baseline.baseline_value) / baseline.baseline_value) * 100
      
      anomalies.push({
        metricName: baseline.metric_name,
        period: `${baseline.calculation_period}-day`,
        currentValue: todayRevenue,
        baselineValue: baseline.baseline_value,
        percentageChange: Math.round(percentageChange * 100) / 100,
        severity: Math.abs(percentageChange) > 50 ? 'high' : 'medium'
      })
    }
  }

  return anomalies
}