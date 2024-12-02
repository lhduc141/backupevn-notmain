import { Space, Table, TableProps, Typography } from 'antd';
import { CheckCircleIcon, CheckIcon } from 'assets';
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message';


const CustomerLookupReferenceInformationOttInformation = () => {
    interface DataType {
        key: string,
        ott: string,
        status: string,
        phone: string,
        date: string,
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.ott}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.ott,
            key: customerLookupDetailedMessages.ott,
            render: (_, data, index) => {
                const obj = {
                    children: <Typography.Text className="text-left font-semibold text-[14px]/[20px] tracking-normal text-[#141414] opacity-100">{data.ott}</Typography.Text>,
                    props: {} as any,
                };

                if (index === 0) {
                    obj.props.rowSpan = 2;
                }
                if (index === 1) {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.status}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.status,
            key: customerLookupDetailedMessages.status,
            render: (_, data, index) => {
                const obj = {
                    children: (
                        <div>
                            {(data.status) === 'registered' ? (
                                <div className='flex flex-row space-x-2 items-center'>
                                    <CheckCircleIcon className='bg-transparent bg-no-repeat bg-origin-padding opacity-100'></CheckCircleIcon>
                                    <Typography.Text className='text-left text-[14px]/[18px] font-normal tracking-normal text-[#06A77D] opacity-100'>{customerLookupDetailedMessages.registered}</Typography.Text>
                                </div>
                            ) : (
                                <div className='flex flex-row space-x-2 items-center'>
                                    <CheckCircleIcon className='w-[14px] h-[14px] bg-transparent bg-no-repeat bg-origin-padding opacity-100'></CheckCircleIcon>
                                    <Typography.Text className='text-left text-[14px]/[18px] font-normal tracking-normal text-[#a70606] opacity-100'>{customerLookupDetailedMessages.notRegistered}</Typography.Text>
                                </div>
                            )}
                        </div>
                    ),
                    props: {} as any,
                };

                if (index === 0) {
                    obj.props.rowSpan = 2;
                }
                if (index === 1) {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.account}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.account,
            key: customerLookupDetailedMessages.account,
            render: (_, data) => (
                <Space className='flex flex-row space-x-0.5 items-center'>
                    <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100">{data.phone}</Typography.Text>
                    <Typography.Text className="font-bold text-xl relative -top-1.5">.</Typography.Text>
                    <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100">{data.date}</Typography.Text>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            ott: 'Zalo',
            status: 'registered',
            phone: '0934000662',
            date: '31/03/2024, 08:09:10',
        },
        {
            key: '2',
            ott: 'Zalo',
            status: 'registered',
            phone: '0908689544',
            date: '06/03/2023, 09:32:25',
        },
    ];

    return (
        <div className='w-[1008px] bg-[#FFFFFF] mt-3'>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default CustomerLookupReferenceInformationOttInformation