import { message } from 'components';
import * as fabric from 'fabric';
import { agentMapsMessages } from 'messages';
import { FabricCanvasAgentObject } from 'types/fabric-agent-map';

export const onCopyObject = (
  e: KeyboardEvent,
  canvas: fabric.Canvas,
  setClipboard: (value: FabricCanvasAgentObject) => void
) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.keyCode === 67)) {
    e.preventDefault();

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.clone().then((o) => {
        const cloned = o as FabricCanvasAgentObject;
        cloned.set({ objectTypeId: (activeObject as FabricCanvasAgentObject).objectTypeId });
        setClipboard(cloned);
        message.success(agentMapsMessages.copySuccess);
      });
    }
  }
};
