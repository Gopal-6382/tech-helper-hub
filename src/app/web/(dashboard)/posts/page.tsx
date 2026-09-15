// src/app/(dashboard)/community/page.tsx

import Link from "next/link";
import { Plus } from "lucide-react";

import { PostList } from "@/features/posts/components/post-list";

export default function CommunityPage() {
  return (
    <main className="mx-auto w-full max-w-3xl">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Community
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Share problems, ask questions, and help others.
          </p>
        </div>

        <Link
          href="/web/posts/create"
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus size={17} />
          Create post
        </Link>
      </header>

      <PostList />
    </main>
  );
}