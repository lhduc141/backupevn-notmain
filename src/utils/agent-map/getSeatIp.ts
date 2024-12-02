import { colorsBase } from 'themes';
import { AGENT_MAP_OBJECT_TYPE } from 'utils/enums';
import * as fabric from 'fabric';
import { FabricCanvasAgentObject } from 'types/fabric-agent-map';

export const getSeatIP = (seatIp: string, canvasSeat?: FabricCanvasAgentObject) => {
  let left = 1;
  let top = 56;
  if (canvasSeat) {
    const { left: leftGroup, top: topGroup } = canvasSeat;
    left = leftGroup + 1;
    top = topGroup + 56;
  }

  const seatId = new fabric.Textbox(seatIp, {
    left,
    top,
    width: 82,
    fontSize: 11,
    editable: true,
    textAlign: 'center',
    fontFamily: 'inter',
    splitByGrapheme: true,
    fill: colorsBase.mainTextColor,
    lockRotation: true,
    lockScalingX: true,
    lockScalingY: true,
    selectable: false
  });
  seatId.set({ objectTypeId: AGENT_MAP_OBJECT_TYPE.SEAT_IP });
  return seatId;
};
