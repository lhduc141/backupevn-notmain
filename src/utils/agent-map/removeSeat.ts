import * as fabric from 'fabric';

export const removeSeat = (seatId: string | number, canvas: fabric.Canvas, seats: any[]) => {
  if (canvas) {
    const objects = canvas.getObjects() as Array<fabric.Object & { id?: string | number }>;
    const removedItem = objects.find((o) => o.id === seatId);
    if (removedItem) {
      canvas.remove(removedItem);
    }
  }
  return seats.filter((o) => o.id !== seatId);
};
