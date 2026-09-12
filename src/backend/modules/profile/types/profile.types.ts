export interface CreateProfileDto {
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

export type UpdateProfileDto = Partial<CreateProfileDto>;
