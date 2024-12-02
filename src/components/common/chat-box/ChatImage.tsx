import { RcFile } from 'antd/es/upload';
import React, { useState } from 'react';
import { FileUpload } from 'types';
type ChatImageProps = {
  file: FileUpload;
};
const ChatImage: React.FC<ChatImageProps> = ({ file }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const reader = new FileReader();
  reader.onload = () => {
    setImageSrc(reader.result as string);
  };

  reader.readAsDataURL(file as RcFile);

  return <img className='h-12 w-12 min-w-[48px] rounded-base object-cover' src={imageSrc || ''} alt={file.name} />;
};
export default ChatImage;
