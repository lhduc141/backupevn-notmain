import { MessageDto } from 'types';
import { MESSAGE_IMAGE_HEIGHT_LARGE } from 'utils/constants';

export const calculateHeightMessageImage = (message: MessageDto): number => {
  if (!message) return 0;
  let heightMessage = 0;

  heightMessage += MESSAGE_IMAGE_HEIGHT_LARGE;
  if (message.content?.length && message.content?.length > 0) {
    const clone = document.createElement('div');
    clone.className =
      'relative min-w-[70px] max-w-[362px] whitespace-pre-wrap break-words rounded-lg px-3 pb-8 pt-2 text-left text-sm';
    clone.innerHTML = message.content;
    document.body.appendChild(clone);
    const height = clone.offsetHeight;
    document.body.removeChild(clone);
    heightMessage += height;
    /** Padding border */
    heightMessage += 2;
  }

  return heightMessage;
};
