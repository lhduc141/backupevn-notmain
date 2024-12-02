import { List, Typography, Divider } from "antd"
import { BlueDotIcon, RedDotIcon } from "assets";
import { customerLookupDetailedMessages } from "messages/customer-lookup-detailed.message";

const CusTomerLookupRequestHistoryOutageHistory = () => {
    interface DataType {
        key: string,
        outAgeFrom: string,
        outAgeTo: string,
        outAgeDate: string,
        causeOfOutAge: string,
        solution: string
        elementCode: string,
    }

    const data: DataType[] = [
        {
            key: "1",
            outAgeFrom: "11:34",
            outAgeTo: "13:00",
            outAgeDate: "22/07/2024",
            causeOfOutAge: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
            solution: "Lorem ipsum dolor sit amet, consetetur",
            elementCode: "XXXX"
        },
        {
            key: "2",
            outAgeFrom: "11:34",
            outAgeTo: "13:00",
            outAgeDate: "22/07/2024",
            causeOfOutAge: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
            solution: "Lorem ipsum dolor sit amet, consetetur",
            elementCode: "XXXX"
        },
        {
            key: "3",
            outAgeFrom: "11:34",
            outAgeTo: "13:00",
            outAgeDate: "22/07/2024",
            causeOfOutAge: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
            solution: "Lorem ipsum dolor sit amet, consetetur",
            elementCode: "XXXX"
        },

    ]

    return (
        <List className="mb-5 list-item-hover-animation list-item-hover list-item-px-0-py-4"
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item) => (
                <List.Item className="">
                    <div className="flex flex-row space-x-5">
                        <div className="flex flex-col space-y-4 pt-[12px]">
                            <div className="flex flex-row space-x-2">
                                <div className="flex flex-col space-y-0.25">
                                    <Typography.Text className="text-[16px]/[18px] font-oswald text-left font-semibold text-[#141414] tracking-normal opacity-100">{item.outAgeFrom}</Typography.Text>
                                    <Typography.Text className="text-xs/[18px] font-oswald text-left text-[#141414] font-normal tracking-normal opacity-100">{item.outAgeDate}</Typography.Text>
                                </div>
                                <div className="flex flex-row pt-2">
                                    <RedDotIcon className="pt-1 w-[16px] h-[16px] bg-transparent bg-no-repeat bg-origin-padding opacity-100" />
                                    <span className="">-</span>
                                    <span className="">-</span>
                                    <span className="">-</span>
                                    <BlueDotIcon className="pt-1 pl-1 w-[16px] h-[16px] bg-transparent bg-no-repeat bg-origin-padding opacity-100" />
                                </div>
                                <div className="flex flex-col space-y-0.25">
                                    <Typography.Text className="text-[16px]/[18px] font-oswald text-left font-semibold text-[#141414] tracking-normal opacity-100">{item.outAgeTo}</Typography.Text>
                                    <Typography.Text className="text-xs/[18px] font-oswald text-left text-[#141414] font-normal tracking-normal opacity-100">{item.outAgeDate}</Typography.Text>
                                </div>
                            </div>
                            <Typography.Text className="mb-[24px] text-left text-[14px]/[18px] text-[#6C737E] tracking-normal opacity-100">{customerLookupDetailedMessages.elementCode}: <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#181818] opacity-100">{item.elementCode}</Typography.Text></Typography.Text>
                        </div>
                        <Divider className="h-[92px]" type="vertical"></Divider>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col space-y-0.5">
                                <Typography.Text className="text-[12px]/[16px] text-left text-[#6C737E] opacity-100 tracking-normal">{customerLookupDetailedMessages.reason}: </Typography.Text>
                                <Typography.Text className="text-left text-[#141414] opacity-100 tracking-normal text-[16px]/[20px]">{item.causeOfOutAge}</Typography.Text>
                            </div>
                            <div className="flex flex-col space-y-0.5 mb-[16px]">
                                <Typography.Text className="text-[12px]/[16px] text-left text-[#6C737E] opacity-100 tracking-normal">{customerLookupDetailedMessages.solution}</Typography.Text>
                                <Typography.Text className="text-left text-[#141414] opacity-100 tracking-normal text-[16px]/[20px]">{item.solution}</Typography.Text>
                            </div>
                        </div>
                    </div>
                </List.Item>
            )}
        >

        </List>
    )
}

export default CusTomerLookupRequestHistoryOutageHistory