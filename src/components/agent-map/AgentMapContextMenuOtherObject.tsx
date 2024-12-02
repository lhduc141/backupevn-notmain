import { DeleteOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { agentMapsMessages } from 'messages/agent-maps.messages';
import { forwardRef, useImperativeHandle, useState } from 'react';

type AgentMapContextMenuOtherObjectProps = {
  items?: MenuProps['items'];
  onDeleteOtherObject: (otherObjectId: string | number) => void;
};
export type AgentMapContextMenuOtherObjectRef = {
  open: (
    position: {
      x: number;
      y: number;
    },
    otherObjectId: string | number
  ) => void;
};

const AgentMapContextMenuOtherObject = forwardRef<
  AgentMapContextMenuOtherObjectRef,
  AgentMapContextMenuOtherObjectProps
>(({ items, onDeleteOtherObject }, ref) => {
  useImperativeHandle(ref, () => ({
    open: handleRightClick
  }));

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [otherObjectId, setSeatId] = useState<string | number>();

  const handleRightClick = (
    position: {
      x: number;
      y: number;
    },
    otherObjectId: string | number
  ) => {
    setPosition({
      x: position.x,
      y: position.y
    });
    setSeatId(otherObjectId);
    setOpen(true);
  };
  const itemsMenu: MenuProps['items'] = [
    ...(items || []),
    {
      key: 'delete',
      label: agentMapsMessages.deleteObject,
      icon: <DeleteOutlined />,
      onClick: () => {
        if (otherObjectId) {
          onDeleteOtherObject(otherObjectId);
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
});

export default AgentMapContextMenuOtherObject;
