import { Card } from "antd";
import React, { useState } from 'react';
import { customerLookupDetailedMessages } from "messages/customer-lookup-detailed.message";
import CustomerLookupRequestHistoryTicketProcessing from "./CustomerLookupRequestHistoryTicketProcessing";
import CustomerLookupRequestHistoryTicketList from "./CustomerLookupRequestHistoryTicketList";
import CusTomerLookupRequestHistoryOutageHistory from "./CusTomerLookupRequestHistoryOutageHistory";
import CustomerLookupRequestHistoryQuestion from "./CustomerLookupRequestHistoryQuestion";
const tabList = [
    {
        key: 'tab1',
        tab: customerLookupDetailedMessages.progressing,
    },
    {
        key: 'tab2',
        tab: customerLookupDetailedMessages.requestHistory,
    },
    {
        key: 'tab3',
        tab: customerLookupDetailedMessages.outageHistory,
    },
    {
        key: 'tab4',
        tab: customerLookupDetailedMessages.questionAndAnswer,
    },
];

const contentList: Record<string, React.ReactNode> = {
    tab1: <CustomerLookupRequestHistoryTicketProcessing />,
    tab2: <CustomerLookupRequestHistoryTicketList />,
    tab3: <CusTomerLookupRequestHistoryOutageHistory />,
    tab4: <CustomerLookupRequestHistoryQuestion />
};
const CustomerLookupRequestHistoryCard = () => {
    const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };
    return (
        <Card
            className="ant-card-body-px-5 w-[1048px] ant-card-tabs-spacing-adj ant-tabs-nav-list-spacing-adj ant-card-head-border-bottom-none center-antd-nav-tabs-wrap ant-tabs-nav-mb-3 card-body-p-none-override ant-tabs-tab-custom-btn  border-bottom-none-nav-tab"
            style={{ width: '100%' }}
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
export default CustomerLookupRequestHistoryCard