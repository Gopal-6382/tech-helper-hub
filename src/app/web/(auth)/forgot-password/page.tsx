// src/app/web/auth/forgot-password/page.tsx
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-6 border rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Enter your email to receive a recovery link.
        </p>
      </div>
    </div>
  );
}
