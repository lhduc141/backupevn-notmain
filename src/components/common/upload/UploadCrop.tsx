import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';
import { messages } from 'messages';
import Upload, { UploadProps } from './Upload';

type UploadCropProps = UploadProps & {};

const UploadCrop = ({ fileList = [], onChange, multiple, ...props }: UploadCropProps) => {
  const handleCrop = (file: RcFile) => {
    onChange?.({
      file: file,
      fileList: !multiple ? [file] : [...fileList, file]
    });
  };
  return (
    <ImgCrop
      cropShape='round'
      rotationSlider
      modalOk={messages.confirmButtonText}
      modalCancel={messages.cancelButtonText}
      onModalOk={(file) => handleCrop(file as RcFile)}
    >
      <Upload {...props} multiple fileList={fileList} accept='.jpeg, .png, .jpg'></Upload>
    </ImgCrop>
  );
};

export default UploadCrop;
