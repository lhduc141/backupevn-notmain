import { Button, Spin, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Modal } from 'components';
import { SystemConfigForm, SystemConfigFormRefProps } from 'components/system-configs';
import SystemConfigLayout from 'layouts/SystemConfigLayout';
import { messages, systemConfigsMessages } from 'messages';
import { useRef, useState } from 'react';
import { useGetSystemConfigsQuery } from 'services/system-configs';

const RatingSystemPage: React.FC = () => {
  const systemConfigFormRef = useRef<SystemConfigFormRefProps>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useGetSystemConfigsQuery();
  const systemConfig = data?.data;

  return (
    <SystemConfigLayout>
      <Content className='flex flex-col rounded-xl bg-colorBgContainer pt-5'>
        {isLoading ? (
          <Spin />
        ) : (
          <div className='flex'>
            <div className='flex-1'>
              <Typography.Title level={5} className='mb-2'>
                {systemConfigsMessages.ratingSystemApiUrl}
              </Typography.Title>
              <Typography.Paragraph>
                {systemConfig?.ratingSystemApiUrl || systemConfigsMessages.noValue}
              </Typography.Paragraph>
              <Typography.Title level={5} className='mb-2'>
                {systemConfigsMessages.ratingSystemApiKey}
              </Typography.Title>
              <Typography.Paragraph>
                {systemConfig?.ratingSystemApiKey || systemConfigsMessages.noValue}
              </Typography.Paragraph>
            </div>
            <div>
              <Button
                type='link'
                onClick={() => {
                  setOpen(true);
                }}
              >
                {messages.updateAt}
              </Button>
            </div>
          </div>
        )}
      </Content>
      <Modal.Headless
        maskClosable={false}
        centered
        width={688}
        title={systemConfigsMessages.updateRatingSystem}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        destroyOnClose
        footer={[
          <Button
            loading={loading}
            onClick={() => {
              if (systemConfigFormRef.current) {
                systemConfigFormRef.current.form.submit();
              }
            }}
            size='large'
            type='primary'
          >
            {messages.saveButtonText}
          </Button>
        ]}
      >
        <SystemConfigForm
          onSubmitSuccess={() => {
            setOpen(false);
          }}
          ref={systemConfigFormRef}
          onChangeLoading={setLoading}
        />
      </Modal.Headless>
    </SystemConfigLayout>
  );
};

export default RatingSystemPage;
