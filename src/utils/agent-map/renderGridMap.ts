import * as fabric from 'fabric';

export const renderGridMap = (length: number, size: number, canvas?: fabric.Canvas) => {
  if (canvas) {
    for (let i = 0; i < length; i++) {
      canvas.add(
        new fabric.Line([i * size, 0, i * size, length * size], { type: 'line', stroke: '#d4d8de', selectable: false })
      );
      canvas.add(
        new fabric.Line([0, i * size, length * size, i * size], { type: 'line', stroke: '#d4d8de', selectable: false })
      );
    }
  }
};
