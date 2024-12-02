export * from './customer-support-information.messages';
export * from './frequently-asked-questions.messages';
export * from './internal-announcements.messages';
export * from './internal-chat.messages';
export * from './login.messages';
export * from './notification.messages';
export * from './organization-units.messages';
export * from './permissions.messages';
export * from './reasons.messages';
export * from './roles.messages';
export * from './service-instructions.messages';
export * from './service-types.messages';
export * from './shifts.messages';
export * from './sidebar-menu.messages';
export * from './ticket-cancel-reasons.messages';
export * from './ticket-samples.messages';
export * from './user-groups.messages';
export * from './users.messages';
export * from './validate.messages';
export * from './vip-customers.messages';
export * from './working-schedules.messages';
export * from './system-configs.messages';
export * from './agent-maps.messages';

export const messages = {
  index: 'STT',
  appName: 'CRM v2 TT CSKH',
  today: 'Hôm nay',
  home: 'Trang chủ',
  login: 'Đăng nhập',
  loginSuccess: 'Đăng nhập thành công!',
  logout: 'Đăng xuất',
  pageNotFound: 'Xin lỗi, trang bạn truy cập không tồn tại.',
  somethingWentWrong: 'Xin lỗi, đã có lỗi xảy ra.',
  loadingPage: 'Đang tải trang...',
  loadingProfile: 'Đang tải thông tin người dùng...',
  profile: 'Hồ sơ tài khoản',
  changeAvatar: 'Đổi ảnh đại diện',
  deleteAvatar: 'Xóa ảnh đại diện',
  confirmButtonText: 'Xác nhận',
  saveButtonText: 'Lưu',
  cancelButtonText: 'Hủy',
  createButtonText: 'Tạo mới',
  createdAt: 'Ngày tạo',
  datePickerPlaceHolder: 'Ngày tháng năm',
  userPage: 'Nhân viên',
  fileFormatError: 'File không đúng định dạng',
  upload: 'Tải lên',
  selectAll: 'Chọn tất cả',
  editButtonText: 'Chỉnh sửa',
  urlInvalid: 'URL không hợp lệ',
  deleteButtonText: 'Xóa',
  createdBy: 'Người tạo',
  updatedBy: 'Người cập nhật',
  status: 'Trạng thái',
  sendButtonText: 'Gửi',
  placeholderChatBox: '  Nhập nội dung của bạn...',
  fileSizeIsMax: (size: string) => `Vui lòng gửi tệp có dung lượng không quá ${size}`,
  fileInvalidFormat: (format: string) => `Tệp không đúng định dạng. Vui lòng gửi tệp có có định dạng ${format}`,
  loadingUser: 'Tải thông tin người dùng',
  note: 'Ghi chú',
  updateAt: 'Cập nhật',
  deletedAt: 'Ngày xóa',
  statusEnum: {
    active: 'Hoạt động',
    inactive: 'Không hoạt động'
  },
  exportExcel: 'Xuất excel',
  inputSearchInfo: 'Nhập thông tin cần tìm',
  chooseOneOrMorePerrmission: 'Chọn một hoặc nhiều nhóm quyền/quyền',
  optionIsNotActive: 'Lựa chọn không khả dụng',
  updateAvatar: 'Cập nhật biểu tượng',
  updateStatus: 'Cập nhật trạng thái',
  updateInfo: 'Sửa thông tin',
  general: 'Thông tin chung',
  viewAll: (subText?: string) => `Xem tất cả${subText ? ` ${subText}` : ''}`,
  draggerUpload: 'Kéo thả file để tải lên. Hoặc chọn từ thiết bị',
  rulesUploadExcel: 'Chọn file có định dạng XLS, XLSX, CSV. Dữ liệu ở trang tính đầu tiên và không quá 1000 dòng',
  selectFile: 'Chọn file',
  selectIcon: 'Chọn biểu tượng',
  iconsAvailable: 'Biểu tượng có sẵn',
  uploadFromDevice: 'Hoặc tải ảnh lên từ thiết bị',
  rulesUploadFile: (fileType: string, size: string) =>
    `File ảnh có ${fileType && `định dạng ${fileType}`} ${fileType && size && 'và'} ${size && `dung lượng không quá ${size}`}`,
  search: 'Tìm kiếm',
  maxCountUpload: (uploaded: number, maxCount: number) =>
    `Đã đạt giới hạn  ${uploaded}/${maxCount} tệp tải lên. Vui lòng xóa bớt tệp để tiếp tục`,
  deleteAllButtonText: 'Xóa tất cả',
  selectAllButtonText: 'Chọn tất cả',
  booleanEnum: {
    true: 'Có',
    false: 'Không'
  }
};
