import { message } from 'components';
import { agentMapsMessages } from 'messages';
import { useUpdateAgentMapMutation } from 'services';
import { CreateAgentMapDto, UpdateAgentMapDto } from 'types';
import { FabricAgentMapOtherObject, FabricAgentMapSeat } from 'types/fabric-agent-map';

export function useUpdateAgentMap(agentMapId?: number) {
  const [updateAgentMap, { isLoading }] = useUpdateAgentMapMutation();
  const handleCreateAgentMap = (
    values: Partial<CreateAgentMapDto>,
    seats: FabricAgentMapSeat[],
    otherObjects?: FabricAgentMapOtherObject[]
  ) => {
    if (agentMapId) {
      const errorSeat = seats.filter((o) => !o.seatIp || o.error || !o.seatName);
      if (seats.length === 0) {
        message.systemError(agentMapsMessages.requiredSeats);
        return;
      }
      if (errorSeat.length > 0) {
        message.systemError(agentMapsMessages.errorSeats);
        return;
      }

      const data: UpdateAgentMapDto = {
        name: values.name ?? '',
        isActive: values.isActive,
        seats: seats.map((o) => ({
          height: o.height,
          left: o.left,
          seatIp: o.seatIp,
          seatName: o.seatName,
          top: o.top,
          width: o.width,
          agentMapSeatId: typeof o.id === 'number' ? o.id : undefined
        })),
        otherObjects:
          otherObjects?.map((o) => ({
            height: o.height,
            left: o.left,
            top: o.top,
            objectTypeId: o.objectTypeId,
            width: o.width,
            angle: o.angle,
            name: o.name,
            agentMapOtherObjectId: typeof o.id === 'number' ? o.id : undefined
          })) || [],
        agentMapId
      };
      return updateAgentMap({ ...data });
    }
  };

  return {
    updateAgentMap: handleCreateAgentMap,
    isLoading
  };
}
