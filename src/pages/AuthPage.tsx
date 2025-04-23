
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

enum AuthMode { LOGIN = "login", SIGNUP = "signup" }

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", first_name: "", last_name: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === AuthMode.LOGIN) {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Logged in!" });
        navigate("/");
      }
    } else {
      // SIGNUP
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.first_name,
            last_name: form.last_name,
          },
        }
      });
      setLoading(false);
      if (error) {
        toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account created", description: "Check your inbox for a confirmation email (if required)." });
        setMode(AuthMode.LOGIN);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{mode === AuthMode.LOGIN ? "Login" : "Sign up"}</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {mode === AuthMode.SIGNUP && (
              <div className="flex gap-2">
                <Input name="first_name" placeholder="First name" required value={form.first_name} onChange={handleChange} />
                <Input name="last_name" placeholder="Last name" required value={form.last_name} onChange={handleChange} />
              </div>
            )}
            <Input name="email" type="email" placeholder="Email" required value={form.email} onChange={handleChange} />
            <Input name="password" type="password" placeholder="Password" required value={form.password} onChange={handleChange} />
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-2">
            <Button type="submit" disabled={loading}>
              {mode === AuthMode.LOGIN ? "Login" : "Sign up"}
            </Button>
            <Button type="button" variant="link" onClick={() => setMode(mode === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN)}>
              {mode === AuthMode.LOGIN ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AuthPage;
