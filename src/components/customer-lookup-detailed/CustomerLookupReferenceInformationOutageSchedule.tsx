import { Button, Divider, List, Typography } from 'antd';
import { BlueDotIcon, LightningIcon, RedDotIcon, ReloadIcon } from 'assets';
import { useCustomerDetail } from 'hooks/customer-lookup/useCustomerDetail';
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostPowerCutSheduleMutation, usePostPowerSupplyStatusMutation } from 'services/customer-lookup';

const CustomerLookupReferenceInformationOutageSchedule = () => {
  interface DataType {
    key: string;
    // outAgeFrom: string;
    // outAgeTo: string;
    // outAgeDate: string;
    // causeOfOutAge: string;
    // elementCode: string;
    // region: string;
    // note: string;
    outageTime: string;
    reEstablishmentExpectedDate: string;
    elementName: string;
    powerOutageCode: number;
    causeCode: string;
    powerOutageTypeName: string;
    causeName: string;
    area: string;
    reason: string;
    note: string;
    renewalInformation: [string];
    identifierCode: string;
    identifierType: string;
    powerOutageNumber: number;
  }

  const [onCreateStatus] = usePostPowerSupplyStatusMutation();
  const [onGetPowerCutHistory] = usePostPowerCutSheduleMutation();

  const { customerId } = useParams<{ customerId: string }>();
  const { customer, isLoading } = useCustomerDetail(Number(customerId));
  const [data, setData] = useState<DataType[]>([]);
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    const cadastralCode = String(customer?.customerCode).substring(0, 5);
    const information = { customerCode: String(customer?.customerCode), cadastralCode: cadastralCode };
    onCreateStatus(information)
      .unwrap()
      .then((rs) => {
        setStatus(rs.message);
      });
    onGetPowerCutHistory(information)
      .unwrap()
      .then((rs) => {
        const transformedData: DataType[] = rs.data.map((item: any) => ({
          key: item,
          outageTime: item.outageTime || '',
          reEstablishmentExpectedDate: item.reEstablishmentExpectedDate || '',
          elementName: item.elementName,
          powerOutageCode: item.powerOutageCode,
          causeCode: item.causeCode,
          powerOutageTypeName: item.powerOutageTypeName,
          causeName: item.causeName,
          area: item.area,
          reason: item.reason,
          note: item.note,
          renewalInformation: item.renewalInformation,
          identifierCode: item.identifierCode,
          identifierType: item.identifierType,
          powerOutageNumber: item.powerOutageNumber
        }));
        setData(transformedData);
      });
  }, [customer]);

  return (
    <div className='mt-3 flex flex-col space-y-5'>
      <div className='flex flex-col space-y-2'>
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#6C737E] opacity-100'>
          {customerLookupDetailedMessages.powerGridCondition}
        </Typography.Text>
        <div className='flex h-[40px] w-[1008px] items-center justify-between rounded-[3px] bg-[#06A77D] bg-no-repeat p-4 text-white opacity-100'>
          <div className='flex items-center'>
            <LightningIcon />
            <Typography.Text className='pl-3 text-left text-[16px]/[28px] font-semibold tracking-normal text-white opacity-100'>
              {status}
            </Typography.Text>
          </div>
          <Button
            className='h-[20px] w-[89px] border-0 bg-transparent text-right tracking-normal text-white opacity-100'
            icon={
              <ReloadIcon className='h-[16px] w-[16px] bg-transparent bg-no-repeat bg-origin-padding opacity-100' />
            }
            iconPosition='start'
          >
            {customerLookupDetailedMessages.refresh}
          </Button>
        </div>
      </div>
      <Divider className='w-[1008px]' type='horizontal'></Divider>
      <div className='flex flex-col'>
        <Typography.Text className='text-left text-[12px]/[20px] font-semibold uppercase tracking-normal text-[#6C737E] opacity-100'>
          {customerLookupDetailedMessages.outageSchedule}
        </Typography.Text>
        <List
          className='list-item-hover-animation list-item-hover mb-5 ml-[-10px] pl-0'
          itemLayout='vertical'
          size='large'
          dataSource={data}
          renderItem={(item) => (
            <List.Item className=''>
              <div className='flex flex-row space-x-5'>
                <div className='flex flex-col space-y-4 pt-[12px]'>
                  <div className='flex flex-row space-x-2'>
                    <div className='space-y-0.25 flex flex-col'>
                      <Typography.Text className='text-left font-oswald text-[16px]/[18px] font-semibold tracking-normal text-[#141414] opacity-100'>
                        {item.outageTime.split(' ')[0]}
                      </Typography.Text>
                      <Typography.Text className='f text-left font-oswald text-xs/[18px] tracking-normal text-[#141414] opacity-100'>
                        {item.outageTime.split(' ')[1]}
                      </Typography.Text>
                    </div>
                    <div className='flex flex-row pt-2'>
                      <RedDotIcon className='h-[16px] w-[16px] bg-transparent bg-no-repeat bg-origin-padding pt-1 opacity-100' />
                      <span className=''>-</span>
                      <span className=''>-</span>
                      <span className=''>-</span>
                      <BlueDotIcon className='h-[16px] w-[16px] bg-transparent bg-no-repeat bg-origin-padding pl-1 pt-1 opacity-100' />
                    </div>
                    <div className='space-y-0.25 flex flex-col'>
                      <Typography.Text className='font-oswald text-[16px]/[18px] font-semibold tracking-normal text-[#141414] opacity-100'>
                        {item.reEstablishmentExpectedDate.split(' ')[0]}
                      </Typography.Text>
                      <Typography.Text className='f text-left font-oswald text-xs/[18px] tracking-normal text-[#141414] opacity-100'>
                        {item.reEstablishmentExpectedDate.split(' ')[1]}
                      </Typography.Text>
                    </div>
                  </div>
                  <Typography.Text className='mb-[24px] text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                    {customerLookupDetailedMessages.elementCode}:{' '}
                    <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#181818] opacity-100'>
                      {item.elementName.split(' - ')[1]}
                    </Typography.Text>
                  </Typography.Text>
                </div>
                <Divider className='h-[92px]' type='vertical'></Divider>
                <div className='flex flex-col space-y-4'>
                  <div className='flex flex-col space-y-0.5'>
                    <Typography.Text className='text-left text-[12px]/[16px] tracking-normal text-[#6C737E] opacity-100'>
                      {customerLookupDetailedMessages.region}
                    </Typography.Text>
                    <Typography.Text className='text-left text-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>
                      {item.area}
                    </Typography.Text>
                  </div>
                  <div className='flex flex-row space-x-5'>
                    <div className='flex flex-col space-y-0.5'>
                      <Typography.Text className='text-left text-[12px]/[16px] tracking-normal text-[#6C737E] opacity-100'>
                        {customerLookupDetailedMessages.cause}
                      </Typography.Text>
                      <Typography.Text className='text-left text-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>
                        {item.causeName}
                      </Typography.Text>
                    </div>
                    <div className='flex flex-col space-y-0.5'>
                      <Typography.Text className='text-left text-[12px]/[16px] tracking-normal text-[#6C737E] opacity-100'>
                        {customerLookupDetailedMessages.note}
                      </Typography.Text>
                      <Typography.Text className='text-left text-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>
                        {item.note}
                      </Typography.Text>
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        ></List>
      </div>
    </div>
  );
};

export default CustomerLookupReferenceInformationOutageSchedule;
