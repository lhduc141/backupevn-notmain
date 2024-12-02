import { DrawerProps as AntdDrawerProps, Drawer as AntdDrawer, Typography, Button } from 'antd';
import { CloseIcon } from 'assets';

type DrawerProps = AntdDrawerProps;

const Drawer = ({ title, extra, children, ...props }: DrawerProps) => {
  return (
    <AntdDrawer
      {...props}
      closeIcon={null}
      styles={{
        body: {
          padding: 0
        }
      }}
    >
      <div className='flex w-full items-center px-6 py-4'>
        <Typography.Text type='secondary' className='flex-1 font-normal'>
          {title}
        </Typography.Text>
        <div className='flex items-center gap-x-2'>
          {extra}
          <Button type='text' shape='circle' className='h-8' onClick={props.onClose}>
            <CloseIcon />
          </Button>
        </div>
      </div>
      <div className='h-[calc(100%-64px)] px-6'>{children}</div>
    </AntdDrawer>
  );
};

export default Drawer;
