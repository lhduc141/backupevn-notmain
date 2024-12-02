import { message } from 'components';
import * as fabric from 'fabric';
import { find, findIndex } from 'lodash';
import { colorsBase } from 'themes';
import { FabricCanvasAgentObject, FabricAgentMapSeat } from 'types/fabric-agent-map';
import { AGENT_MAP_OBJECT_TYPE } from 'utils/enums';
import { getSeatIP } from './getSeatIp';

export const onDoubleClickSeat = (
  canvasSeat: FabricCanvasAgentObject,
  seats: FabricAgentMapSeat[],
  canvas: fabric.Canvas,
  onChangeSeatIp: (data: FabricAgentMapSeat[]) => void
) => {
  const objectsSeat = canvasSeat.getObjects();
  const input = objectsSeat.find(
    (o) => o.type === 'textbox' && (o as FabricCanvasAgentObject).objectTypeId === AGENT_MAP_OBJECT_TYPE.SEAT_IP
  ) as fabric.Textbox;
  const box = objectsSeat.find((o) => o.type === 'rect') as fabric.Rect;

  if (input && canvas) {
    const { text } = input;

    const newSeatId = getSeatIP(text, canvasSeat);

    canvas?.add(newSeatId);
    canvasSeat.remove(input);

    newSeatId.selectAll();
    newSeatId.enterEditing();
    canvas?.setActiveObject(newSeatId);
    canvas?.bringObjectForward(newSeatId);
    newSeatId.on('editing:exited', () => {
      const newSeats = [...seats];
      const idxTarget = findIndex(newSeats, { id: canvasSeat.id });
      if (idxTarget !== -1) {
        const checkIp = find(
          newSeats.filter((o) => o.id !== canvasSeat.id),
          { seatIp: newSeatId.text }
        );

        if (checkIp) {
          message.systemError('Ip trùng với chỗ ngồi khác');
          box.set({
            stroke: colorsBase.colorError,
            strokeWidth: 2
          });
          newSeats[idxTarget] = {
            ...newSeats[idxTarget],
            seatIp: newSeatId.text,
            error: true
          };
        } else {
          box.set({
            stroke: colorsBase.mainTextColor,
            strokeWidth: 2
          });
          newSeats[idxTarget] = {
            ...newSeats[idxTarget],
            seatIp: newSeatId.text,
            error: false
          };
        }

        onChangeSeatIp(newSeats);
      }

      canvas?.remove(newSeatId);
      canvasSeat.add(newSeatId);
    });
  }
};
