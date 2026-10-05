// "use client";

// import { useEffect, useRef } from "react";

// import { usePostView } from "@/frontend/features/posts/hooks/interactions/use-post-view";
// import type { PostViewTriggerProps } from "@/frontend/features/posts/types/post-action.types";

// export function PostViewTrigger({ postId, onViewed }: PostViewTriggerProps) {
//   const triggeredRef = useRef(false);
//   const onViewedRef = useRef<((viewCount: number) => void) | undefined>(
//     onViewed,
//   );

//   useEffect(() => {
//     onViewedRef.current = onViewed;
//   }, [onViewed]);

//   const { mutate } = usePostView();

//   useEffect(() => {
//     if (!postId || triggeredRef.current) {
//       return;
//     }

//     triggeredRef.current = true;

//     mutate(postId, {
//       onSuccess: (result) => {
//         if (result.success) {
//           const onViewedCallback = onViewedRef.current;

//           if (typeof onViewedCallback === "function") {
//             onViewedCallback(result.viewCount);
//           }
//         }
//       },
//       onError: () => {
//         triggeredRef.current = false;
//       },
//     });
//   }, [postId, mutate]);

//   return null;
// }
