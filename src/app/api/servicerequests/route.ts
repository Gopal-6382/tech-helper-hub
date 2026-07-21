import { authMiddleware } from "@/middleware/auth.middleware";

import { createRequest } from "@/modules/servicerequest/actions/create-request.action";
import { getMyRequests } from "@/modules/servicerequest/actions/get-my-requests.action";

export const POST = authMiddleware(createRequest);

export const GET = authMiddleware(getMyRequests);
