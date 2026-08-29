import { PROFESSIONAL_ROLES, USER_AND_PROFESSIONAL_ROLES, USER_ROLES } from "./role.constant";

export const User = {
  roles: USER_ROLES,
} as const;

export const Professional = {
  roles:PROFESSIONAL_ROLES ,
} as const;

export const User_Professional = {
  roles: USER_AND_PROFESSIONAL_ROLES,
} as const;