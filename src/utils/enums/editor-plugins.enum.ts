export enum EDITOR_PLUGINS {
  ACCORDION = 'accordion',
  /** Thêm danh sách nâng cao (bullet và numbered lists). */
  ADV_LIST = 'advlist',

  /** Chèn và chỉnh sửa anchor links. */
  ANCHOR = 'anchor',

  /** Tự động thêm liên kết khi người dùng gõ URL. */
  AUTOLINK = 'autolink',

  /** Lưu tự động sau một khoảng thời gian. */
  AUTOSAVE = 'autosave',

  /** Thêm ký tự đặc biệt. */
  CHAR_MAP = 'charmap',

  /** Cho phép xem và chỉnh sửa mã HTML. */
  CODE = 'code',

  /** Chèn và định dạng mã (code snippets). */
  CODE_SAMPLE = 'codesample',

  /** Hỗ trợ viết từ trái sang phải (LTR) và phải sang trái (RTL). */
  DIRECTIONALITY = 'directionality',

  /** Chèn emoji hoặc biểu tượng cảm xúc. */
  EMOTICONS = 'emoticons',

  /** Mở trình soạn thảo ở chế độ toàn màn hình. */
  FULLSCREEN = 'fullscreen',

  /** Hiển thị trợ giúp về TinyMCE. */
  HELP = 'help',

  /** Chèn và chỉnh sửa hình ảnh. */
  IMAGE = 'image',

  /** Import các định dạng từ file CSS bên ngoài. */
  IMPORT_CSS = 'importcss',

  /** Chèn ngày và giờ hiện tại. */
  INSERT_DATETIME = 'insertdatetime',

  /** Chèn và chỉnh sửa liên kết. */
  LINK = 'link',

  /** Tạo và quản lý danh sách (bullet và numbered lists). */
  LISTS = 'lists',

  /** Chèn và chỉnh sửa phương tiện (video, audio). */
  MEDIA = 'media',

  /** Thêm ký tự khoảng trắng không ngắt (non-breaking space). */
  NONBREAKING = 'nonbreaking',

  /** Thêm dấu ngắt trang. */
  PAGEBREAK = 'pagebreak',

  /** Xem trước nội dung. */
  PREVIEW = 'preview',

  /** Thêm nút lưu nội dung. */
  SAVE = 'save',

  /** Tìm kiếm và thay thế văn bản. */
  SEARCH_REPLACE = 'searchreplace',

  /** Chèn và chỉnh sửa bảng. */
  TABLE = 'table',

  /** Cung cấp các mẫu văn bản có thể chèn nhanh. */
  TEMPLATE = 'template',

  /** Hiển thị khối HTML dưới dạng đường viền. */
  VISUAL_BLOCKS = 'visualblocks',

  /** Hiển thị ký tự đặc biệt (như khoảng trắng không ngắt). */
  VISUAL_CHARS = 'visualchars',

  /** Đếm số từ trong văn bản. */
  WORD_COUNT = 'wordcount',

  /** Thanh công cụ ngữ cảnh bật lên khi chọn văn bản. */
  QUICKBARS = 'quickbars',

  /** Tự động điều chỉnh kích thước trình soạn thảo theo nội dung. */
  AUTORESIZE = 'autoresize'
}
