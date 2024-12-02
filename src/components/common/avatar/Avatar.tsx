import { Avatar as AvatarAntd, AvatarProps as AvatarAntdProps, Badge, Spin } from 'antd';
import { useFile } from 'hooks/files';
import { ReactNode, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { stringToHslColor } from 'utils';
export type AvatarProps = AvatarAntdProps & {
  name?: string;
  fileId?: number;
  fallBack?: ReactNode | string;
  badgeNode?: ReactNode;
  badgeClassName?: string;
  isLoading?: boolean;
  size?: number;
  avatarBackground?: string;
};
const Avatar = ({
  name,
  fileId,
  size = 24,
  avatarBackground,
  badgeNode,
  badgeClassName,
  isLoading,
  className,
  ...props
}: AvatarProps) => {
  const { file, isLoading: isLoadingGet } = useFile(fileId);
  const url = file?.url;
  if (name || url) {
    const letter = name && name[0];
    return (
      <Badge className={twMerge(badgeClassName, 'relative transition-all')} count={badgeNode}>
        <AvatarAntd
          style={{
            fontSize: size && typeof size === 'number' ? size / 2 : 14,
            background: avatarBackground ?? stringToHslColor(name, 80, 45),
            color: stringToHslColor(name, 90, 85),
            textTransform: 'uppercase'
          }}
          className={twMerge(isLoading && 'skeleton-active', 'transition-all', className)}
          {...props}
          src={`${url}?${Date.now()}`}
          size={size}
        >
          {letter}
        </AvatarAntd>
        {(isLoadingGet || isLoading) && (
          <div className='skeleton-active absolute inset-0 flex items-center justify-center rounded-full opacity-70'>
            <Spin />
          </div>
        )}
      </Badge>
    );
  }
  return <AvatarAntd size={size} {...props} />;
};

function areEqual(prev: AvatarProps, next: AvatarProps) {
  return !(
    prev.name !== next.name ||
    prev.fileId !== next.fileId ||
    prev.size !== next.size
  ); /* Trả về true nếu next bằng prevProps, ngược lại trả về false */
}
export default memo(Avatar, areEqual);
