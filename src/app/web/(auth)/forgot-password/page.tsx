// src/app/(auth)/forgot-password/page.tsx

import { ForgotPasswordForm } from "@/frontend/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <ForgotPasswordForm />
    </main>
  );
}
