export enum EDITOR_TOOLBARS {
  /** Hoàn tác và làm lại các thao tác. */
  UNDO_REDO = 'undo redo',

  /** Chọn định dạng văn bản như tiêu đề, đoạn văn. */
  FORMAT_SELECT = 'formatselect',

  /** Chỉnh sửa định dạng văn bản (như đậm, nghiêng, màu nền). */
  TEXT_FORMAT = 'bold italic backcolor',

  /** Căn chỉnh văn bản (trái, giữa, phải, và đều). */
  ALIGNMENT = 'alignleft aligncenter alignright alignjustify',

  /** Tạo danh sách kiểu bullet và numbered. */
  LISTS = 'bullist numlist',

  /** Thay đổi khoảng cách lề (thụt lề) và thụt lề văn bản. */
  OUTDENT_INDENT = 'outdent indent',

  /** Loại bỏ định dạng và các thuộc tính không mong muốn. */
  REMOVE_FORMAT = 'removeformat',

  /** Hiển thị trợ giúp và hướng dẫn. */
  HELP = 'help',

  /** Chèn hoặc chỉnh sửa liên kết. */
  LINK = 'link',

  /** Chèn và chỉnh sửa hình ảnh. */
  IMAGE = 'image',

  /** Chèn và chỉnh sửa bảng. */
  TABLE = 'table',

  /** Xem trước nội dung soạn thảo. */
  PREVIEW = 'preview',

  /** Chèn ngày và giờ hiện tại. */
  INSERT_DATETIME = 'insertdatetime',

  /** Thay đổi màu chữ. */
  TEXT_COLOR = 'textcolor',

  /** Chèn và chỉnh sửa phương tiện như video, audio. */
  MEDIA = 'media',

  /** Tìm kiếm và thay thế văn bản. */
  SEARCH_REPLACE = 'searchreplace',

  /** Tạo mục lục từ các tiêu đề. */
  TOC = 'toc',

  /** Hiển thị khối HTML dưới dạng đường viền. */
  VISUAL_BLOCKS = 'visualblocks',

  /** Hiển thị ký tự đặc biệt. */
  VISUAL_CHARS = 'visualchars',

  /** Chèn mã (code snippets). */
  CODE_SAMPLE = 'codesample',

  /** Mở chế độ toàn màn hình. */
  FULLSCREEN = 'fullscreen',

  /** Thanh công cụ ngữ cảnh bật lên khi chọn văn bản. */
  QUICKBARS = 'quickbars',

  /** Tự động điều chỉnh kích thước trình soạn thảo theo nội dung. */
  AUTORESIZE = 'autoresize'
}
