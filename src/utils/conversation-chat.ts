import { findIndex } from 'lodash';
import { MessagePosition } from 'types/message-position.type';

export const calculateStartEndPositionMessage = (
  { scrollTop, clientHeight }: { scrollTop: number; clientHeight: number },
  messagePositions: MessagePosition[]
) => {
  const viewportStart = scrollTop;
  const viewportEnd = scrollTop + clientHeight;

  const startIndex = findIndex(messagePositions, (o) => o.position + o.height >= viewportStart - 300);
  const endIndex = findIndex(messagePositions, (o) => o.position >= viewportEnd + 300);
  return {
    start: startIndex === -1 ? 0 : startIndex,
    end: endIndex === -1 ? messagePositions.length : endIndex
  };
};
