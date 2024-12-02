import * as fabric from 'fabric';

export const onCanvasWheel = (event: fabric.TPointerEventInfo<WheelEvent>, canvas: fabric.Canvas) => {
  if (event.e.ctrlKey) {
    event.e.preventDefault();
    event.e.stopPropagation();

    const pointer = canvas.getPointer(event.e as fabric.TPointerEvent);
    // Lấy tỷ lệ zoom hiện tại
    let currentZoom = canvas.getZoom();
    if (event.e.deltaY < 0 && currentZoom * 1.1 <= 2) {
      currentZoom = currentZoom * 1.1;
      canvas.zoomToPoint(pointer, currentZoom);
      return currentZoom;
    }
    if (event.e.deltaY > 0 && currentZoom / 1.1 >= 1) {
      currentZoom = currentZoom / 1.1;
      canvas.zoomToPoint(pointer, currentZoom);
      return currentZoom;
    }
  }
  return;
};
