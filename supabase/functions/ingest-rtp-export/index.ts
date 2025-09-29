import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ImportJobData {
  storeId: string
  jobType: 'api_import' | 'email_import' | 'manual_import'
  sourceFile?: string
  data: any[]
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

    const { storeId, jobType, sourceFile, data }: ImportJobData = await req.json()

    // Create import job record
    const { data: job, error: jobError } = await supabase
      .from('import_jobs')
      .insert({
        store_id: storeId,
        job_type: jobType,
        source_file: sourceFile,
        status: 'running',
        started_at: new Date().toISOString()
      })
      .select()
      .single()

    if (jobError) {
      throw jobError
    }

    let recordsProcessed = 0
    let recordsFailed = 0
    const errors: string[] = []

    // Process each data record
    for (const record of data) {
      try {
        await processRecord(supabase, storeId, record)
        recordsProcessed++
      } catch (error) {
        recordsFailed++
        errors.push(`Record ${recordsProcessed + recordsFailed}: ${error.message}`)
      }
    }

    // Update job status
    await supabase
      .from('import_jobs')
      .update({
        status: recordsFailed > 0 ? 'completed' : 'completed',
        records_processed: recordsProcessed,
        records_failed: recordsFailed,
        error_details: errors.length > 0 ? errors.join('\n') : null,
        completed_at: new Date().toISOString()
      })
      .eq('id', job.id)

    return new Response(
      JSON.stringify({
        success: true,
        jobId: job.id,
        recordsProcessed,
        recordsFailed,
        errors: errors.slice(0, 10) // Return first 10 errors
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Import error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function processRecord(supabase: any, storeId: string, record: any) {
  // Determine record type and process accordingly
  if (record.transaction_id) {
    await processTransaction(supabase, storeId, record)
  } else if (record.employee_code) {
    await processEmployee(supabase, storeId, record)
  } else if (record.sku) {
    await processItem(supabase, storeId, record)
  } else if (record.inventory_count !== undefined) {
    await processInventorySnapshot(supabase, storeId, record)
  }
}

async function processTransaction(supabase: any, storeId: string, record: any) {
  // Find or create employee
  let employeeId = null
  if (record.employee_code) {
    const { data: employee } = await supabase
      .from('employees')
      .select('id')
      .eq('store_id', storeId)
      .eq('employee_code', record.employee_code)
      .single()
    
    if (employee) {
      employeeId = employee.id
    }
  }

  // Insert transaction with upsert to handle duplicates
  const { data: transaction, error } = await supabase
    .from('transactions')
    .upsert({
      store_id: storeId,
      employee_id: employeeId,
      transaction_type: record.transaction_type || 'sale',
      transaction_date: record.transaction_date,
      total_amount: parseFloat(record.total_amount || 0),
      tax_amount: parseFloat(record.tax_amount || 0),
      discount_amount: parseFloat(record.discount_amount || 0),
      payment_method: record.payment_method,
      customer_phone: record.customer_phone,
      rt_pos_transaction_id: record.transaction_id,
      notes: record.notes
    }, {
      onConflict: 'rt_pos_transaction_id,store_id',
      ignoreDuplicates: true
    })
    .select()

  if (error) throw error

  // Process line items if present
  if (record.line_items && Array.isArray(record.line_items) && transaction?.[0]) {
    for (const lineItem of record.line_items) {
      // Find item by SKU
      const { data: item } = await supabase
        .from('items')
        .select('id')
        .eq('store_id', storeId)
        .eq('sku', lineItem.sku)
        .single()

      if (item) {
        await supabase
          .from('transaction_items')
          .upsert({
            transaction_id: transaction[0].id,
            item_id: item.id,
            quantity: parseInt(lineItem.quantity || 1),
            unit_price: parseFloat(lineItem.unit_price || 0),
            total_price: parseFloat(lineItem.total_price || 0)
          }, {
            onConflict: 'transaction_id,item_id',
            ignoreDuplicates: true
          })
      }
    }
  }
}

async function processEmployee(supabase: any, storeId: string, record: any) {
  await supabase
    .from('employees')
    .upsert({
      store_id: storeId,
      employee_code: record.employee_code,
      name: record.name,
      role: record.role,
      hire_date: record.hire_date,
      is_active: record.is_active !== false,
      rt_pos_employee_id: record.employee_id
    }, {
      onConflict: 'store_id,employee_code',
      ignoreDuplicates: false
    })
}

async function processItem(supabase: any, storeId: string, record: any) {
  await supabase
    .from('items')
    .upsert({
      store_id: storeId,
      sku: record.sku,
      name: record.name,
      category: record.category,
      brand: record.brand,
      cost_price: parseFloat(record.cost_price || 0),
      retail_price: parseFloat(record.retail_price || 0),
      is_active: record.is_active !== false,
      rt_pos_item_id: record.item_id
    }, {
      onConflict: 'store_id,sku',
      ignoreDuplicates: false
    })
}

async function processInventorySnapshot(supabase: any, storeId: string, record: any) {
  // Find item by SKU
  const { data: item } = await supabase
    .from('items')
    .select('id, cost_price, retail_price')
    .eq('store_id', storeId)
    .eq('sku', record.sku)
    .single()

  if (item) {
    const quantity = parseInt(record.inventory_count || 0)
    await supabase
      .from('inventory_snapshots')
      .upsert({
        store_id: storeId,
        item_id: item.id,
        snapshot_date: record.snapshot_date || new Date().toISOString().split('T')[0],
        quantity_on_hand: quantity,
        value_at_cost: quantity * (item.cost_price || 0),
        value_at_retail: quantity * (item.retail_price || 0)
      }, {
        onConflict: 'store_id,item_id,snapshot_date',
        ignoreDuplicates: false
      })
  }
}