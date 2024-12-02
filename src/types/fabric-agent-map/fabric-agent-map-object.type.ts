import * as fabric from 'fabric';
import { AGENT_MAP_OBJECT_TYPE } from 'utils';
export type FabricCanvasAgentObject = fabric.Group & {
  id?: string | number;
  objectTypeId?: AGENT_MAP_OBJECT_TYPE;
};
