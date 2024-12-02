import { Button, Typography } from 'antd';
import { CloseIcon } from 'assets';
import { InternalAnnouncementForm, PageHeader } from 'components';
import { InternalAnnouncementFormRefProps } from 'components/internal-announcements/InternalAnnouncementForm';
import { useTitle } from 'hooks';
import { internalAnnouncementsMessages, messages, sidebarMenuMessages } from 'messages';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { CreateAgentMapDto } from 'types';
import { FabricAgentMapOtherObject, FabricAgentMapSeat } from 'types/fabric-agent-map';

export type AgentMapFormType = CreateAgentMapDto & {
  fabricSeats: FabricAgentMapSeat[];
  fabricOtherObjects: FabricAgentMapOtherObject[];
};

const InternalAnnouncementPage: React.FC = () => {
  useTitle(sidebarMenuMessages.internalAnnouncement);
  const navigate = useNavigate();
  const { internalAnnouncementId: internalAnnouncementIdStr } = useParams();
  const internalAnnouncementId =
    internalAnnouncementIdStr === 'new' ? 0 : parseInt(internalAnnouncementIdStr?.toString() || '');
  const formRef = useRef<InternalAnnouncementFormRefProps>(null);

  const [loading, setLoadingForm] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      handleBackToList();
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleBackToList = () => {
    navigate(`${ROUTE.INTERNAL_ANNOUNCEMENTS}`);
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.form.submit();
    }
  };

  return (
    <div>
      <PageHeader className='flex items-center gap-4'>
        <Button icon={<CloseIcon />} onClick={handleBackToList} className='h-8 w-8' shape='circle'></Button>
        <Typography.Title className='mb-0' level={3}>
          {internalAnnouncementId ? internalAnnouncementsMessages.update : internalAnnouncementsMessages.create}
        </Typography.Title>
      </PageHeader>
      <div className='relative flex min-h-[calc(100vh-100px)] flex-col rounded-xl bg-colorBgContainer'>
        <div className='max-h-[calc(100vh-180px)] overflow-y-auto'>
          <InternalAnnouncementForm
            onCreateSuccess={() => {
              handleBackToList();
            }}
            ref={formRef}
            onChangeLoading={setLoadingForm}
            internalAnnouncementId={internalAnnouncementId}
            className='px-6 py-10'
          />
        </div>
        <div className='absolute bottom-0 left-0 flex h-20 w-full items-center justify-center border-t'>
          <Button onClick={handleSubmit} loading={loading} className='w-[102px]' type='primary'>
            {messages.saveButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InternalAnnouncementPage;
