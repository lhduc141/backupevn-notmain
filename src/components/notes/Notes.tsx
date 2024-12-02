import { Editor } from 'components/common';
import { useNotes } from 'hooks';
import { debounce } from 'lodash';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { useUpdateNoteMutation } from 'services';

import { Editor as TinyMCEEditor } from 'tinymce';

type NotesProps = {
  onChangeLoading?: (value: boolean) => void;
  open?: boolean;
};
export type NotesRefProps = {
  handleSaveNote: () => void;
};
const Notes = forwardRef<NotesRefProps, NotesProps>(({ open, onChangeLoading }, ref) => {
  useImperativeHandle(ref, () => ({
    handleSaveNote
  }));
  const { note } = useNotes();
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateNoteMutation();

  useEffect(() => {
    setTimeout(() => {
      if (editorRef.current && editorRef.current.getContent() !== note?.content) {
        editorRef.current.setContent(note?.content ?? '');
      }
    }, 50);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        focusToEnd();
      }, 500);
    }
  }, [open]);

  useEffect(() => {
    if (onChangeLoading) {
      onChangeLoading(isLoadingUpdate);
    }
  }, [onChangeLoading, isLoadingUpdate]);

  const debounceHandleChange = useCallback(
    debounce((nextValue?: string) => {
      if (!isLoadingUpdate) {
        handleUpdateNote(nextValue?.trim() || '');
      }
    }, 3000),
    [isLoadingUpdate]
  );

  const handleSaveNote = () => {
    const editorContent = editorRef.current?.getContent()?.trim() || '';
    if (editorContent !== note?.content?.trim() && !isLoadingUpdate) {
      debounceHandleChange.cancel();
      handleUpdateNote(editorContent);
    }
  };

  const handleUpdateNote = (value: string) => {
    onUpdate({
      content: value
    });
  };

  const focusToEnd = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      editor.focus();
      if (editor.selection) {
        editor.selection.select(editor.getBody(), true);
        editor.selection.collapse(false);
      }
    }
  };

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      onEditorChange={(a) => {
        debounceHandleChange(a);
      }}
    />
  );
});
export default Notes;
