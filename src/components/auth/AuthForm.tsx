import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2, CreditCard, ShieldCheck, BarChart3, Clock, Users } from "lucide-react";

interface AuthFormProps {
  onBypassLogin?: () => void;
}

export const AuthForm = ({ onBypassLogin }: AuthFormProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Sign In Failed", description: error.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Sign In Failed", description: "An unexpected error occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast({ title: "Sign Up Failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account Created", description: "Please check your email to confirm your account" });
      }
    } catch (error) {
      toast({ title: "Sign Up Failed", description: "An unexpected error occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        toast({ title: "Magic Link Failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Magic Link Sent", description: "Check your email for the login link" });
      }
    } catch (error) {
      toast({ title: "Magic Link Failed", description: "An unexpected error occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: CreditCard, label: "POS Transactions" },
    { icon: Clock, label: "Time Tracking" },
    { icon: BarChart3, label: "Revenue Mgmt" },
    { icon: Users, label: "Team Mgmt" },
  ];

  return (
    <div className="min-h-screen flex bg-background safe-area-top safe-area-bottom">
      {/* Left panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[hsl(220,20%,10%)] via-[hsl(220,20%,14%)] to-[hsl(0,72%,30%)] relative overflow-hidden items-center justify-center p-12">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(0,72%,43%)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[hsl(0,72%,43%)]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 border border-white/5 rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 border border-white/5 rounded-full translate-x-8 translate-y-8" />

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[hsl(0,72%,43%)] flex items-center justify-center shadow-lg shadow-red-900/30">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold text-white tracking-tight">
              Cardinal POS
            </h1>
          </div>
          
          <p className="text-xl text-white/70 mb-10 leading-relaxed font-light">
            The all-in-one point of sale platform built for modern businesses. Transactions, time tracking, revenue, inventory — one powerful system.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <f.icon className="w-5 h-5 text-[hsl(0,72%,60%)]" />
                <span className="text-sm text-white/80 font-medium">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-sm text-white/50">Enterprise-grade security · PCI compliant</span>
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">
                Cardinal POS
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">All-in-one point of sale platform</p>
          </div>

          <Card className="border border-border shadow-xl bg-card">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-display font-bold text-center">
                {isLogin ? 'Welcome back' : 'Get started'}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin ? 'Sign in to your Cardinal POS account' : 'Create your Cardinal POS account'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Demo bypass */}
              <Button 
                variant="outline" 
                className="w-full h-11 font-medium border-dashed" 
                onClick={onBypassLogin}
              >
                Continue as Demo User
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
                </div>
              </div>

              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-11">
                  <TabsTrigger value="signin" className="text-sm font-medium">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="text-sm font-medium">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-4 mt-5">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="email" type="email" placeholder="you@company.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required disabled={loading}
                        className="h-11" autoComplete="email" inputMode="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <Input
                        id="password" type="password" placeholder="••••••••"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required disabled={loading}
                        className="h-11" autoComplete="current-password"
                      />
                    </div>
                    <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Sign In
                    </Button>
                  </form>
                  <div className="text-center">
                    <Button variant="link" onClick={handleMagicLink} disabled={loading || !email}
                      className="text-sm text-muted-foreground">
                      Send magic link instead
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="mt-5">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="signup-email" type="email" placeholder="you@company.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required disabled={loading}
                        className="h-11" autoComplete="email" inputMode="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                      <Input
                        id="signup-password" type="password" placeholder="Min 6 characters"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required disabled={loading} minLength={6}
                        className="h-11" autoComplete="new-password"
                      />
                    </div>
                    <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to Cardinal POS's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};
