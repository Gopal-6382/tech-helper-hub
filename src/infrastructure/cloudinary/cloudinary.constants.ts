export const CLOUDINARY_ROOT = "tech-helper-hub";

export const CLOUDINARY_FOLDERS = {
  users: `${CLOUDINARY_ROOT}/users`,
  posts: `${CLOUDINARY_ROOT}/posts`,
  reviews: `${CLOUDINARY_ROOT}/reviews`,
  groups: `${CLOUDINARY_ROOT}/groups`,
  verification: `${CLOUDINARY_ROOT}/verification`,
} as const;