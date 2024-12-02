import { Table, TableProps, Typography } from 'antd';
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message';


const CustomerLookupReferenceInformationPaymentCollection = () => {
    interface DataType1 {
        key: string,
        cycleNumber: string,
        billCode: string,
        billType: string,
        amount: number
    }

    interface DataType2 {
        key: string;
        cycleNumber: string;
        billType: string;
        collectionPoint: string;
        amount: number;
        paymentCollectionDate: string;
    }

    const columns1: TableProps<DataType1>['columns'] = [
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.month}/{customerLookupDetailedMessages.year}-{customerLookupDetailedMessages.cycleNumber}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.cycleNumber,
            key: customerLookupDetailedMessages.cycleNumber,
            render: (_, data) => (
                <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.cycleNumber}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.billCode}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.billCode,
            key: customerLookupDetailedMessages.billCode,
            render: (_, data) => (
                <Typography.Text className="text-left font-semibold text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.billCode}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.billType}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.billType,
            key: customerLookupDetailedMessages.billType,
            render: (_, data) => (
                <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.billType}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.amount}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.amount,
            key: customerLookupDetailedMessages.amount,
            render: (_, data) => (
                <Typography.Text className="text-left font-semibold text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.amount.toLocaleString('vi-VN')}</Typography.Text>
            )
        },
    ];

    const columns2: TableProps<DataType2>['columns'] = [
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.month}/{customerLookupDetailedMessages.year}-{customerLookupDetailedMessages.cycleNumber}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.cycleNumber,
            key: customerLookupDetailedMessages.cycleNumber,
            render: (_, data) => (
                <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.cycleNumber}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.billType}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.billType,
            key: customerLookupDetailedMessages.billType,
            render: (_, data) => (
                <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.billType}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.collectionPoint}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.collectionPoint,
            key: customerLookupDetailedMessages.collectionPoint,
            render: (_, data) => (
                <Typography.Text className="text-left font-semibold text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.collectionPoint}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.amount}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.amount,
            key: customerLookupDetailedMessages.amount,
            render: (_, data) => (
                <Typography.Text className="text-left font-semibold text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.amount.toLocaleString('vi-VN')}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className="text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D96] uppercase opacity-100">{customerLookupDetailedMessages.paymentCollectionDate}</Typography.Text>,
            dataIndex: customerLookupDetailedMessages.paymentCollectionDate,
            key: customerLookupDetailedMessages.paymentCollectionDate,
            render: (_, data) => (
                <Typography.Text className="text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100">{data.paymentCollectionDate}</Typography.Text>
            )
        }
    ];

    const data1: DataType1[] = [
        {
            key: '1',
            cycleNumber: '08/2024-1',
            billCode: 'xxxxxxxxxxxxxxxxxxxx',
            billType: 'Tiền điện',
            amount: 1274000
        }
    ]

    const data2: DataType2[] = [
        {
            key: '1',
            cycleNumber: '07/2024-1',
            billType: 'Tiền điện',
            collectionPoint: 'SCB',
            amount: 1274000,
            paymentCollectionDate: '05/08/2024, 15:21:06'
        },
        {
            key: '2',
            cycleNumber: '06/2024-1',
            billType: 'Tiền điện',
            collectionPoint: 'SCB',
            amount: 1274000,
            paymentCollectionDate: '05/08/2024, 15:21:06'
        },
        {
            key: '3',
            cycleNumber: '05/2024-1',
            billType: 'Tiền điện',
            collectionPoint: 'SCB',
            amount: 1274000,
            paymentCollectionDate: '05/08/2024, 15:21:06'
        },
        {
            key: '4',
            cycleNumber: '04/2024-1',
            billType: 'Tiền điện',
            collectionPoint: 'SCB',
            amount: 1274000,
            paymentCollectionDate: '05/08/2024, 15:21:06'
        },
        {
            key: '5',
            cycleNumber: '03/2024-1',
            billType: 'Tiền điện',
            collectionPoint: 'SCB',
            amount: 1274000,
            paymentCollectionDate: '05/08/2024, 15:21:06'
        },
        {
            key: '6',
            cycleNumber: '02/2024-1',
            billType: 'Tiền điện',
            collectionPoint: 'SCB',
            amount: 1274000,
            paymentCollectionDate: '05/08/2024, 15:21:06'
        },
        {
            key: '7',
            cycleNumber: '01/2024-1',
            billType: 'Tiền điện',
            collectionPoint: 'SCB',
            amount: 1274000,
            paymentCollectionDate: '05/08/2024, 15:21:06'
        },
        {
            key: '8',
            cycleNumber: '12/2024-1',
            billType: 'Tiền điện',
            collectionPoint: 'SCB',
            amount: 1274000,
            paymentCollectionDate: '05/08/2024, 15:21:06'
        },
        {
            key: '9',
            cycleNumber: '11/2024-1',
            billType: 'Tiền điện',
            collectionPoint: 'SCB',
            amount: 1274000,
            paymentCollectionDate: '05/08/2024, 15:21:06'
        },
    ];
    return (
        <div className="w-[1008px] bg-[#FFFFFF] mt-3">
            <Typography.Text className='text-left font-semibold text-[12px]/[16px] tracking-normal text-[#6C737E] opacity-100 uppercase'>{customerLookupDetailedMessages.electricityBillingInformationOnCollectionSystem}</Typography.Text>
            <Table columns={columns1} dataSource={data1} className='mt-2' />
            <Typography.Text className='text-left font-semibold text-[12px]/[16px] tracking-normal text-[#6C737E] opacity-100 uppercase'>{customerLookupDetailedMessages.customerPaymentInformationOnCollectionChanel}</Typography.Text>
            <Table columns={columns2} dataSource={data2} className='mt-2' />
        </div>
    )
}

export default CustomerLookupReferenceInformationPaymentCollection