"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import InputsFeild from "./Input";
import { authService } from "@/services/auth.services";
import type { Register } from "@/types/auth.types";

function FormRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: Register = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phoneNumber: String(formData.get("phoneNumber") || ""),
      password: String(formData.get("password") || ""),
    };

    setLoading(true);

    try {
      const res = await authService.register(data);
      console.log("✅ Register:", res.data);

      toast.success("تم التسجيل! هيوصلك كود على الإيميل");

      setTimeout(() => {
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      }, 800);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "حصل خطأ، جرّب تاني";
      toast.error(message);
      console.error("❌ Register error:", err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputsFeild
        label="Full Name"
        name="name"
        type="text"
        placeholder="Enter your full name"
      />

      <InputsFeild
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />

      <InputsFeild
        label="Phone Number"
        name="phoneNumber"
        type="text"
        placeholder="Enter your phone number"
      />

      <InputsFeild
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        fieldDescription="At least 6 characters"
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}

export default FormRegister;