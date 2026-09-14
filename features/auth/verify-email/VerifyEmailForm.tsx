"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {authService} from "@/services/auth.services"
import type { VerifyEmail as VerifyEmailType } from "@/types/auth.types";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailFromUrl) setEmail(emailFromUrl);
  }, [emailFromUrl]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("الإيميل مطلوب");
      return;
    }

    if (otp.length !== 6) {
      toast.error("من فضلك أدخل 6 أرقام");
      return;
    }

    const data: VerifyEmailType = { email, otp };

    setLoading(true);

    try {
      const res = await authService.verifyEmail(data);
      console.log("✅ Verify:", res.data);

      toast.success("تم التحقق بنجاح! هنوديك للدخول");

      setTimeout(() => router.push("/login"), 1000);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "كود غلط أو حصل خطأ";
      toast.error(message);
      console.error("❌ Verify error:", err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {emailFromUrl ? (
        <p className="text-sm text-muted-foreground text-center">
          بعتنا كود التحقق على{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      ) : (
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {loading ? "Verifying..." : "Verify Email"}
      </Button>
    </form>
  );
}

export default VerifyEmailForm;