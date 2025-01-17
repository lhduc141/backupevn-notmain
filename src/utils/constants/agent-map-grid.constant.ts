import { AGENT_MAP_OBJECT_TYPE } from 'utils/enums';

export const AGENT_MAP_GRID_NUM = 93;
export const AGENT_MAP_GRID_SIZE = 32;
export const AGENT_MAP_SIZE = 2500;
export const AGENT_MAP_SCALE_MAX = 2;

export const agentMapOtherObjectsTypes = [
  AGENT_MAP_OBJECT_TYPE.DOUBLE_DOOR,
  AGENT_MAP_OBJECT_TYPE.SINGLE_DOOR,
  AGENT_MAP_OBJECT_TYPE.SLIDING_DOOR,
  AGENT_MAP_OBJECT_TYPE.WALL
];

export const agentMapDoorTypes = [
  AGENT_MAP_OBJECT_TYPE.DOUBLE_DOOR,
  AGENT_MAP_OBJECT_TYPE.SINGLE_DOOR,
  AGENT_MAP_OBJECT_TYPE.SLIDING_DOOR
];
