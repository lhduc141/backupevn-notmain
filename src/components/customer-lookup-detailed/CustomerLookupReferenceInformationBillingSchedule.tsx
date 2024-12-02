import { Table, Typography } from "antd";
import type { TableProps } from 'antd';
import { customerLookupDetailedMessages } from "messages/customer-lookup-detailed.message";


const CustomerLookupReferenceInformationBillingSchedule = () => {
    interface DataType {
        key: string;
        session: string;
        cycleNumber: string;
        meterReadingDate: string;
        paymentCollectionDate: string;
        paymentDeadline: string;
        powerCutoffDeadline: string;
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.session}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.session,
            key: customerLookupDetailedMessages.session,
            render: (_, data) => (
                <Typography.Text className="text-left text-[14px]/[20px] tracking-normal text-[#141414] opacity-100">{data.session}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.cycleNumber}-{customerLookupDetailedMessages.month}/{customerLookupDetailedMessages.year}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.cycleNumber,
            key: customerLookupDetailedMessages.cycleNumber,
            render: (_, data) => (
                <Typography.Text className="text-left font-semibold text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.cycleNumber}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.meterReadingDate}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.meterReadingDate,
            key: customerLookupDetailedMessages.meterReadingDate,
            render: (_, data) => (
                <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.meterReadingDate}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.paymentCollectionDate}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.paymentCollectionDate,
            key: customerLookupDetailedMessages.paymentCollectionDate,
            render: (_, data) => (
                <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.paymentCollectionDate}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.paymentDeadline}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.paymentDeadline,
            key: customerLookupDetailedMessages.paymentDeadline,
            render: (_, data) => (
                <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.paymentDeadline}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.powerCutoffDeadline}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.powerCutoffDeadline,
            key: customerLookupDetailedMessages.powerCutoffDeadline,
            render: (_, data) => (
                <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.powerCutoffDeadline}</Typography.Text>
            )
        }
    ];

    const data: DataType[] = [
        {
            key: '1',
            session: 'B1P389700',
            cycleNumber: '1-07/2024',
            meterReadingDate: '22/07/2024',
            paymentCollectionDate: '22/08/2024',
            paymentDeadline: '22/08/2024',
            powerCutoffDeadline: '22/09/2024',
        },
        {
            key: '2',
            session: 'B1P389700',
            cycleNumber: '1-06/2024',
            meterReadingDate: '22/06/2024',
            paymentCollectionDate: '22/07/2024',
            paymentDeadline: '22/07/2024',
            powerCutoffDeadline: '22/08/2024',
        },
        {
            key: '3',
            session: 'B1P389700',
            cycleNumber: '1-05/2024',
            meterReadingDate: '22/05/2024',
            paymentCollectionDate: '22/06/2024',
            paymentDeadline: '22/06/2024',
            powerCutoffDeadline: '22/07/2024',
        },

    ];
    return (
        <div className="w-[1008px] bg-[#FFFFFF] mt-3">
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default CustomerLookupReferenceInformationBillingSchedule