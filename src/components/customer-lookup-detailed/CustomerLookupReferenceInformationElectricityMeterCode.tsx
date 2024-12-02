import { Table, TableProps, Typography } from 'antd';
import { useCustomerDetail } from 'hooks/customer-lookup/useCustomerDetail';
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostCustomerMeterReadingCodeMutation } from 'services/customer-lookup';

const CustomerLookupReferenceInformationElectricityMeterCode = () => {
  interface DataType {
    key: string;
    customerCode: string;
    period: number;
    month: number;
    year: number;
    indexSet: string;
    oldMeterReading: number;
    newMeterReading: number;
    consumption: number;
    meterStatusCode: string;
    meterReadingBookCode: string;
    employeeCode: string;
    employeeName: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.month}/{customerLookupDetailedMessages.year}-
          {customerLookupDetailedMessages.cycleNumber}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.cycleNumber,
      key: customerLookupDetailedMessages.cycleNumber,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100'>
          {data.month}/{data.year} - {data.period}
        </Typography.Text>
      )
    },
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.previousReading}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.previousReading,
      key: customerLookupDetailedMessages.previousReading,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100'>
          {data.oldMeterReading.toLocaleString('vi-VN')}
        </Typography.Text>
      )
    },
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.currentReading}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.currentReading,
      key: customerLookupDetailedMessages.currentReading,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100'>
          {data.newMeterReading.toLocaleString('vi-VN')}
        </Typography.Text>
      )
    },
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.setOfIndicators}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.setOfIndicators,
      key: customerLookupDetailedMessages.setOfIndicators,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100'>
          {data.indexSet}
        </Typography.Text>
      )
    },
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.electricityOutput}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.electricityOutput,
      key: customerLookupDetailedMessages.electricityOutput,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] font-semibold tracking-normal text-[#141414] opacity-100'>
          {data.consumption.toLocaleString('vi-VN')}
        </Typography.Text>
      )
    },
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.electricityMeterCode}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.electricityMeterCode,
      key: customerLookupDetailedMessages.electricityMeterCode,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] font-semibold tracking-normal text-[#141414] opacity-100'>
          {data.meterReadingBookCode}
        </Typography.Text>
      )
    }
  ];

  const { customerId } = useParams<{ customerId: string }>();
  const { customer, isLoading } = useCustomerDetail(Number(customerId));
  const [onCreate] = usePostCustomerMeterReadingCodeMutation();
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    onCreate({ customerCode: customer?.customerCode || '' })
      .unwrap()
      .then((rs) => {
        const transformedData: DataType[] = rs.data.map((item: any) => ({
          key: item,
          customerCode: item.customerCode,
          period: item.period,
          month: item.month,
          year: item.year,
          indexSet: item.indexSet,
          oldMeterReading: item.oldMeterReading,
          newMeterReading: item.newMeterReading,
          consumption: item.consumption,
          meterStatusCode: item.meterStatusCode,
          meterReadingBookCode: item.meterReadingBookCode,
          employeeCode: item.employeeCode,
          employeeName: item.employeeName
        }));
        setData(transformedData);
      });
  }, [customer]);

  return (
    <div className='mt-3 w-[1008px] bg-[#FFFFFF]'>
      <Table loading={isLoading} columns={columns} dataSource={data} />
    </div>
  );
};

export default CustomerLookupReferenceInformationElectricityMeterCode;
