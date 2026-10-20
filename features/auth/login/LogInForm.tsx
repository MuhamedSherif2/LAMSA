
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.services";
import type { Login } from "@/types/auth.types";
import InputsFeild from "../register/Input";
import { cookieHelper, TOKEN_KEY } from "@/lib/cookies";

function LogInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error("Please fill all inputs");
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await authService.login({ email, password });
  
      const token = res.data?.token;
      const user = res.data?.user;
  
      if (!token || !user) {
        toast.error("Invalid login response");
        return;
      }
  
      if (user.role !== "admin" && user.role !== "user") {
        toast.error("Invalid user role");
        return;
      }
  
      cookieHelper.set("lamsa_token", token);
      cookieHelper.set("lamsa_user_role", user.role);
  
      toast.success("Login successful");
  
      const redirectTo =
        user.role === "admin" ? "/dashboard" : "/";
  
      window.location.replace(redirectTo);
    } catch (error: unknown) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputsFeild
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputsFeild
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}

export default LogInForm;