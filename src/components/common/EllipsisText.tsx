import { Typography } from 'antd';
import { twMerge } from 'tailwind-merge';

type EllipsisTextProps = {
  value: string;
  className?: string;
  fontSize?: number;
};
const EllipsisText: React.FC<EllipsisTextProps> = ({ value, className, fontSize = 16 }) => {
  const truncatedName = (value && value.slice(0, value?.length - 10)) ?? '';
  const extension = (value && value.slice(value?.length - 10)) ?? '';

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  let textWidth = 72;
  if (context) {
    context.font = `${fontSize}px Inter`;
    textWidth = context?.measureText(extension).width;
  }
  return (
    <p className={twMerge('inline-block min-w-20 whitespace-nowrap', className)}>
      <Typography.Text
        ellipsis
        style={{
          maxWidth: `calc(100% - ${textWidth}px)`,
          fontSize
        }}
      >
        {truncatedName}
      </Typography.Text>
      <Typography.Text
        style={{
          fontSize
        }}
      >
        {extension}
      </Typography.Text>
    </p>
  );
};
export default EllipsisText;
