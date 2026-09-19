// src/app/web/success/page.tsx
import Link from "next/link";
import { Button } from "@/frontend/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/frontend/components/ui/card";

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            ✓
          </div>
          <CardTitle className="text-2xl">Action Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your request or transaction has been processed successfully.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-3">
          <Button>
            <Link href="/web/dashboard">Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
