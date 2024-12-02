import { Table, TableProps, Typography } from 'antd';
import { useCustomerDetail } from 'hooks/customer-lookup/useCustomerDetail';
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostCustomerPriceContractMutation } from 'services/customer-lookup';

const CustomerLookupReferenceInformationElectricityPrice = () => {
  interface DataType {
    key: string;
    organizationUnitCode: string;
    meterPointCode: string;
    effectiveDate: string;
    indexSetType: string;
    numberOfHouseholds: number;
    voltageLevelName: string;
    voltageLevelCode: string;
    quota: string;
    unitPrice: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.effectiveDate}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.effectiveDate,
      key: customerLookupDetailedMessages.effectiveDate,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[20px] tracking-normal text-[#141414] opacity-100'>
          {data.effectiveDate}
        </Typography.Text>
      )
    },
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.entity}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.entity,
      key: customerLookupDetailedMessages.entity,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] font-semibold tracking-normal text-[#141414] opacity-100'>
          {data.indexSetType}
        </Typography.Text>
      )
    },
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.voltageLevel}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.voltageLevel,
      key: customerLookupDetailedMessages.voltageLevel,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] font-semibold tracking-normal text-[#141414] opacity-100'>
          {data.voltageLevelName}
        </Typography.Text>
      )
    },
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.numberOfHouseholds}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.numberOfHouseholds,
      key: customerLookupDetailedMessages.numberOfHouseholds,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100'>
          {data.numberOfHouseholds}
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
          {data.indexSetType}
        </Typography.Text>
      )
    },
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.tariff}
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.tariff,
      key: customerLookupDetailedMessages.tariff,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100'>
          {data.quota}%
        </Typography.Text>
      )
    },
    {
      title: (
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#868D96] opacity-100'>
          {customerLookupDetailedMessages.price}
          <Typography.Text className='text-left text-[12px]/[20px] font-semibold normal-case tracking-normal text-[#868D96] opacity-100'>
            (đ/kWh)
          </Typography.Text>
        </Typography.Text>
      ),
      dataIndex: customerLookupDetailedMessages.price,
      key: customerLookupDetailedMessages.price,
      render: (_, data) => (
        <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#141414] opacity-100'>
          {/* {data.unitPrice.toLocaleString('vi-VN')} */}
          {data.unitPrice}
        </Typography.Text>
      )
    }
  ];
  const [onCreate] = usePostCustomerPriceContractMutation();
  const [data, setData] = useState<DataType[]>([]);
  const { customerId } = useParams<{ customerId: string }>();
  const { customer, isLoading } = useCustomerDetail(Number(customerId));

  useEffect(() => {
    onCreate({ customerCode: customer?.customerCode || '' })
      .unwrap()
      .then((rs) => {
        const transformedData: DataType[] = rs.data.map((item: any) => ({
          key: item,
          organizationUnitCode: item.organizationUnitCode || 'check',
          meterPointCode: item.meterPointCode || '',
          effectiveDate: String(item.effectiveDate).split('T')[0] || '',
          indexSetType: item.indexSetType || '',
          numberOfHouseholds: item.numberOfHouseholds || 0,
          voltageLevelName: item.voltageLevelName || '',
          voltageLevelCode: item.voltageLevelCode || '',
          quota: item.quota || '',
          unitPrice: item.unitPrice || ''
        }));
        console.log(rs);
        setData(transformedData);
      });
  }, [customer]);

  return (
    <div className='mt-3 w-[1008px] bg-[#FFFFFF]'>
      <Table loading={isLoading} columns={columns} dataSource={data} />
    </div>
  );
};

export default CustomerLookupReferenceInformationElectricityPrice;
