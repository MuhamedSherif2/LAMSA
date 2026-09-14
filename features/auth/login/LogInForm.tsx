"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.services";
import type { Login } from "@/types/auth.types";
import InputsFeild from "../register/Input";

function LogInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("من فضلك املأ كل الحقول");
      return;
    }

    const data: Login = { email, password };

    setLoading(true);

    try {
      const res = await authService.login(data);
      console.log("✅ Login:", res.data);

      const token = res.data?.data?.token;
      const user = res.data?.data?.user;

      if (token) localStorage.setItem("lamsa_token", token);
      if (user) localStorage.setItem("lamsa_user", JSON.stringify(user));

      toast.success("تم الدخول بنجاح");

      setTimeout(() => router.push("/"), 700);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "إيميل أو باسورد غلط";
      toast.error(message);
      console.error("❌ Login error:", err?.response?.data);
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