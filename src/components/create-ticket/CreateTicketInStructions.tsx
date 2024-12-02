import { BulbOutlined } from "@ant-design/icons"
import { Typography, Tabs, TabsProps } from "antd"
import { IdeaIcon } from "assets";
import { createTicketMessages } from "messages/create-ticket.messages"

const items: TabsProps['items'] = [
    {
        key: 'tab1',
        label: (
            <span className="text-center font-semibold text-[14px]/[18px] tracking-normal focus:text-black focus-visible:text-black opacity-100">
                {createTicketMessages.detail}
            </span>
        ),
        children: <p className="">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>,
    },
    {
        key: 'tab2',
        label: (
            <span className="text-center font-semibold text-[14px]/[18px] tracking-normal focus:text-black focus-visible:text-black opacity-100">
                {createTicketMessages.document}
            </span>
        ),
        children: <p>content2</p>
    },
    {
        key: 'tab3',
        label: (
            <span className="text-center font-semibold text-[14px]/[18px] tracking-normal focus:text-black focus-visible:text-black opacity-100">
                {createTicketMessages.relatedInformation}
            </span>
        ),
        children: <p className="">content3</p>
    },
];

const onChange = (key: string) => {
    console.log(key);
};


const CreateTicketInStructions = () => {
    return (
        <div className='h-[1000px] w-[1080px] flex flex-col bg-[#EBEBED] rounded-l-none rounded-r-[12px] bg-no-repeat bg-clip-padding opacity-100'>
            <IdeaIcon color="#06A77D" className="w-[40px] h-[40[px] mt-8 ml-6" />
            <Typography.Text className="mt-5 ml-6 text-left font-semibold text-[22px]/[26px] tracking-normal text-[#141414] opacity-100">{createTicketMessages.instructions}</Typography.Text>
            <Tabs
                className="mx-6 mt-5  ant-tabs-nav-list-spacing-adj ant-tabs-nav-mb-4 ant-tabs-tab-custom-btn ant-tabs-focus-visible-black"

                items={items}
                defaultActiveKey="tab1"
                onChange={onChange}
            />
        </div>
    )
}

export default CreateTicketInStructions