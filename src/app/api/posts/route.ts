import { routeHandler } from "@/middleware/route.handler";

import { USER_ROLES } from "@/constant/role.constant";

import { createPost } from "@/modules/posts/actions/create-post.action";
import { getPosts } from "@/modules/posts/actions/get-posts.action";

import { createPostSchema } from "@/modules/posts/validations/post.validation";

export const GET = routeHandler(async () => {
  return getPosts();
});

export const POST = routeHandler(
  async (req, user) => {
    const body = await req.json();

    const data = createPostSchema.parse(body);

    return createPost({
      ...data,
      categoryId: data.categoryId ?? undefined,
      authorId: user.userId,
    });
  },
  {
    roles: USER_ROLES,
  },
);
