
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
  userType?: string;
}

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUp, resetPassword } = useAuth();
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<AuthFormData>();

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        await signIn(data.email, data.password);
      } else {
        if (data.password !== data.confirmPassword) {
          throw new Error("Passwords don't match");
        }
        await signUp(data.email, data.password, data.firstName || '', data.lastName || '');
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = watch('email');
    if (!email) {
      alert('Please enter your email address first');
      return;
    }
    try {
      await resetPassword(email);
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 to-sage-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        <Card className="glass-effect">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-2xl font-bold text-primary">AgriTech</span>
            </div>
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome Back" : "Join AgriTech"}
            </CardTitle>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Sign in to your account" 
                : "Create your account to get started"
              }
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="userType">I am a</Label>
                  <Select onValueChange={(value) => setValue('userType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">Farmer</SelectItem>
                      <SelectItem value="consumer">Consumer</SelectItem>
                      <SelectItem value="landlord">Landlord</SelectItem>
                      <SelectItem value="lessee">Land Lessee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      {...register('firstName', { required: !isLogin })}
                    />
                    {errors.firstName && <p className="text-sm text-red-500">First name is required</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      {...register('lastName', { required: !isLogin })}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">Last name is required</p>}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p className="text-sm text-red-500">Valid email is required</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  {...register('password', { required: true, minLength: 6 })}
                />
                {errors.password && <p className="text-sm text-red-500">Password must be at least 6 characters</p>}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    {...register('confirmPassword', { required: !isLogin })}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500">Please confirm your password</p>}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full gradient-primary text-white hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>

            {isLogin && (
              <div className="mt-4 text-center">
                <Button
                  variant="link"
                  onClick={handleForgotPassword}
                  className="text-sm text-primary"
                >
                  Forgot your password?
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 p-0 h-auto text-primary"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </Button>
              </p>
            </div>

            {!isLogin && (
              <div className="mt-4 text-xs text-center text-muted-foreground">
                <p>
                  Please check your email after signing up to verify your account.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
