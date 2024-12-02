import React from 'react';
import { twMerge } from 'tailwind-merge';

type ImageProps = {
  url?: string;
  alt?: string;
  className?: string;
};
const Image: React.FC<ImageProps> = ({ url, alt, className }) => {
  return (
    <img loading='lazy' className={twMerge('h-full w-auto rounded-sm object-contain', className)} src={url} alt={alt} />
  );
};
export default Image;
