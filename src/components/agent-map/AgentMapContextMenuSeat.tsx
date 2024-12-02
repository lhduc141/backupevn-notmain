import { DeleteOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { EditFormIcon, EditIcon, TrashIcon } from 'assets';
import { agentMapsMessages } from 'messages/agent-maps.messages';
import { forwardRef, useImperativeHandle, useState } from 'react';

type AgentMapContextMenuSeatProps = {
  items?: MenuProps['items'];
  onDeleteSeat: (seatId: string | number) => void;
  onEditInfoSeat: (seatId: string | number) => void;
};
export type AgentMapContextMenuSeatRef = {
  open: (
    position: {
      x: number;
      y: number;
    },
    seatId: string | number
  ) => void;
};

const AgentMapContextMenuSeat = forwardRef<AgentMapContextMenuSeatRef, AgentMapContextMenuSeatProps>(
  ({ items, onDeleteSeat, onEditInfoSeat }, ref) => {
    useImperativeHandle(ref, () => ({
      open: handleRightClick
    }));
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [seatId, setSeatId] = useState<string | number>();

    const handleRightClick = (
      position: {
        x: number;
        y: number;
      },
      seatId: string | number
    ) => {
      setPosition({
        x: position.x,
        y: position.y
      });
      setSeatId(seatId);
      setOpen(true);
    };

    const itemsMenu = [
      ...(items || []),
      {
        key: 'edit-info',
        label: agentMapsMessages.editInfo,
        icon: <EditIcon />,
        onClick: () => {
          if (seatId) {
            onEditInfoSeat(seatId);
          }
        }
      },
      {
        key: 'delete',
        label: agentMapsMessages.delete,
        icon: <TrashIcon />,
        onClick: () => {
          if (seatId) {
            onDeleteSeat(seatId);
          }
        }
      }
    ];

    if (open)
      return (
        <Dropdown
          menu={{
            items: itemsMenu
          }}
          trigger={['click']}
          open={open}
          onOpenChange={setOpen}
          getPopupContainer={() => document.body}
          overlayClassName='text-sm'
          prefixCls='message-dropdown'
        >
          <div
            style={{
              position: 'absolute',
              top: `${position.y}px`,
              left: `${position.x}px`,
              zIndex: 9999
            }}
          />
        </Dropdown>
      );
    return null;
  }
);

export default AgentMapContextMenuSeat;
