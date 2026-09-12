export type UpdateMeDto = {
  name?: string;
  phone?: string | null;
  avatar?: string | null;
  email?: string;
};

export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};
