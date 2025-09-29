import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bypassLogin, setBypassLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for bypass mode first
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('bypass') === 'true' || localStorage.getItem('bypass_login') === 'true') {
      setBypassLogin(true);
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session && !bypassLogin) {
    return <AuthForm onBypassLogin={() => {
      localStorage.setItem('bypass_login', 'true');
      setBypassLogin(true);
    }} />;
  }

  return <DashboardLayout />;
};

export default Index;
