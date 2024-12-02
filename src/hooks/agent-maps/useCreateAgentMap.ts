import { message } from 'components';
import { agentMapsMessages } from 'messages';
import { useCreateAgentMapMutation } from 'services';
import { CreateAgentMapDto } from 'types';
import { FabricAgentMapOtherObject, FabricAgentMapSeat } from 'types/fabric-agent-map';

export function useCreateAgentMap() {
  const [createAgentMap, { isLoading }] = useCreateAgentMapMutation();
  const handleCreateAgentMap = (
    values: Partial<CreateAgentMapDto>,
    seats: FabricAgentMapSeat[],
    otherObjects?: FabricAgentMapOtherObject[]
  ) => {
    const errorSeat = seats.filter((o) => !o.seatIp || o.error);
    if (seats.length === 0) {
      message.systemError(agentMapsMessages.requiredSeats);
      return;
    }
    if (errorSeat.length > 0) {
      message.systemError(agentMapsMessages.errorSeats);
      return;
    }

    const data: CreateAgentMapDto = {
      name: values.name ?? '',
      isActive: values.isActive,
      seats: seats.map((o) => ({
        height: o.height,
        left: o.left,
        seatIp: o.seatIp,
        seatName: o.seatName,
        top: o.top,
        width: o.width
      })),
      otherObjects:
        otherObjects?.map((o) => ({
          height: o.height,
          left: o.left,
          top: o.top,
          objectTypeId: o.objectTypeId,
          width: o.width,
          angle: o.angle,
          name: o.name
        })) || []
    };
    return createAgentMap(data);
  };

  return {
    createAgentMap: handleCreateAgentMap,
    isLoading
  };
}
