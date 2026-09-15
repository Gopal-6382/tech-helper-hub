// src/app/web/(auth)/login/page.tsx

import { LoginForm } from "@/frontend/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <LoginForm />
    </main>
  );
}
