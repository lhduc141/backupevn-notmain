export type UpdateProfileDto = {
  fullName?: string;
  shortName?: string;
  phoneNumber?: string;
  avatar?: number | null; // Optional field
  genderId?: number;
  birthday?: Date; // ISO 8601 date-time string
};
