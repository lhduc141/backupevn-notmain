import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { internalAnnouncementsMessages, messages } from 'messages';
import { InternalAnnouncementDto } from 'types';

type InternalAnnouncementActionProps = {
  internalAnnouncement: InternalAnnouncementDto;
  onUpdateInfo?: (internalAnnouncement: InternalAnnouncementDto) => void;
  onUpdateStatus?: (internalAnnouncement: InternalAnnouncementDto) => void;
  onDelete?: (internalAnnouncement: InternalAnnouncementDto) => void;
};
const InternalAnnouncementActions = ({
  internalAnnouncement,
  onDelete,
  onUpdateInfo,
  onUpdateStatus
}: InternalAnnouncementActionProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'updateInfo',
      label: messages.updateInfo
    },
    {
      type: 'divider'
    },
    {
      key: 'updateStatus',
      label: internalAnnouncementsMessages.updateStatus
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      label: messages.deleteButtonText,
      danger: true
    }
  ];

  const onClickActionItem = (action: string, data: InternalAnnouncementDto) => {
    switch (action) {
      case 'updateInfo':
        onUpdateInfo?.(data);
        break;
      case 'delete':
        onDelete?.(data);
        break;
      case 'updateStatus':
        onUpdateStatus?.(data);
        break;
    }
  };

  return (
    <>
      <Dropdown
        trigger={['click']}
        menu={{
          items: actionItems,
          onClick: ({ key }) => {
            onClickActionItem(key, internalAnnouncement);
          }
        }}
        openClassName='border-colorPrimaryActive'
      >
        <Button type='text' shape='circle'>
          <ThreeDots />
        </Button>
      </Dropdown>
    </>
  );
};

export default InternalAnnouncementActions;
