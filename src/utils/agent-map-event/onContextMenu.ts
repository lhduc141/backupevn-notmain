import { FabricCanvasAgentObject } from 'types/fabric-agent-map';

export const onCanvasContextMenu = (e: any, parentDiv: HTMLDivElement) => {
  e.e.preventDefault();
  if (!e.target) return;
  const target = e.target as FabricCanvasAgentObject;
  if (target?.id && parentDiv) {
    const event = e.e as PointerEvent;
    /** Lấy vị trí chuột so với cửa sổ trình duyệt */
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    /** Lấy tọa độ của div cha */
    const parentRect = parentDiv.getBoundingClientRect();

    /** Tính vị trí chuột so với div cha */
    const relativeX = mouseX - parentRect.left + parentDiv.scrollLeft;
    const relativeY = mouseY - parentRect.top + parentDiv.scrollTop;

    return {
      x: relativeX,
      y: relativeY,
      id: target.id,
      objectTypeId: target.objectTypeId
    };
  }
};
