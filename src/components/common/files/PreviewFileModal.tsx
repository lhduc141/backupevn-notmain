import { FileOutlined } from '@ant-design/icons';
import { Button, Carousel, Modal, Typography } from 'antd';
import { CloseIcon } from 'assets';
import { find } from 'lodash';
import { useCallback, useState } from 'react';
import { colorsBase } from 'themes';
import { FileDto } from 'types';
import { convertFileType, FILE_SYMBOL, FILE_TYPE } from 'utils';
import Image from './Image';

type PreviewFileModalProps = {
  fileList: FileDto[];
  open: boolean;
  onCancel: () => void;
  current?: number;
  currentIndex?: number;
};
const PreviewFileModal: React.FC<PreviewFileModalProps> = ({ currentIndex, fileList, open, onCancel, current }) => {
  const [slide, setSlide] = useState(currentIndex || 0);

  const renderFile = useCallback(
    (item: FileDto) => {
      switch (convertFileType(item.fileType)) {
        case FILE_TYPE.IMAGE:
          return <Image url={item.url} alt={item.originalName ?? item.objectName}></Image>;
        case FILE_TYPE.VIDEO:
          return <embed src={item.url} type={item.fileType} width='100%' height='100%' />;
        case FILE_TYPE.PDF:
        case FILE_TYPE.EXCEL:
          return <embed src={item.url} type={item.fileType} width='100%' height='100%' />;

        default:
          return <div className='rounded-base bg-colorBgContainerDisabled p-5'>Không thể xem trước file</div>;
      }
    },
    [fileList]
  );
  const itemShowed = find(FILE_SYMBOL, {
    value: slide || slide === 0 ? convertFileType(fileList[slide].fileType) : FILE_TYPE.UNKNOWN
  });
  return (
    <Modal
      destroyOnClose
      prefixCls='preview-file-modal'
      open={open}
      footer={null}
      onCancel={onCancel}
      width={800}
      closeIcon={false}
    >
      <div className='absolute top-1/2 w-full translate-y-[-50%]'>
        <div className='flex h-14 w-full items-center gap-4 bg-dark-gradient px-5 text-white'>
          <div
            className='flex h-8 w-8 items-center justify-center rounded text-white'
            style={{
              background: itemShowed?.color || colorsBase.colorPrimary
            }}
          >
            {itemShowed?.icon || <FileOutlined className='text-white' />}
          </div>
          <Typography.Text className='text-lg text-white'>
            {slide || slide === 0 ? fileList[slide]?.originalName || fileList[slide]?.objectName : ''}
          </Typography.Text>
          <Button
            onClick={onCancel}
            shape='circle'
            type='text'
            className='ml-auto h-8 w-8 text-white hover:text-colorTextBase'
            icon={<CloseIcon />}
          />
        </div>
        <Carousel
          afterChange={(currentSlide) => {
            setSlide(currentSlide);
          }}
          initialSlide={slide}
          adaptiveHeight
          prefixCls='preview-file-carousel'
          arrows
          infinite
          dots={false}
        >
          {fileList &&
            fileList?.map((item, index) => (
              <div key={index} className='relative flex w-full items-center justify-center'>
                <div className='flex h-[calc(100vh-56px)] w-full items-center justify-center px-10 pb-10'>
                  {renderFile(item)}
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </Modal>
  );
};
export default PreviewFileModal;
