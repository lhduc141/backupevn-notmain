import { Typography } from 'antd';
import { ServerFileList } from 'components/common';
import { internalAnnouncementsMessages } from 'messages';

type InternalAnnouncementAttachmentProps = {
  files: number[];
};
const InternalAnnouncementAttachment = ({ files }: InternalAnnouncementAttachmentProps) => {
  return (
    <div className='flex h-[96px] w-full items-center border-t'>
      <div className='min-w-[100px] flex-1'>
        <Typography.Title className='m-0 text-sm'>{internalAnnouncementsMessages.files}</Typography.Title>
      </div>
      <div>
        <ServerFileList
          isPreview
          fileList={files}
          itemProps={{ className: 'max-w-[40px] h-[60px]', showInfo: false }}
        />
      </div>
    </div>
  );
};

export default InternalAnnouncementAttachment;
