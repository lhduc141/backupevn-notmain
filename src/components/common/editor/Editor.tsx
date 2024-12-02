import { IAllProps, Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { useCallback } from 'react';
import { useUploadFileMutation } from 'services';
import { EditorEvent } from 'tinymce';
import { EDITOR_PLUGINS, FilesBucketNames } from 'utils';

const Editor = ({ init, ...props }: IAllProps) => {
  const [onUpload] = useUploadFileMutation();

  const handleUploadImage = async (editor: EditorEvent<any>, file: Blob, tempImgId: string) => {
    if (file) {
      try {
        const response = await onUpload({
          file,
          bucketName: FilesBucketNames.PUBLIC
        });
        const imageUrl = response.data?.data.url;

        // Thay thế biểu tượng loading bằng hình ảnh thật
        const tempImage = editor.dom.select(`img[data-temp-id="${tempImgId}"]`)[0];
        if (tempImage) {
          editor.dom.setAttrib(tempImage, 'src', imageUrl);
          editor.dom.setAttrib(tempImage, 'data-temp-id', null);
          editor.dom.setAttrib(tempImage, 'style', 'width: 100px; height: auto;');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handlePaste = useCallback(
    (editor: EditorEvent<any>) => async (event: EditorEvent<any>) => {
      const clipboardData = event.clipboardData;

      if (clipboardData) {
        const items = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          if (item.type.indexOf('image') !== -1) {
            /** Ngăn không cho hành vi dán mặc định */
            event.preventDefault();
            const file = item.getAsFile();
            if (file) {
              const tempImgId = `tempImg_${Date.now()}`;
              // Chèn ảnh tạm thời với ID để hiển thị loading
              const tempImageHtml = `<img src="/loading_spinner.gif" data-temp-id="${tempImgId}" style="width: 50px; height: 50px;" />`;
              editor.insertContent(tempImageHtml);
              await handleUploadImage(editor, file, tempImgId);
            }
            /** Dừng vòng lặp sau khi xử lý hình ảnh */
            return;
          }
        }
      }
    },
    []
  );
  return (
    <TinyMCEEditor
      tinymceScriptSrc={window.location.origin + '/tinymce/tinymce.min.js'}
      init={{
        height: 503,
        menubar: false,
        statusbar: false,
        paste_data_images: true,
        language: 'vi',
        language_url: window.location.origin + '/langs/vi.js',
        plugins: [EDITOR_PLUGINS.IMAGE, EDITOR_PLUGINS.LINK, EDITOR_PLUGINS.AUTOLINK],
        setup: (editor) => {
          editor.on('paste', async (event: EditorEvent<any>) => {
            await handlePaste(editor)(event);
          });
        },
        content_style: 'body { background-color: #F7F8F9; }',
        ...init
      }}
      {...props}
    />
  );
};
export default Editor;
