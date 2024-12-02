import { MessageDto } from 'types';
import { isDecimalGreaterThanHalf } from 'utils/common';
import { MESSAGE_IMAGE_HEIGHT, MESSAGE_IMAGE_HEIGHT_MEDIUM } from 'utils/constants';

export const splitImageList = (images: any[]) => {
  let firstArr,
    secondArr,
    thirdArr: number[] = [];
  if (images.length <= 2) {
    firstArr = [...images];
  } else if (images.length % 3 === 0) {
    secondArr = [...images];
  } else {
    const decimalPart = isDecimalGreaterThanHalf(images.length);
    if (decimalPart) {
      firstArr = images.slice(0, 2);
      secondArr = images.slice(2);
    } else {
      firstArr = images.slice(0, 2);
      secondArr = images.slice(2, -2);
      thirdArr = images.slice(-2);
    }
  }
  return [firstArr, secondArr, thirdArr];
};
export const calculateHeightMessageList = (fileId: any[], message: MessageDto): number => {
  if (!message) return 0;
  let heightMessage = 0;
  const splitImages = splitImageList(fileId);
  if (splitImages) {
    const rowsCount = splitImages[1]?.length ? splitImages[1]?.length / 3 : 0;
    if (splitImages[0]?.length && splitImages[0]?.length > 0) {
      heightMessage += MESSAGE_IMAGE_HEIGHT_MEDIUM + 2;
    }
    if (splitImages[2]?.length && splitImages[2]?.length > 0) {
      heightMessage += MESSAGE_IMAGE_HEIGHT_MEDIUM + 2;
    }
    heightMessage += rowsCount * MESSAGE_IMAGE_HEIGHT + rowsCount * 2;
  }
  if (message.content?.length && message.content?.length > 0) {
    const clone = document.createElement('div');
    clone.className =
      'relative min-w-[70px] max-w-[384px] whitespace-pre-wrap break-words rounded-lg px-3 pb-8 pt-2 text-left text-sm';
    clone.innerHTML = message.content;
    document.body.appendChild(clone);
    const height = clone.offsetHeight;
    document.body.removeChild(clone);

    heightMessage += height;
  }
  /** Padding border */
  heightMessage += 2;
  return heightMessage;
};
