import { AgentMapFormInfoSeatType } from 'components/agent-map/AgentMaModalInfoSeat';
import * as fabric from 'fabric';
import { FabricCanvasAgentObject } from 'types/fabric-agent-map';
import { AGENT_MAP_OBJECT_TYPE } from 'utils/enums';
import { getSeatIP } from './getSeatIp';
import { getSeatName } from './getSeatName';

export const editInfoSeat = (values: AgentMapFormInfoSeatType, canvas: fabric.Canvas) => {
  if (canvas) {
    const objects = canvas.getObjects() as Array<fabric.Object & { id?: string | number }>;
    const objectsSeat = objects.find((o) => o.id === values.id) as FabricCanvasAgentObject;
    const objectsSeatGroup = objectsSeat.getObjects();

    if (values.seatIp) {
      const seatIPText = objectsSeatGroup.find(
        (o) => o.type === 'textbox' && (o as FabricCanvasAgentObject).objectTypeId === AGENT_MAP_OBJECT_TYPE.SEAT_IP
      ) as fabric.Textbox;
      if (seatIPText) {
        objectsSeat.remove(seatIPText);
      }
      const newSeatIp = getSeatIP(values.seatIp, objectsSeat);
      objectsSeat.add(newSeatIp);
    }

    if (values.seatName) {
      const seatNameText = objectsSeatGroup.find(
        (o) => o.type === 'textbox' && (o as FabricCanvasAgentObject).objectTypeId === AGENT_MAP_OBJECT_TYPE.SEAT_NAME
      ) as fabric.Textbox;
      if (seatNameText) {
        objectsSeat.remove(seatNameText);
      }
      const newSeatName = getSeatName(values.seatName, objectsSeat);
      objectsSeat.add(newSeatName);
    }

    objectsSeat.set('dirty', true);
    canvas.renderAll();
  }
};
