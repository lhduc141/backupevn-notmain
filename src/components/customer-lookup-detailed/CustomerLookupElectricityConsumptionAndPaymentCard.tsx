import { Card } from 'antd';
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message';
import { useState } from 'react';
import CustomerLookupElectricityConsumptionAndPayment from './CustomerLookupElectricityConsumptionAndPayment';
import CustomerLookupElectricityConsumptionAndPaymentSamePeriod from './CustomerLookupElectricityConsumptionAndPaymentSamePeriod';
import CustomerLookupElectricityConsumptionAndPaymentAll from './CustomerLookupElectricityConsumptionAndPaymentAll';

const tabList = [
  {
    key: 'tab1',
    tab: customerLookupDetailedMessages.electricityConsumptionAndPayment
  },
  {
    key: 'tab2',
    tab: customerLookupDetailedMessages.viewAll
  },
  {
    key: 'tab3',
    tab: customerLookupDetailedMessages.samePeriod
  }
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <CustomerLookupElectricityConsumptionAndPayment />,
  tab2: <CustomerLookupElectricityConsumptionAndPaymentAll />,
  tab3: <CustomerLookupElectricityConsumptionAndPaymentSamePeriod />
};

const CustomerLookupElectricityConsumptionAndPaymentCard = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  return (
    <Card
      className='ant-card-tabs-spacing-adj ant-tabs-nav-list-spacing-adj ant-tabs-nav-mb-3 ant-card-head-border-bottom-none ant-tabs-tab-custom-btn card-body-p-none-override card-body-px5-override center-antd-nav-tabs-wrap border-bottom-none-nav-tab mt-2 w-[1048px]'
      tabList={tabList.map((tab) => ({
        ...tab,
        tab: <span className='font-semibold'>{tab.tab}</span>
      }))}
      activeTabKey={activeTabKey1}
      onTabChange={(key) => {
        onTab1Change(key);
      }}
    >
      {contentList[activeTabKey1]}
    </Card>
  );
};

export default CustomerLookupElectricityConsumptionAndPaymentCard;
