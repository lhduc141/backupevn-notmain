import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChatInputRefProps } from './ChatInput';
import { ConversationParticiPantDto } from 'types';
import { useProfile } from 'hooks';
import { Typography } from 'antd';
import { Avatar } from '../avatar';
import { getCaretPosition, getCaretPositionInHtml, isCaretPositionInSpan, replaceKeywordByTag } from 'utils';

type ChatSuggestionsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  chatInput: ChatInputRefProps | null;
  participants: ConversationParticiPantDto[];
  setMessage: (msg: string) => void;
};

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({
  setMessage,
  participants = [],
  open,
  setOpen,
  chatInput
}) => {
  const { profile } = useProfile();
  const [keyword, setKeyword] = useState<string>('');
  const [selectIndex, setSelectIndex] = useState<number>(0);

  const mousedownTimeOut = useRef<NodeJS.Timeout | null>(null);
  const tagListRef = useRef<HTMLDivElement | null>(null);

  const listTag = participants.filter(
    (o) => o.name?.toLowerCase()?.startsWith(keyword) && o.userId !== profile?.userId
  );
  useEffect(() => {
    if (!listTag.length) {
      setOpen(false);
    }
  }, [listTag]);

  useEffect(() => {
    if (!chatInput) return;
    const div = chatInput?.input;
    if (div) {
      div.addEventListener('keyup', handleKeyUp);
      div.addEventListener('mousedown', () => {
        if (mousedownTimeOut.current) {
          clearTimeout(mousedownTimeOut.current);
        }
        mousedownTimeOut.current = setTimeout(() => {
          handleKeyUp();
        }, 200);
      });
      div.addEventListener('blur', handleBlur);
    }
    return () => {
      if (div) {
        div.removeEventListener('keydown', handleKeydown);
        div.removeEventListener('keyup', handleKeyUp);
        div.removeEventListener('mousedown', () => handleKeyUp());
        div.removeEventListener('blur', handleBlur);
      }
    };
  }, [chatInput]);

  useEffect(() => {
    if (!open || !chatInput || !listTag.length) return;
    const div = chatInput?.input;
    if (div) {
      div.addEventListener('keydown', handleKeydown);
    }
    return () => {
      if (div) {
        div.removeEventListener('keydown', handleKeydown);
      }
    };
  }, [open, listTag]);

  useEffect(() => {
    if (!open) return;
    const selectTag = listTag[selectIndex];
    const selectDiv = document.getElementById(`tag-${selectTag?.userId}`);
    if (selectDiv) {
      selectDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [selectIndex]);

  const handleBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  const handleKeyUp = (ev?: KeyboardEvent) => {
    if (!chatInput?.input || ev?.key === 'ArrowUp' || ev?.key === 'ArrowDown' || ev?.key === 'Enter') return;
    const { input } = chatInput;
    if (isCaretPositionInSpan(input)) {
      setOpen(false);
      return;
    }

    const text = input?.innerText || '';
    const cursorPosition = getCaretPosition(input);
    if (cursorPosition === 0 || text.charAt(cursorPosition - 1) === ' ') {
      setOpen(false);
      return;
    }

    const textBeforeCursor = text.slice(0, cursorPosition);
    const atHotKey = textBeforeCursor.lastIndexOf('@');
    const tagName = text.slice(atHotKey + 1, cursorPosition).toLowerCase();

    if (
      atHotKey !== -1 &&
      participants.filter((o) => o.name?.toLowerCase()?.startsWith(tagName) && o.userId !== profile?.userId).length > 0
    ) {
      setKeyword(tagName);
      setSelectIndex(0);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleKeydown = (ev: KeyboardEvent) => {
    if (!open) return;
    switch (ev.key) {
      case 'ArrowUp':
        setSelectIndex((prev) => Math.max(0, prev - 1));
        break;
      case 'ArrowDown':
        setSelectIndex((prev) => Math.min(listTag.length - 1, prev + 1));
        break;
      case 'Enter':
        onSelectTag(listTag[selectIndex]);
        break;
    }
  };

  const onSelectTag = (tag: ConversationParticiPantDto) => {
    if (!chatInput?.input) return;
    const { input } = chatInput;

    const textHtml = input.innerHTML || '';
    const text = input.innerText || '';

    // const { caretPosition, spanLength } = getCaretPosition(input);
    const cursorPositionHtml = getCaretPositionInHtml(input);
    const substringBeforeCursorHtml = textHtml.substring(0, cursorPositionHtml);
    const atPositionHtml = substringBeforeCursorHtml.lastIndexOf('@');

    const cursorPosition = getCaretPosition(input);
    const substringBeforeCursor = text.substring(0, cursorPositionHtml);
    const atPosition = substringBeforeCursor.lastIndexOf('@');

    if (atPosition !== -1) {
      replaceKeywordByTag(
        input,
        tag,
        {
          end: cursorPositionHtml,
          start: atPositionHtml
        },
        {
          end: cursorPosition,
          start: atPosition
        }
      );
      setTimeout(() => {
        setOpen(false);
        setMessage(input.innerHTML);
      }, 200);
    }
  };

  if (open && listTag.length)
    return (
      <div
        ref={tagListRef}
        className={twMerge(
          'fade-in absolute left-0 z-50 h-fit max-h-[300px] w-fit -translate-y-[calc(100%+22px)] overflow-y-auto rounded-lg border bg-white py-3'
        )}
      >
        {listTag.map((tag, idx) => (
          <div
            onClick={() => {
              setTimeout(() => {
                onSelectTag(tag);
              }, 100);
            }}
            id={`tag-${tag.userId}`}
            key={`tag-${tag.userId}`}
            className={twMerge(
              'flex h-11 max-w-full cursor-pointer items-center gap-3 px-4 hover:bg-hoverColor1',
              idx === selectIndex && 'bg-colorPrimaryBg'
            )}
          >
            <Avatar fileId={tag.image} name={tag.name} />
            <Typography.Text className='text-sm'>{tag.name}</Typography.Text>
          </div>
        ))}
      </div>
    );
  return null;
};

export default ChatSuggestions;
