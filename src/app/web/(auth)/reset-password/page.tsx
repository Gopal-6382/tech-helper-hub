// src/app/(auth)/reset-password/page.tsx

import { ResetPasswordForm } from "@/frontend/features/auth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <ResetPasswordForm />
    </main>
  );
}
