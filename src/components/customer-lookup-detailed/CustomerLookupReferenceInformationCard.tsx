import { Card } from "antd";
import React, { useState } from 'react';
import { customerLookupDetailedMessages } from "messages/customer-lookup-detailed.message";
import CustomerLookupReferenceInformationOutageSchedule from "./CustomerLookupReferenceInformationOutageSchedule";
import CustomerLookupReferenceInformationBillingSchedule from "./CustomerLookupReferenceInformationBillingSchedule";
import CustomerLookupReferenceInformationElectricityMeterCode from "./CustomerLookupReferenceInformationElectricityMeterCode";
import CustomerLookupReferenceInformationElectricityPrice from "./CustomerLookupReferenceInformationElectricityPrice";
import CustomerLookupReferenceInformationPaymentCollection from "./CustomerLookupReferenceInformationPaymentCollection";
import CustomerLookupReferenceInformationOttInformation from "./CustomerLookupReferenceInformationOttInformation";

const tabList = [
    {
        key: 'tab1',
        tab: `${customerLookupDetailedMessages.outageSchedule}/${customerLookupDetailedMessages.powerGridCondition}`,
    },
    {
        key: 'tab2',
        tab: customerLookupDetailedMessages.billingSchedule,
    },
    {
        key: 'tab3',
        tab: customerLookupDetailedMessages.electricityPrice,
    },
    {
        key: 'tab4',
        tab: customerLookupDetailedMessages.paymentCollection,
    },
    {
        key: 'tab5',
        tab: customerLookupDetailedMessages.electricityMeterCode,
    },
    {
        key: 'tab6',
        tab: customerLookupDetailedMessages.ottInformation,
    },
];

const contentList: Record<string, React.ReactNode> = {
    tab1: <p><CustomerLookupReferenceInformationOutageSchedule /></p>,
    tab2: <p><CustomerLookupReferenceInformationBillingSchedule /></p>,
    tab3: <p><CustomerLookupReferenceInformationElectricityPrice /></p>,
    tab4: <p><CustomerLookupReferenceInformationPaymentCollection /></p>,
    tab5: <p><CustomerLookupReferenceInformationElectricityMeterCode /></p>,
    tab6: <p><CustomerLookupReferenceInformationOttInformation /></p>
}

const CustomerLookupReferenceInformationCard = () => {
    const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };
    return (
        <Card

            className="w-[1048px] mt-2 ant-card-tabs-spacing-adj ant-tabs-nav-list-spacing-adj ant-tabs-nav-mb-3 ant-card-head-border-bottom-none ant-tabs-tab-custom-btn card-body-p-none-override card-body-px5-override center-antd-nav-tabs-wrap border-bottom-none-nav-tab"
            tabList={tabList.map(tab => ({
                ...tab,
                tab: <span className="font-semibold">{tab.tab}</span>
            }))}
            activeTabKey={activeTabKey1}
            onTabChange={key => {
                onTab1Change(key);
            }}
        >
            {contentList[activeTabKey1]}
        </Card>
    )
}

export default CustomerLookupReferenceInformationCard