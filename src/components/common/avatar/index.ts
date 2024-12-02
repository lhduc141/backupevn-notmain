import OriginAvatar from './Avatar';
import AvatarUploadCrop from './UploadCrop';
import AvatarUploadOnlyCrop from './UploadOnly';
import AvatarSelection from './SelectAvatar';

export type AvatarProps = typeof OriginAvatar & {
  UploadCrop: typeof AvatarUploadCrop;
  UploadOnlyCrop: typeof AvatarUploadOnlyCrop;
  Select: typeof AvatarSelection;
};
const Avatar = OriginAvatar as AvatarProps;

Avatar.UploadCrop = AvatarUploadCrop;
Avatar.UploadOnlyCrop = AvatarUploadOnlyCrop;
Avatar.Select = AvatarSelection;

export { Avatar };
