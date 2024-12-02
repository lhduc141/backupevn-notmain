import { FormInstance } from 'antd';
import { AgentMapFormType } from 'pages/AgentMap';
import { useEffect } from 'react';
import { useGetAgentMapDetailQuery } from 'services';
import { transformToFabricAgentMapOtherObject, transformToFabricAgentMapSeat } from 'utils/agent-map';
export function useAgentMapDetail(agentMapId: number, form?: FormInstance<AgentMapFormType>) {
  const { data: agentRes, isLoading } = useGetAgentMapDetailQuery(agentMapId!, {
    skip: !agentMapId,
    refetchOnMountOrArgChange: true
  });
  const data = agentRes?.data;
  const fabricSeats = transformToFabricAgentMapSeat(data?.seats || []);
  const fabricOtherObjects = transformToFabricAgentMapOtherObject(data?.otherObjects || []);
  useEffect(() => {
    if (data && form) {
      form.setFieldsValue({
        ...data,
        fabricSeats,
        fabricOtherObjects
      });
    }
  }, [data]);

  return {
    agentMap: data,
    isLoading: isLoading,
    fabricSeats,
    fabricOtherObjects
  };
}
