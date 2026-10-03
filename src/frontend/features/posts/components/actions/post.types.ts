type DeletePostDialogProps = {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
};

type PostActionsProps = {
  postId: string;
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  onComment?: () => void;
  viewCount?: number;
  saveCount?: number;
};

type PostCommentButtonProps = {
  count?: number;
  onClick?: () => void;
};

type PostViewCountProps = {
  count?: number;
};

type PostSaveButtonProps = {
  postId: string;
  initialSaved?: boolean;
  initialSaveCount?: number;
};

type PostShareDialogProps = {
  postId: string;
};

type PostMenuProps = {
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
};

type PostLikeButtonProps = {
  postId: string;
  initialLiked?: boolean;
  initialLikeCount?: number;
};
