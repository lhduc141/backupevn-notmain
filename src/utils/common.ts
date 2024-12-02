import dayjs from 'dayjs';
import { messages } from 'messages';
import { DATE_FORMAT, DATE_TIME_FORMAT, WEEKDAY_FORMAT } from './constants';
import { FILE_TYPE } from './enums';

export function capitalizeFirstLetter(text: string = '') {
  if (!text) {
    return text;
  }

  text = text.toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function removeSpecialCharacters(keyword: string): string {
  if (!keyword) {
    return '';
  }

  return keyword
    .toLowerCase()
    .replace('đ', 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .replace(/\\s+/g, ' ')
    .trim();
}

export function formatNumber(number: number, locale?: string): string {
  return new Intl.NumberFormat(locale ?? 'en-US').format(number);
}

export const stringToHslColor = (str?: string, s?: number, l?: number, o: number = 1) => {
  if (!str) return '#000000';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%, ${o})`;
};

export const disabledDateUnderYear =
  (year = 18) =>
  (current: dayjs.Dayjs | null) => {
    const dayYearsAgo = dayjs().subtract(year, 'year');
    return !!current && current.isAfter(dayYearsAgo);
  };

export const formatWeekDate = (date: dayjs.Dayjs): string => {
  const today = dayjs();

  if (today.isSame(date, 'day')) {
    return messages.today;
  }

  return date.format(WEEKDAY_FORMAT);
};

export const removeEmptyChildren = (data: any[]) => {
  return data.map((itm) => {
    if (itm.children && itm.children.length === 0) {
      delete itm.children;
    } else if (itm.children) {
      itm.children = removeEmptyChildren(itm.children);
    }
    return itm;
  });
};

export const checkPositionCursor = (e: React.KeyboardEvent<HTMLDivElement>, target: HTMLDivElement) => {
  const range = window.getSelection()?.getRangeAt(0);
  const preRange = document.createRange();
  preRange.selectNodeContents(target);
  if (range) {
    preRange.setEnd(range.startContainer, range.startOffset);
    const text = preRange.cloneContents();
    const atStart = text?.textContent?.length === 0;
    const postRange = document.createRange();
    postRange.selectNodeContents(target);
    postRange.setStart(range.endContainer, range.endOffset);
    const nextText = postRange.cloneContents();
    const atEnd = nextText?.textContent?.length === 0;
    return { atEnd, atStart };
  }
  return {
    atStart: false,
    atEnd: false
  };
};

/** Thêm văn bản vào vị trí con trỏ hiện tại mà không giữ bất kỳ định dạng nào bằng cách sử dụng Range API */
export const execCommand = (text: string) => {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  range.deleteContents();
  const textNode = document.createTextNode(text);
  range.insertNode(textNode);

  range.setStartAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const convertFileType = (type?: string) => {
  if (!type) return FILE_TYPE.UNKNOWN;

  if (type.startsWith('image/')) return FILE_TYPE.IMAGE;
  if (
    type === 'application/vnd.ms-excel' || // .xls
    type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
  ) {
    return FILE_TYPE.EXCEL;
  }
  if (type.endsWith('pdf')) {
    return FILE_TYPE.PDF;
  }
  if (type.endsWith('mp4')) {
    return FILE_TYPE.VIDEO;
  }
  return FILE_TYPE.UNKNOWN;
};

export const moveCaretToEnd = (element: HTMLElement) => {
  // Tạo một đối tượng range và selection
  const range = document.createRange();
  const selection = window.getSelection();

  // Đặt range đến cuối nội dung
  range.selectNodeContents(element);
  range.collapse(false); // Di chuyển con trỏ đến cuối

  // Xóa mọi range hiện tại và đặt range mới
  selection?.removeAllRanges();
  selection?.addRange(range);

  // Đảm bảo focus vào ô contenteditable
  element.focus();
};

const TIME_SPAN = {
  day_5: 7200,
  day_1: 1440,
  hour: 60,
  minute: 3
};
export const convertTimeAgo = (date: Date | string, showTime: boolean = true): string => {
  const minute = dayjs().diff(date, 'minute');
  if (minute > TIME_SPAN.day_5) {
    return showTime ? dayjs(date).format(DATE_TIME_FORMAT) : dayjs(date).format(DATE_FORMAT);
  }
  if (minute > TIME_SPAN.day_1) {
    return dayjs().diff(date, 'day') + ' ngày trước';
  }
  if (minute > TIME_SPAN.hour) {
    return dayjs().diff(date, 'hour') + ' giờ trước';
  }
  if (minute > TIME_SPAN.minute) {
    return minute + ' phút trước';
  }
  return 'Vừa xong';
};

export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    return false;
  }
}

export function isDecimalGreaterThanHalf(num: number) {
  const result = num / 3;
  const decimalPart = result - Math.floor(result);
  return decimalPart > 0.5;
}

export function getSelectedTextInDiv(div: HTMLDivElement): string | null {
  const selection = window.getSelection();

  if (!selection || !div) {
    return null;
  }

  // Kiểm tra nếu phần văn bản được chọn nằm trong div
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    if (div.contains(range.commonAncestorContainer)) {
      return selection.toString(); // Trả về văn bản đã chọn
    }
  }

  return null;
}

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

export const extractUrls = (content: string): string[] => {
  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
  return content.match(urlRegex) || [];
};

export const transformUrlsToLinks = (content: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  return content.replace(
    urlPattern,
    (url) => `<a href="${url}" class="text-colorPrimary underline" target="_blank" rel="noopener noreferrer">${url}</a>`
  );
};

export const normalizeImageUrl = (url?: string, domain?: string): string => {
  if (!url) return '';
  // Chỉ thêm https nếu URL không bắt đầu bằng http hoặc https
  if (!/^https?:\/\//i.test(url)) {
    return `${domain}${url}`;
  }
  return url;
};

export function getAppName(data: Record<string, string>) {
  const url = data['al:ios:app_name'] || data['al:android:app_name'] || data['og:url'];
  const strippedUrl = url.replace(/https?:\/\//, '').replace(/^www\./, '');

  const appName = strippedUrl.split('/')[0];

  return appName;
}

export const numberToExcelCol = (number: number) => {
  const ordA = 'a'.charCodeAt(0);
  const ordZ = 'z'.charCodeAt(0);
  const len = ordZ - ordA + 1;

  let s = '';
  while (number >= 0) {
    s = String.fromCharCode((number % len) + ordA) + s;
    number = Math.floor(number / len) - 1;
  }
  return s.toUpperCase();
};

export function hasJSONStringValue(jsonString: string | null | undefined): boolean {
  return jsonString !== undefined && jsonString !== null && jsonString.trim() !== '';
}

export function isArrayOfNumbers(data: unknown): data is number[] {
  return Array.isArray(data) && data.every((item) => typeof item === 'number');
}

export function replaceStringAt(str: string, insert: string, start: number, end: number) {
  return str.slice(0, start) + insert + str.slice(end);
}

export function convertBytes(sizeInBytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;

  while (sizeInBytes >= 1000 && index < units.length - 1) {
    sizeInBytes /= 1000;
    index++;
  }

  return `${sizeInBytes.toFixed(0)} ${units[index]}`;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function convertStringToMatrix(dataString: string): (string | number)[][] {
  const parsedData: any[][] = JSON.parse(dataString);

  return (
    parsedData?.map((row) =>
      row.map((item) => {
        if (item === null || item === undefined) {
          return '';
        }
        return typeof item === 'number' ? item : String(item);
      })
    ) || []
  );
}

export function isStringOrNumberMatrix(data: any): data is (string | number)[][] {
  if (!Array.isArray(data)) return false;
  return data.every((row) => Array.isArray(row));
}
