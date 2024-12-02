import { ColorPicker as ColorPickerAntd, Popover } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const colorOptions = [
  '#6060a6',
  '#ffb754',
  '#87ae50',
  '#6c95b0',
  '#a0d9e5',
  '#cc2e55',
  '#ffbfbb',
  '#00508b',
  '#015a61'
];
type ColorSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
};
const ColorSelect: React.FC = ({ value, onChange }: ColorSelectProps) => {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(value);

  useEffect(() => {
    setSelectedColor(value);
  }, [value]);

  const handleColorChange = (color: string) => {
    if (color !== selectedColor) {
      setSelectedColor(color);
      onChange?.(color);
    }
  };

  const colorOptionsJSX = useMemo(
    () =>
      colorOptions.map((color) => (
        <div
          className={twMerge(
            'flex h-8 w-8 cursor-pointer rounded-base transition-all hover:border-colorPrimaryActive',
            selectedColor === color ? 'border-2 border-colorPrimary' : 'border border-colorBorder'
          )}
          key={color}
          onClick={() => handleColorChange(color)}
        >
          <div
            className='m-auto h-6 w-6 rounded'
            style={{
              backgroundColor: color
            }}
          ></div>
        </div>
      )),
    [selectedColor]
  );
  return (
    <Popover placement='topLeft' content={<div className='flex gap-4'>{colorOptionsJSX}</div>} trigger='click'>
      <ColorPickerAntd value={selectedColor} open={false} format='hex' disabledAlpha />
    </Popover>
  );
};

export default ColorSelect;
