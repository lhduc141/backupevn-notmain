import { Button, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { ThreeDots } from 'assets';
import { messages } from 'messages';
import { WorkingScheduleDto } from 'types';

type WorkingScheduleActionProps = {
  workingSchedule: WorkingScheduleDto;
  onDelete?: (workingSchedule: WorkingScheduleDto) => void;
};

const WorkingScheduleActions = ({ workingSchedule, onDelete }: WorkingScheduleActionProps) => {
  const actionItems: ItemType[] = [
    {
      key: 'delete',
      danger: true,
      label: messages.deleteButtonText
    }
  ];

  const onClickActionItem = (action: string, data: WorkingScheduleDto) => {
    switch (action) {
      case 'delete':
        onDelete?.(data);
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
            onClickActionItem(key, workingSchedule);
          }
        }}
      >
        <Button type='text' shape='circle'>
          <ThreeDots />
        </Button>
      </Dropdown>
    </>
  );
};

export default WorkingScheduleActions;
