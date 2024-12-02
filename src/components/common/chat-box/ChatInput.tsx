import { Upload } from 'antd';
import { messages } from 'messages';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FileUpload } from 'types';
import {
  checkPositionCursor,
  execCommand,
  moveCaretToEnd,
  removeNodeEl,
  removeSpanEl,
  removeSpanElKeepContent
} from 'utils';

type ChatInputProps = {
  message: string;
  setMessage: (value: string) => void;
  handleSend: () => void;
  attachFile: (file: FileUpload) => void;
  beforeUpload: (file: FileUpload) => boolean | string;
  onInput?: (value: string) => void;
  conversationId: string;
  openSuggestion?: boolean;
};
export type ChatInputRefProps = {
  input: HTMLDivElement | null;
  focus: () => void;
  restoreSelection: () => void;
};
const ChatInput = forwardRef<ChatInputRefProps, ChatInputProps>(
  ({ handleSend, message, setMessage, attachFile, beforeUpload, onInput, conversationId, openSuggestion }, ref) => {
    useImperativeHandle(ref, () => ({
      input: fakeInputRef.current,
      focus: focusInput,
      restoreSelection
    }));

    const [savedRange, setSavedRange] = useState<Range | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const fakeInputRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (JSON.stringify(message) !== '""') {
        placeholderRef.current?.classList.add('hidden');
      } else {
        placeholderRef.current?.classList.remove('hidden');
      }
    }, [JSON.stringify(message)]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (openSuggestion && (e.key === 'Enter' || e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        /** bắt sự kiện xuống dòng shift enter */
        if (e.shiftKey && fakeInputRef.current) {
          placeholderRef.current?.classList.add('hidden');
          const { atEnd } = checkPositionCursor(e, fakeInputRef.current);
          /** Shift enter xuống dòng, tuy nhiên div sẽ không nhận br ở dòng cuối cùng nên nếu ở đòng cuối sẽ insert thêm 1 lần nữa*/
          if (atEnd) {
            execCommand(`\n`);
          }
          setMessage(message + '\n');
          execCommand(`\n`);
          return;
        }
        if (!isProcessing) {
          setIsProcessing(true);
          setTimeout(() => {
            if (fakeInputRef.current) {
              handleSend();
            }
            setIsProcessing(false);
          }, 50);
        }
      }
    };

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      if (!e.currentTarget.textContent?.length) {
        e.currentTarget.innerHTML = '';
      }
      removeSpanElKeepContent(e.currentTarget);

      removeSpanEl(e.currentTarget);
      removeNodeEl(e.currentTarget);

      onInput?.(e.currentTarget.innerHTML || '');
      setMessage(e.currentTarget.innerHTML || '');
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const clipboardItems = e.clipboardData.items;
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];

        if (item.kind === 'file') {
          const blob = item.getAsFile();
          if (blob && beforeUpload(blob) !== Upload.LIST_IGNORE) {
            attachFile(blob);
            return;
          }
          return;
        }
      }
      /** Lấy plain text từ clipboard */
      const text = e.clipboardData.getData('text/plain');
      execCommand(text);
      setMessage(fakeInputRef.current?.innerText || '');
    };

    const focusInput = () => {
      if (fakeInputRef.current) {
        if (document.activeElement !== fakeInputRef.current) {
          moveCaretToEnd(fakeInputRef.current);
          saveSelection();
        }
      }
    };

    /**  Hàm để lưu vị trí con trỏ */
    const saveSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        setSavedRange(selection.getRangeAt(0));
      }
    };

    /** Khôi phục vị trí con trỏ */
    const restoreSelection = () => {
      const selection = window.getSelection();
      if (selection && savedRange) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
      }
    };

    return (
      <div className='relative w-full text-sm'>
        <div
          id={`chat-input-fake-${conversationId}`}
          ref={fakeInputRef}
          contentEditable
          className='no-scrollbar max-h-[200px] w-full overflow-y-auto whitespace-pre-wrap break-words pr-[32px] text-left text-sm font-normal text-colorTextBase outline-none'
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onMouseUp={saveSelection}
          onKeyUp={saveSelection}
          onBlur={saveSelection}
          autoFocus
        />
        <div
          id='placeholder'
          ref={placeholderRef}
          className='pointer-events-none absolute top-0 text-colorTextPlaceholder'
        >
          {messages.placeholderChatBox}
        </div>
      </div>
    );
  }
);

export default ChatInput;
