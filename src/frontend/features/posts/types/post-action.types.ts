export interface DeletePostDialogProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}

export interface PostActionsProps {
  postId: string;
  likeCount: number;
  commentCount: number;
  saveCount: number;
  isLiked: boolean;
  isSaved: boolean;
  viewCount: number;
  viewed: boolean;
  onComment: () => void;
}

export interface PostCommentButtonProps {
  count: number;
  onClick: () => void;
}

export interface PostSaveButtonProps {
  postId: string;
  initialSaved: boolean;
  initialSaveCount: number;
}

export interface PostMenuProps {
  canEdit: boolean;
  canDelete: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReport?: () => void;
}

export interface PostLikeButtonProps {
  postId: string;
  initialLiked: boolean;
  initialLikeCount: number;
}

export interface PostViewCountProps {
  count: number;
  viewed: boolean;
}

export interface PostViewTriggerProps {
  postId: string;
  onViewed?: boolean;
}

export interface PostShareDialogProps {
  postId: string;
}
