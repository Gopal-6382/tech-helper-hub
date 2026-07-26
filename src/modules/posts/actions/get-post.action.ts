import { NextResponse } from "next/server";
import { PostService } from "../services/post.service";

const postService = new PostService();

export async function getPost(id: string) {
  const post = await postService.getPost(id);

  return NextResponse.json(post);
}