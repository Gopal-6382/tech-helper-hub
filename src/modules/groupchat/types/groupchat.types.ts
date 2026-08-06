// Client → Server

export interface CreateGroupDto {
  name: string;
  description?: string;
  image?: string;
}

export interface AddMemberDto {
  userId: string;
}

export interface SendGroupMessageDto {
  content: string;
}
// Internal (Service → Repository)

export interface CreateGroupData {
  ownerId: string;
  name: string;
  description?: string;
  image?: string;
}

export interface AddMemberData {
  groupId: string;
  userId: string;
  isAdmin: boolean;
}

export interface CreateGroupMessageData {
  groupId: string;
  senderId: string;
  content: string;
}
