// src/app/web/auth/login/page.tsx
import WebLayout from "../../layout";
export default function LoginPage() {
  return (
    <WebLayout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md p-6 border rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          {/* Insert your LoginForm component here */}
        </div>
      </div>
    </WebLayout>
  );
}
