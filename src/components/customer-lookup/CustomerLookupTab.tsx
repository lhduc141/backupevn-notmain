import { Badge, Tabs, TabsProps } from "antd";
import CustomerLookupTable from "./CustomerLookupTable";
import { HistoryIcon, HistoryRotateIcon, HourGlassFlipIcon, HourGlassIcon, RefreshIcon, UserIcon } from "assets";
import { customerLookupMessages } from "messages/customer-lookup.message";

const CustomerLookupTab = ({ searchCriteria}: {searchCriteria: any}) => {
    const items: TabsProps['items'] = [
        {
            key: 'tab1',
            label: (
                <span className="flex items-center font-semibold focus:text-black focus-visible:text-black">
                    <UserIcon width={16} height={16} className="mr-2" />
                    {customerLookupMessages.customer}
                    <Badge className="pl-2 badge-custom-color-black" count={1} showZero color="#F7F8F9" />
                </span>
            ),
            children: <CustomerLookupTable searchCriteria={searchCriteria} />,
        },
        {
            key: 'tab2',
            label: (
                <span className="flex items-center group font-semibold">
                    {/* Default Icon */}
                    <HourGlassIcon color="black" className="mr-2 icon-default" />
    
                    {/* Icon on Hover */}
                    <HourGlassFlipIcon className="mr-2 icon-hover" />
    
                    <span >{customerLookupMessages.processing}</span>
                    <Badge className="pl-2 badge-custom-color-black" count={1} showZero color="#F7F8F9" />
                </span>
            ),
            children: <p>content2</p>
        },
        {
            key: 'tab3',
            label: (
                <span className="flex items-center group font-semibold">
                    {/* Default Icon */}
                    <HistoryIcon width={16} height={16} className="mr-2 icon-default" />
                    {/* Icon on Hover */}
                    <HistoryRotateIcon width={16} height={16} className="mr-2 icon-hover" />
                    {customerLookupMessages.callHistory}
                    <Badge className="pl-2 badge-custom-color-black" count={1} showZero color="#F7F8F9" />
                </span>
            ),
            children: <p>content3</p>
        },
    ];
    
    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <div className='w-[1288px] h-[886px] bg-[#FFFFFF] border-bottom-none-nav-tab'>
            <Tabs
                tabBarExtraContent={<div className="flex items-center justify-center text-[#1564E8] text-[16px] mr-3 hover:bg-[#F7F8F9] hover:rounded-2xl px-2 py-1.5 cursor-default"><div className="px-2"><RefreshIcon /></div>Làm mới</div>}
                className="ant-tabs-nav-list-spacing-adj ant-tabs-nav-list-mt-3-ml-120px center-antd-nav-tabs-wrap ant-tabs-nav-mb-4 ant-tabs-tab-custom-btn ant-tabs-focus-visible-black"
                style={{ width: '100%' }}
                items={items}
                defaultActiveKey="tab1"
                onChange={onChange}
            />
        </div>
    )
}
export default CustomerLookupTab