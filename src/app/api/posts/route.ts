import { routeHandler } from "@/middleware/route.handler";
import { getPosts } from "@/modules/posts/actions/get-posts.action";
import { createPost } from "@/modules/posts/actions/create-post.action";
import { USER_ROLES } from "@/constant/role.constant";
import { CreatePostDto } from "@/modules/posts/types/post.types";
import { createPostSchema } from "@/modules/posts/validations/post.validation";

// GET /api/posts - Public feed (or role-protected depending on your standard)
export const GET = routeHandler(async () => {
  return getPosts();
});

// POST /api/posts - Login Required
export const POST = routeHandler(
  async (req, user) => {
    const body: CreatePostDto = await req.json();
    const data = createPostSchema.parse(body);
    // Combine user ID with the body so the action receives everything in one place
    return createPost({
      ...data,
      authorId: user.userId,
    });
  },
  {
    roles: USER_ROLES,
  },
);
