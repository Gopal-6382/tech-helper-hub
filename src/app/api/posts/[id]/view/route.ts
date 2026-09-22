import { routeHandler } from "@/middleware/route.handler";

import { increasePostView } from "@/modules/posts/actions/increase-post-view.action";

type PostRouteParams = {
  id: string;
};

export const POST = routeHandler<PostRouteParams>(
  async (_req, _user, { params }) => {
    const { id } = await params;

    return increasePostView(id);
  },
);
