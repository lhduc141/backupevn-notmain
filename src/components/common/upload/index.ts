import ServerIcon from './ServerIcon';
import ServerUpload from './ServerUpload';
import OriginUpload from './Upload';
import UploadCrop from './UploadCrop';
import UploadFileItem from './UploadFileItem';
import ServerDragger from './ServerDragger';
import Dragger from './Dragger';

export type UploadProps = typeof OriginUpload & {
  ServerUpload: typeof ServerUpload;
  Crop: typeof UploadCrop;
  ServerIcon: typeof ServerIcon;
  ServerDragger: typeof ServerDragger;
  Dragger: typeof Dragger;
};
const Upload = OriginUpload as UploadProps;
Upload.Crop = UploadCrop;
Upload.ServerUpload = ServerUpload;
Upload.ServerDragger = ServerDragger;
Upload.ServerIcon = ServerIcon;
Upload.Dragger = Dragger;

export { Upload, UploadFileItem };
