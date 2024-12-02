import { Table } from 'components/common';
import {Typography } from 'antd';
import { CustomerLookupTableArrowRight } from 'assets';
import { useCustomersPaging } from 'hooks/customer-lookup';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { CustomerDto } from 'types/dto/customer-lookup';
import { customerLookupMessages } from 'messages/customer-lookup.message';
import { useCustomerDetail } from 'hooks/customer-lookup/useCustomerDetail';
import { ColumnsType } from 'antd/es/table';
import { FindAllCustomersDto } from 'types/dto/customer-lookup/find-all-customers.dto';


const CustomerLookupTable = ({ searchCriteria}: { searchCriteria: any}) => {
    const navigate = useNavigate()
    const { customers, isLoading, error, handleChangePage, resetPage, pageIndex, count } = useCustomersPaging(searchCriteria);
    
    const columns: ColumnsType<CustomerDto> = [
        {
            title: <Typography.Text className='text-nowrap text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D97] opacity-100 uppercase'>{customerLookupMessages.serialNumber}</Typography.Text>,
            key: 'stt',
            render: (_, __, index) => (
                <Typography.Text className='text-left text-[14px]/[22px] tracking-normal text-[#141414] opacity-100'>{index + 1}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className='text-nowrap text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D97] opacity-100 uppercase'>{customerLookupMessages.customerCode}</Typography.Text>,
            key: 'customerCode',
            render: (_, record) => (
                <Typography.Text className='text-nowrap text-left text-[14px]/[22px] tracking-normal text-[#141414] opacity-100'>{record.customerCode}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className='text-nowrap text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D97] opacity-100 uppercase'>{customerLookupMessages.customerName}</Typography.Text>,
            key: 'customerName',
            render: (_, record) => (
                <Typography.Text className='text-left text-[14px]/[22px] tracking-normal text-[#141414] opacity-100'>{record.customerName}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className='text-nowrap text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D97] opacity-100 uppercase'>{customerLookupMessages.customerAddress}</Typography.Text>,
            key: 'customerAddress',
            render: (_, record) => (
                <Typography.Text className='text-left text-[14px]/[22px] tracking-normal text-[#141414] opacity-100'>{record.customerAddress}</Typography.Text>
            )
        },
        {
            title:<Typography.Text className='text-nowrap text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D97] opacity-100 uppercase'>{customerLookupMessages.customerPhone}</Typography.Text> ,
            key: 'customerPhone',
            render: (_, record) => (
                <Typography.Text className='text-left text-[14px]/[22px] tracking-normal text-[#141414] opacity-100'>{record.customerPhone}</Typography.Text>
            )
        },
        {
            title: <Typography.Text className='text-nowrap text-left font-semibold text-[12px]/[20px] tracking-normal text-[#868D97] opacity-100 uppercase'>{customerLookupMessages.organizationUnit}</Typography.Text>,
            key: 'unit',
            render: (_, record) => (
                <span className="flex justify-between items-center">
                    <Typography.Text className='w-[205px] text-nowrap text-left text-[14px]/[22px] tracking-normal text-[#141414] opacity-100'>{record.organizationUnit.name}</Typography.Text>
                    <CustomerLookupTableArrowRight width={14} height={14} />
                </span>
            ),
        },
    ];
    console.log(`pageIndex: ${pageIndex}`)
    console.log(`count: ${count}`)

    return (
        <div className='px-5'>
            <Table
                className="rounded-none" 
                loading={isLoading}
                currentPage={pageIndex}
                count={count}
                handleChangePage={handleChangePage}
                columns={columns}
                dataSource={customers || []} 
                rowKey={(record) => record.customerId}
                onRow={(record: CustomerDto) => {
                    return {
                        onClick: () => {
                            navigate(`${ROUTE.CUSTOMER_LOOKUP}/${record.customerId}`);
                        },
                        className: 'hover:cursor-pointer'
                    };
                } }
            />
        </div>
    )
}
export default CustomerLookupTable