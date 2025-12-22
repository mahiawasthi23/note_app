"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail, LockKeyhole, Sparkles } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        router.push("/login?registered=true");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:to-black p-4 overflow-hidden relative">

      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <Card className="w-full max-w-md border-zinc-200/50 shadow-2xl backdrop-blur-md bg-white/90 dark:bg-zinc-900/90 z-10">
        <CardHeader className="space-y-3 pt-8">
          <div className="mx-auto bg-gradient-to-br from-zinc-800 to-black dark:from-zinc-200 dark:to-white p-3 rounded-2xl w-fit shadow-xl">
            <Sparkles className="h-6 w-6 text-white dark:text-black" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center tracking-tight">Create Account</CardTitle>
            <CardDescription className="text-center text-zinc-500 font-medium">
              Join us and start organizing your ideas today.
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 px-8">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest font-bold text-zinc-500">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10 h-11 bg-zinc-50/50 border-zinc-200 focus:ring-2 focus:ring-black transition-all"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-zinc-500">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-11 bg-zinc-50/50 border-zinc-200 focus:ring-2 focus:ring-black transition-all"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                Password
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  required
                  className="pl-10 pr-10 h-11 bg-zinc-50/50 border-zinc-200 focus:ring-2 focus:ring-black transition-all"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-lg text-sm text-center font-medium">
                {error}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-6 pb-10 px-8">
            <Button
              type="submit"
              className="mt-6 w-full h-11 bg-black hover:bg-zinc-800 text-white shadow-lg transition-all active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Get Started"
              )}
            </Button>

            <div className="text-sm text-center text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-black dark:text-white font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Log In
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}