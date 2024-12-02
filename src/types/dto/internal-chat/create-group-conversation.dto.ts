export type CreateGroupConversationDto = {
  /** Tên nhóm */
  name: string;

  /** ID hình ảnh của nhóm */
  image?: number;

  /** Danh sách ID của những người tham gia */
  participants: number[];
};
