import { ConversationParticiPantDto } from 'types';
import { replaceStringAt } from './common';
import { MESSAGE_TAG_NAME } from './constants';

export function getCaretPosition(editableDiv: HTMLDivElement | null): number {
  let caretOffset = 0;
  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0 && editableDiv) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();

    // Tạo một range từ đầu của divElement đến vị trí con trỏ
    preCaretRange.selectNodeContents(editableDiv);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    // Độ dài của preCaretRange sẽ là vị trí của con trỏ
    caretOffset = preCaretRange.toString().length;
  }

  return caretOffset;
}

export function getCaretPositionInHtml(element: HTMLElement) {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return 0;

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);

  // Sử dụng `innerHTML` của `preCaretRange` để lấy vị trí con trỏ trong HTML
  const tempDiv = document.createElement('div');
  tempDiv.appendChild(preCaretRange.cloneContents());
  const htmlBeforeCaret = tempDiv.innerHTML;

  // Độ dài HTML tính từ đầu đến vị trí con trỏ
  return htmlBeforeCaret.length;
}

export const isCaretPositionInSpan = (editableDiv: HTMLDivElement) => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);

  if (!selection || !range) return false;

  // Kiểm tra xem con trỏ có ở trong thẻ <span> không
  const spans = editableDiv.querySelectorAll('span');
  let isInsideSpan = false;

  spans.forEach((span) => {
    // Kiểm tra nếu startContainer của range nằm trong span hoặc là một trong các con của span
    if (span.contains(range.startContainer)) {
      isInsideSpan = true;
    }
  });

  return isInsideSpan;
};

type PositionSubstring = {
  start: number;
  end: number;
};
export const replaceKeywordByTag = (
  input: HTMLDivElement,
  tag: ConversationParticiPantDto,
  positionHtml: PositionSubstring,
  positionText: PositionSubstring
) => {
  if (!input || !tag) return;
  const { name } = tag;

  const tagNameElement = `<span name='${MESSAGE_TAG_NAME}' class="text-colorPrimary cursor-pointer" id="${tag.userId}">@${name}</span> `;
  const text = input.innerHTML || '';

  const stringAfterCutTag = replaceStringAt(text, tagNameElement, positionHtml.start, positionHtml.end);
  input.innerHTML = stringAfterCutTag;

  try {
    /** Tính toán vị trí con trỏ mới sau khi thêm tag +1 để bù cho khoảng trắng  */
    const newCaretPosition = positionText.start + (name?.length || 0) + 2;

    /** Đặt con trỏ sau đoạn văn bản vừa thêm  */
    const range = document.createRange();
    const selectionAfter = window.getSelection();

    /** Tìm `textNode` cuối cùng sau khi cập nhật `innerHTML`  */
    const textNodes = Array.from(input.childNodes).filter(
      (node) => node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE
    );

    /**  Tìm và đặt con trỏ ở vị trí `newCaretPosition` trong `textNode` */
    let accumulatedLength = 0;
    for (const node of textNodes) {
      const nodeLength = node.textContent?.length || 0;

      if (accumulatedLength + nodeLength >= newCaretPosition) {
        const caretPositionInNode = newCaretPosition - accumulatedLength;
        range.setStart(node, caretPositionInNode);
        range.setEnd(node, caretPositionInNode);
        break;
      }

      accumulatedLength += nodeLength;
    }

    /**  Xóa tất cả các range hiện tại và thêm range mới*/
    selectionAfter?.removeAllRanges();
    selectionAfter?.addRange(range);
  } catch (error) {
    console.log(error);
  }
};

export const removeSpanEl = (input: HTMLDivElement) => {
  if (!input) return;
  const spans = input.querySelectorAll('span');
  spans.forEach((span) => {
    if (span.innerText.trim() === '') {
      span.remove();
    }
  });
};

export const removeNodeEl = (input: HTMLDivElement) => {
  if (input.innerHTML.includes('<font')) {
    const selection = window.getSelection();
    let cursorPosition;
    if (selection) {
      const range = selection.getRangeAt(0);
      cursorPosition = range.startOffset;
    }

    input.innerHTML = input.innerHTML.replace(/<font[^>]*>/gi, '').replace(/<\/font>/gi, '');

    if (selection && input && cursorPosition) {
      const newRange = document.createRange();
      newRange.setStart(input.firstChild!, cursorPosition);
      newRange.setEnd(input.firstChild!, cursorPosition);

      // Restore the selection with the new range
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  }
};

export const removeSpanElKeepContent = (editableDiv: HTMLDivElement) => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  const spans = editableDiv?.querySelectorAll('span');
  if (!selection || !range || spans.length === 0) return;

  spans.forEach((span) => {
    if (range.startContainer === span.firstChild || range.startContainer === span) {
      const spanEnd = span.textContent?.length || 0;

      if (range.endOffset === spanEnd) {
        /** Thay thế nội dung của thẻ <span> bằng một text node */
        const textNode = document.createTextNode(span.textContent || '');
        editableDiv.replaceChild(textNode, span);

        /**  Di chuyển con trỏ đến sau text node */
        const newRange = document.createRange();
        newRange.setStartAfter(textNode);
        newRange.collapse(true);

        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  });
};
