import { Button } from 'antd';
import { CloseIcon, LeftIcon, RightIcon } from 'assets';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FileUpload } from 'types';
import { convertFileType, FILE_TYPE } from 'utils';
import ChatFile from './ChatFile';
import ChatImage from './ChatImage';

type ChatFileListProps = {
  fileList: FileUpload[];
  handleRemove: (file: FileUpload, index: number) => void;
};

const ChatFileList: React.FC<ChatFileListProps> = ({ fileList, handleRemove }) => {
  const renderFiles = useCallback(() => {
    return fileList.map((file, index) => {
      let content;
      switch (convertFileType(file.type)) {
        case FILE_TYPE.IMAGE:
          content = <ChatImage file={file} />;
          break;
        default:
          content = <ChatFile file={file} />;
      }
      return (
        <div key={`file-${index}`} className='slice-right relative transition-all'>
          {content}

          <Button
            onClick={() => handleRemove(file, index)}
            size='small'
            shape='circle'
            className='absolute -right-2 -top-1 z-10 h-5 w-5 min-w-0 bg-colorBgContainerHover p-0 text-sm text-white hover:bg-textHoverBg hover:text-colorPrimary'
            type='text'
            icon={<CloseIcon className='h-2 w-2' />}
          />
        </div>
      );
    });
  }, [fileList.length]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  useLayoutEffect(() => {
    const div = scrollContainerRef.current;
    checkScrollButtons();

    if (div) {
      div.addEventListener('resize', checkScrollButtons);
    }
    return () => {
      if (div) {
        div.removeEventListener('resize', checkScrollButtons);
      }
    };
  }, [fileList.length]);
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      // Kiểm tra xem nội dung có thể cuộn không
      setShowButtons(scrollWidth > clientWidth);
    }
  };
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  if (!fileList || fileList.length === 0) return null;

  return (
    <div className='no-scrollbar relative overflow-x-auto'>
      {showButtons && (
        <Button
          onClick={scrollLeft}
          shape='circle'
          type='text'
          className='absolute left-1 top-1/2 z-40 h-5 w-5 min-w-0 translate-y-[-50%] bg-white hover:bg-textHoverBg hover:text-colorPrimary'
          icon={<LeftIcon className='h-3 w-3' />}
        ></Button>
      )}
      <div ref={scrollContainerRef} className='no-scrollbar relative w-fit max-w-full overflow-x-auto py-2'>
        <div className='relative flex gap-2 pr-3'>{renderFiles()}</div>
      </div>
      {showButtons && (
        <Button
          onClick={scrollRight}
          shape='circle'
          type='text'
          className='absolute -right-0 top-1/2 z-40 h-5 w-5 min-w-0 translate-y-[-50%] bg-white hover:bg-textHoverBg hover:text-colorPrimary'
          icon={<RightIcon className='h-3 w-3' />}
        ></Button>
      )}
    </div>
  );
};

export default ChatFileList;
