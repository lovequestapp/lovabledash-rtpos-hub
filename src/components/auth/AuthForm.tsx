import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2, Building2 } from "lucide-react";

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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Sign In Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created",
          description: "Please check your email to confirm your account",
        });
      }
    } catch (error) {
      toast({
        title: "Sign Up Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (error) {
        toast({
          title: "Magic Link Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Magic Link Sent",
          description: "Check your email for the login link",
        });
      }
    } catch (error) {
      toast({
        title: "Magic Link Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 safe-area-top safe-area-bottom relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight">
              StoreManagerAI
            </h1>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <p className="text-muted-foreground text-sm md:text-base font-semibold tracking-widest uppercase">
                  Intelligent Retail Management
                </p>
                <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-purple-600 to-transparent"></div>
            </div>
            <p className="text-sm text-muted-foreground/80 font-light">Transform your retail operations with AI-powered insights</p>
          </div>
        </div>

        <Card className="border-2 border-primary/10 shadow-2xl backdrop-blur-xl bg-white/95 animate-scale-in hover:shadow-primary/20 transition-all duration-300">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </CardTitle>
            <CardDescription className="text-center text-base">
              {isLogin ? 'Sign in to your account to continue' : 'Create your account to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {/* Temporary bypass button - Mobile optimized */}
            <div className="p-3 md:p-4 bg-gradient-to-r from-sage-50 to-cream-50 rounded-xl border border-sage-200/50">
              <p className="text-sm text-sage-700 mb-3 font-medium">Development Access:</p>
              <Button 
                variant="outline" 
                className="w-full sophisticated-border hover:bg-sage-50 hover:text-sage-800 transition-all duration-300 mobile-button" 
                onClick={onBypassLogin}
              >
                Continue as Demo User
              </Button>
            </div>
            
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-sage-50 border border-sage-200/50 h-12">
                <TabsTrigger 
                  value="signin" 
                  className="data-[state=active]:bg-white data-[state=active]:text-primary text-sm mobile-touch-target"
                >
                  Access Account
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="data-[state=active]:bg-white data-[state=active]:text-primary text-sm mobile-touch-target"
                >
                  Create Account
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4 md:space-y-5 mt-4 md:mt-6">
                <form onSubmit={handleSignIn} className="space-y-4 md:space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="h-12 md:h-12 sophisticated-border focus:ring-accent focus:border-accent mobile-input"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      className="h-12 md:h-12 sophisticated-border focus:ring-accent focus:border-accent mobile-input"
                      autoComplete="current-password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 md:h-12 premium-button focus-ring" 
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Access Dashboard
                  </Button>
                </form>
                
                <div className="mt-4 md:mt-6 text-center">
                  <Button
                    variant="link"
                    onClick={handleMagicLink}
                    disabled={loading || !email}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors mobile-touch-target"
                  >
                    Send magic link instead
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="mt-4 md:mt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium text-foreground">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="h-12 sophisticated-border focus:ring-accent focus:border-accent mobile-input"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium text-foreground">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      minLength={6}
                      className="h-12 sophisticated-border focus:ring-accent focus:border-accent mobile-input"
                      autoComplete="new-password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 premium-button focus-ring" 
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};