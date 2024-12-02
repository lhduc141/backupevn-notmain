import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FileDto } from 'types';
import PreviewFileModal from './PreviewFileModal';
import ServerFile from './ServerFile';

type ServerFileListProps = {
  fileList: number[];
  className?: string;
  itemProps?: {
    className?: string;
    showInfo?: boolean;
  };
  isPreview?: boolean;
};
const ServerFileList: React.FC<ServerFileListProps> = ({ isPreview, fileList, className, itemProps }) => {
  const [itemsData, setItemsData] = useState<FileDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>();

  const handleDataFetched = (data: FileDto) => {
    setItemsData((prev) => [...prev, data]);
  };

  const handlePreview = (idx: number) => {
    setCurrentIndex(idx);
    setIsModalOpen(true);
  };
  return (
    <div className={twMerge('slim-scrollbar-horizontal mb-2 flex w-full items-center gap-2 overflow-auto', className)}>
      {fileList &&
        fileList?.map((file, idx) => (
          <ServerFile
            key={file}
            {...itemProps}
            onDataFetched={handleDataFetched}
            preview={(data) => handlePreview(idx)}
            isPreview={isPreview}
            className={twMerge('h-24 w-auto', itemProps?.className)}
            fileId={file}
          />
        ))}
      {isPreview && isModalOpen && (
        <PreviewFileModal
          currentIndex={currentIndex}
          open={isModalOpen}
          fileList={itemsData}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
export default ServerFileList;
