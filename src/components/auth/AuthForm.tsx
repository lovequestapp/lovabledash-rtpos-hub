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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-background to-sage-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-navy-800 rounded-3xl mb-6 shadow-luxury">
            <Building2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground mb-2">S & S Wireless</h1>
          <p className="text-muted-foreground text-lg font-light">
            Multi-store management platform
          </p>
        </div>

        <Card className="luxury-card border-border/30 shadow-premium backdrop-blur-xl animate-slide-up">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-serif text-foreground">Welcome</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Access your sophisticated store management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Temporary bypass button */}
            <div className="mb-6 p-4 bg-gradient-to-r from-sage-50 to-cream-50 rounded-xl border border-sage-200/50">
              <p className="text-sm text-sage-700 mb-3 font-medium">Development Access:</p>
              <Button 
                variant="outline" 
                className="w-full sophisticated-border hover:bg-sage-50 hover:text-sage-800 transition-all duration-300" 
                onClick={onBypassLogin}
              >
                Continue as Demo User
              </Button>
            </div>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-sage-50 border border-sage-200/50">
                <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:text-primary">Access Account</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-primary">Create Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-5">
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
                      className="h-12 sophisticated-border focus:ring-accent focus:border-accent"
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
                      className="h-12 sophisticated-border focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 premium-button" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Access Dashboard
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <Button
                    variant="link"
                    onClick={handleMagicLink}
                    disabled={loading || !email}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    Send magic link instead
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
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