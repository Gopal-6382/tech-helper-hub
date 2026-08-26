// src/constants/roles.ts

import { Role } from "@prisma/client";

export const USER_ROLES = [Role.USER];

export const PROFESSIONAL_ROLES = [Role.PROFESSIONAL];

export const ADMIN_ROLES = [Role.ADMIN];

export const USER_AND_PROFESSIONAL_ROLES = [Role.USER, Role.PROFESSIONAL];
