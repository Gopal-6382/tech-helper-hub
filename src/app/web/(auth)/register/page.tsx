// src/app/(auth)/register/page.tsx

import { RegisterForm } from "@/frontend/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <RegisterForm />
    </main>
  );
}
