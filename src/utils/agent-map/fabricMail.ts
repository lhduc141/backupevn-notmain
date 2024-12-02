import * as fabric from 'fabric';

const pathData1 =
  'M3.336,9.078A5.749,5.749,0,0,1,9.078,3.336h.1a.273.273,0,0,0,.253-.383A4.922,4.922,0,1,0,1.255,8.2a.82.82,0,0,0-.785.817.837.837,0,0,0,.838.823H3.083a.274.274,0,0,0,.272-.3Q3.336,9.314,3.336,9.078Z';
const pathData2 =
  'M160.589,160.2a4.922,4.922,0,1,0-4.214,1.609v.03h4.179a.82.82,0,0,0,.035-1.64Zm-5.855-2.735a.547.547,0,1,1,.547-.547A.547.547,0,0,1,154.734,157.469Zm2.188,0a.547.547,0,1,1,.547-.547A.547.547,0,0,1,156.922,157.469Zm2.188,0a.547.547,0,1,1,.547-.547A.547.547,0,0,1,159.109,157.469Z';

export const fabricMail = (fill?: string) => {
  const iconPath1 = new fabric.Path(pathData1, {
    left: 0,
    top: 0,
    fill: fill || '#b3b9c4'
  });
  const iconPath2 = new fabric.Path(pathData2, {
    left: 4,
    top: 4,
    fill: fill || '#b3b9c4'
  });
  return new fabric.Group([iconPath1, iconPath2], {
    left: 32,
    top: 8,
    selectable: true,
    lockRotation: true,
    hasControls: false
  });
};
