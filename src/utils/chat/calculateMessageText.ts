import { MessageDto } from 'types';
import { MESSAGE_SENDER_NAME } from 'utils/constants';

export const calculateHeightMessageText = (
  message: MessageDto,
  props?: {
    isFirstOfSender?: boolean;
    isGroup?: boolean;
    isMe?: boolean;
  }
): number => {
  if (!message) return 0;
  const isUrls = !!message.metadata;
  const contentDiv = document.createElement('div');
  let height = 0;
  contentDiv.className = `relative min-w-[70px] whitespace-pre-wrap break-words rounded-lg px-3 pb-8 pt-2 text-left text-sm ${isUrls ? 'max-w-[336px]' : 'max-w-[556px]'}`;
  contentDiv.innerHTML = message.content;

  document.body.appendChild(contentDiv);
  if (isUrls) {
    const urlDiv = document.createElement('div');
    urlDiv.className = `'mt-2 flex flex-col gap-2 rounded-lg  `;
    const imgDiv = document.createElement('div');
    imgDiv.className = 'w-[312px] h-[160px] text-sm';
    urlDiv.appendChild(imgDiv);

    /** title */
    const titleDiv = document.createElement('div');
    titleDiv.className = 'text-sm mb-2';

    titleDiv.innerHTML = message.metadata?.title ?? '';
    urlDiv.appendChild(titleDiv);

    /** descriptions */
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'text-sm';
    descriptionDiv.innerHTML = message.metadata?.description ?? '';
    urlDiv.appendChild(descriptionDiv);

    /** app name */
    const appNameDiv = document.createElement('div');
    appNameDiv.className = 'text-sm';
    appNameDiv.innerHTML = message.metadata?.appName ?? '';
    urlDiv.appendChild(appNameDiv);

    document.body.appendChild(urlDiv);
    contentDiv.appendChild(urlDiv);
    height = contentDiv.offsetHeight;
    document.body.removeChild(contentDiv);
  } else {
    height = contentDiv.offsetHeight;
    document.body.removeChild(contentDiv);
  }

  /** Hiển thị tên người gửi trong chat nhóm ở tin nhắn đầu tiền của người gửi */
  const senderNameHeight = !props?.isMe && props?.isGroup && props?.isFirstOfSender ? MESSAGE_SENDER_NAME : 0;

  return height + senderNameHeight;
};
