// src/app/(dashboard)/community/create/page.tsx

import { PostForm } from "@/features/posts/components/posts-form";

export default function CreatePostPage() {
  return (
    <main>
      <div className="mx-auto mb-8 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold">Create post</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Describe your problem clearly so the community can help.
        </p>
      </div>

      <PostForm />
    </main>
  );
}
