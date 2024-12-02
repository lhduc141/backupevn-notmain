import { Divider, List, Typography } from "antd";
import { CheckCircleIcon, CheckIcon, ClockGreenIcon, UserIcon } from "assets";
import { customerLookupDetailedMessages } from "messages/customer-lookup-detailed.message";


const CustomerLookupRequestHistoryTicketList = () => {
    interface DataType {
        key: string,
        ticketName: string,
        ticketState: string,
        receivingUnit: string,
        receivingTime: string,
        receivingDate: string,
        receivingYear: string,
        customerName: string,
        customerPhone: string,
        appointmentDate: string,
        receiver: string
        notMultipleRequests: boolean,
    }

    const data: DataType[] = [
        {
            key: '1',
            ticketName: 'An toàn điện',
            ticketState: 'Hoàn tất tư vấn cho khách hàng',
            receivingUnit: 'Công ty điện lực Tân Bình',
            receivingTime: '10:26:32',
            receivingDate: '22/07',
            receivingYear: '2023',
            customerName: 'Nguyễn Văn Phúc',
            customerPhone: '0934000662',
            appointmentDate: '16:54, 22/04/2024',
            notMultipleRequests: false,
            receiver: "Trần Văn Quá"
        },
        {
            key: '2',
            ticketName: 'Hỏi đáp',
            ticketState: 'Khách hàng thông báo đã xử lý xong',
            receivingUnit: '',
            receivingTime: '10:26:32',
            receivingDate: '22/07',
            receivingYear: '2023',
            customerName: 'Nguyễn Văn Phúc',
            customerPhone: '0934000662',
            appointmentDate: '16:54, 22/04/2024',
            notMultipleRequests: true,
            receiver: "Trần Văn Quá"
        },
        {
            key: '3',
            ticketName: 'Thay thiết bị cháy hỏng',
            ticketState: 'Đã thay thế thiết bị',
            receivingUnit: '',
            receivingTime: '10:26:32',
            receivingDate: '22/07',
            receivingYear: '2023',
            customerName: 'Nguyễn Văn Phúc',
            customerPhone: '0934000662',
            appointmentDate: '16:54, 22/04/2024',
            notMultipleRequests: false,
            receiver: "Trần Văn Quá"
        },

    ]

    return (
        <List className="mb-5 list-item-hover-animation list-item-hover list-item-px-0-py-4"
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    className=""
                    extra={
                        <div>
                            {(item.notMultipleRequests) === true ? (
                                <div className="flex flex-row items-center">
                                    <CheckIcon className="w-[14px] h-[13px] bg-no-repeat bg-origin-padding opacity-100" style={{ color: "#06A77D" }} />
                                    <Typography.Text className="ml-2 text-[14px]/[18px] text-[#6C737E] tracking-normal opacity-100" type="secondary">{customerLookupDetailedMessages.notARepeatedRequest}</Typography.Text>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    }
                >
                    <div className="flex flex-row space-x-5">
                        <div className="flex flex-col space-y-2">
                            <Typography.Text className="text-left font-oswald opacity-100 tracking-normal text-[14px]/[18px] text-[#6C737E]">{item.receivingTime}</Typography.Text>
                            <Typography.Text className="text-left font-oswald opacity-100 tracking-normal text-[22px]/[18px] text-[#6C737E]">{item.receivingDate}</Typography.Text>
                            <Typography.Text className="text-left font-oswald opacity-100 tracking-normal text-[12px]/[18px] text-[#6C737E]">{item.receivingYear}</Typography.Text>
                        </div>
                        <Divider className="h-[72px]" type="vertical"></Divider>
                        <div className="flex flex-col space-y-1">
                            <div className="flex flex-col space-y-1">
                                <Typography.Text className="text-base/[18px] text-[#181818] opacity-100 tracking-normal text-left font-semibold">{item.ticketName}</Typography.Text>
                                <div className="flex flex-col">
                                    <div className="flex flex-row gap-1 items-center">
                                        <CheckCircleIcon className="w-[16px] h-[16px] bg-transparent bg-no-repeat bg-origin-padding opacity-100" />
                                        <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">"{item.ticketState}"</Typography.Text>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex gap-1">
                                    <UserIcon className="w-[16px] h-[16px] bg-transparent bg-no-repeat bg-origin-padding opacity-100" />
                                    <Typography.Text className="text-base/[18px] text-left text-[#181818] opacity-100 tracking-normal">{item.customerName}</Typography.Text>
                                </div>
                                <span className="font-bold text-2xl relative -top-1.5">.</span>
                                <ClockGreenIcon className="w-[16px] h-[16px] bg-transparent bg-no-repeat bg-origin-padding opacity-100" />
                                <Typography.Text className="text-base/[18px] text-left text-[#181818] opacity-100 tracking-normal">{customerLookupDetailedMessages.completeAt} {item.appointmentDate}</Typography.Text>
                                <div className="w-[20px] h-[20px] flex items-center justify-center border-[1px] border-[#FF9500] text-[#FFFFFF] text-[10px] rounded-full bg-[#FF9500]">
                                    Q
                                </div>
                                <Typography.Text className="text-base/[18px] text-left text-[#181818] opacity-100 tracking-normal">{item.receiver}</Typography.Text>
                            </div>
                        </div>
                    </div>
                </List.Item>
            )}
        >
        </List>
    )
}

export default CustomerLookupRequestHistoryTicketList