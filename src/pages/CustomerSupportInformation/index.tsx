import { Button, Typography } from 'antd';
import { CloseIcon } from 'assets';
import { CustomerSupportInformationForm, PageHeader } from 'components';
import { CustomerSupportInformationFromRefProps } from 'components/customer-support-information/CustomerSupportInformationForm';
import { useTitle } from 'hooks';
import { customerSupportInformationMessages, messages, sidebarMenuMessages } from 'messages';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { CreateAgentMapDto } from 'types';
import { FabricAgentMapOtherObject, FabricAgentMapSeat } from 'types/fabric-agent-map';

export type AgentMapFormType = CreateAgentMapDto & {
  fabricSeats: FabricAgentMapSeat[];
  fabricOtherObjects: FabricAgentMapOtherObject[];
};

const CustomerSupportInformationPage: React.FC = () => {
  useTitle(sidebarMenuMessages.customerSupportInformation);
  const navigate = useNavigate();
  const { customerSupportInformationId: customerSupportInformationIdStr } = useParams();
  const customerSupportInformationId =
    customerSupportInformationIdStr === 'new' ? 0 : parseInt(customerSupportInformationIdStr?.toString() || '');
  const customerSIRef = useRef<CustomerSupportInformationFromRefProps>(null);

  const [loadingCustomerSI, setLoadingCustomerSI] = useState(false);

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
    navigate(`${ROUTE.CUSTOMER_SUPPORT_INFORMATION}`);
  };

  const handleSubmit = () => {
    if (customerSIRef.current) {
      customerSIRef.current.form.submit();
    }
  };

  return (
    <div>
      <PageHeader className='flex items-center gap-4'>
        <Button icon={<CloseIcon />} onClick={handleBackToList} className='h-8 w-8' shape='circle'></Button>
        <Typography.Title className='mb-0' level={3}>
          {customerSupportInformationId
            ? customerSupportInformationMessages.update
            : customerSupportInformationMessages.create}
        </Typography.Title>
      </PageHeader>
      <div className='relative flex min-h-[calc(100vh-100px)] flex-col rounded-xl bg-colorBgContainer'>
        <div className='max-h-[calc(100vh-180px)] overflow-y-auto'>
          <CustomerSupportInformationForm
            onCreateSuccess={handleBackToList}
            ref={customerSIRef}
            onChangeLoading={setLoadingCustomerSI}
            customerSupportInformationId={customerSupportInformationId}
            className='px-6 py-10'
          />
        </div>
        <div className='absolute bottom-0 left-0 flex h-20 w-full items-center justify-center border-t'>
          <Button onClick={handleSubmit} loading={loadingCustomerSI} className='w-[102px]' type='primary'>
            {messages.saveButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportInformationPage;
