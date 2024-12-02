import { Divider, List, Typography } from 'antd';
import { CheckCircleIcon } from 'assets';
import { useCustomerDetail } from 'hooks/customer-lookup/useCustomerDetail';
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  usePostCustomerPeriodMutationMutation,
  usePostCustomerPowerConsumptionMutation
} from 'services/customer-lookup';

const CustomerLookupElectricityConsumptionAndPaymentAll = () => {
  interface PeriodType {
    period: number;
    month: number;
    year: number;
  }
  interface PowerComsumption {
    powerConsumptionGeneral: powerConsumptionGeneralType[];
    powerConsumptionDetail: powerConsumptionDetailType[];
  }
  interface customerPeriod {
    customerCode: string;
    period: number;
    month: number;
    year: number;
  }
  interface powerConsumptionGeneralType {
    startPeriodDate: string;
    endPeriodDate: string;
    amountDue: number;
    vatAmount: number;
    totalAmount: number;
    invoiceType: string;
    debtAmount: number;
    paymentDate: string;
    powerCutDate: string;
    dueDate: string;
  }
  interface powerConsumptionDetailType {
    meterSerialNumber: string;
    startDatePeriod: string;
    endDatePeriod: string;
    oldMeterReading: number;
    newMeterReading: number;
    indexSet: string;
    consumption: number;
    multiplier: number;
    meterReadingType: string;
    phaseNumber: number;
  }

  interface CombinedDataType {
    period: number;
    month: number;
    year: number;
    customerCode: string;
    consumption?: PowerComsumption;
  }
  const [data, setData] = useState<CombinedDataType[]>([]);

  const { customerId } = useParams<{ customerId: string }>();
  const { customer } = useCustomerDetail(Number(customerId));
  const [periodsArr, setPeriodsArr] = useState<customerPeriod[]>([]);
  const [consumptionArr, setConsumptionArr] = useState<PowerComsumption[]>([]);

  const [getPeriods] = usePostCustomerPeriodMutationMutation();
  const [getPowerConsumption, { isLoading }] = usePostCustomerPowerConsumptionMutation();

  const [isPeriodsFetched, setIsPeriodsFetched] = useState(false);

  //Get Periods
  useEffect(() => {
    getPeriods({ customerCode: String(customer?.customerCode) })
      .unwrap()
      .then((rs: { data: PeriodType[] }) => {
        const filteredData: customerPeriod[] = rs.data.map((item) => ({
          customerCode: String(customer?.customerCode),
          period: item.period,
          month: item.month,
          year: item.year
        }));

        setPeriodsArr(filteredData);
        setIsPeriodsFetched(true);
      });
  }, [customer]);

  //Get PowerComsumption
  useEffect(() => {
    if (isPeriodsFetched && periodsArr.length > 0) {
      const promises = periodsArr.map((item) =>
        getPowerConsumption(item)
          .unwrap()
          .then((res: { data: PowerComsumption }) => ({
            item,
            data: res.data
          }))
      );

      //Sort 3 months
      Promise.all(promises).then((results) => {
        const sortedArr = results.map((result) => result.data as PowerComsumption);

        setConsumptionArr(sortedArr);
      });
    }
  }, [isPeriodsFetched, periodsArr]);

  //Merge Periods with Detail Data / Each Period
  useEffect(() => {
    if (periodsArr.length > 0 && consumptionArr.length > 0) {
      const combinedData = periodsArr.map((period, index) => ({
        ...period,
        consumption: consumptionArr[index] || null
      }));
      setData(combinedData);
    }
  }, [periodsArr, consumptionArr]);

  return (
    <List
      loading={isLoading}
      className='w-1008px list-item-hover-animation list-item-hover list-item-px-0-py-4 mt-3'
      itemLayout='vertical'
      size='large'
      dataSource={data}
      renderItem={(item) => (
        <List.Item className=''>
          <div className='flex flex-row space-x-5'>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-col space-x-0.5'>
                <Typography.Text className='text-nowrap text-left text-[18px]/[22px] font-semibold tracking-normal text-[#181818] opacity-100'>
                  Kỳ {item.period} - {item.month}/{item.year}
                </Typography.Text>
                <Typography.Text className='text-nowrap text-left text-[12px]/[16px] font-normal tracking-normal text-[#6C737E] opacity-100'>
                  {String(item.consumption?.powerConsumptionGeneral[0].startPeriodDate).split('T')[0]} -{' '}
                  {String(item.consumption?.powerConsumptionGeneral[0].endPeriodDate).split('T')[0]}
                </Typography.Text>
              </div>
              <>
                {item.consumption?.powerConsumptionGeneral[0].debtAmount !== null ? (
                  <div className='flex flex-col'>
                    <Typography.Text className='text-nowrap text-left font-semibold tracking-normal text-[#D1131D] opacity-100'>
                      Nợ: {item.consumption?.powerConsumptionGeneral[0].debtAmount}
                    </Typography.Text>
                    <Typography.Text className='text-nowrap text-left text-[14px]/[18px] font-normal tracking-normal text-[#D1131D] opacity-100'>
                      {customerLookupDetailedMessages.electricityCutoffPeriod}:{/* {item.powerCutoffDeadline} */}
                    </Typography.Text>
                  </div>
                ) : (
                  <div className='flex w-[170px] flex-row items-center space-x-2'>
                    <CheckCircleIcon className='bg-transparent bg-no-repeat bg-origin-padding opacity-100'></CheckCircleIcon>
                    <Typography.Text className='text-nowrap text-left text-[14px]/[18px] font-normal tracking-normal text-[#06A77D] opacity-100'>
                      {customerLookupDetailedMessages.noDebt}
                    </Typography.Text>
                  </div>
                )}
              </>
            </div>
            <Divider className='ml-10 h-[92px]' type='vertical'></Divider>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-col space-x-0.5'>
                <Typography.Text className='text-nowrap text-left font-normal tracking-normal text-[#6C737E] opacity-100'>
                  {customerLookupDetailedMessages.electricMeter}
                </Typography.Text>
                <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818]'>
                  {item.consumption?.powerConsumptionDetail[0].meterSerialNumber}{' '}
                  <Typography.Text className='text-nowrap text-[#868D97]'>
                    ({item.consumption?.powerConsumptionDetail[0].phaseNumber} pha)
                  </Typography.Text>
                </Typography.Text>
              </div>
              <div className='flex flex-row space-x-8'>
                <div className='flex flex-col space-y-0.5'>
                  <Typography.Text className='text-nowrap text-left font-normal tracking-normal text-[#6C737E] opacity-100'>
                    {customerLookupDetailedMessages.typeOfContract}
                  </Typography.Text>
                  <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818] opacity-100'>
                    {item.consumption?.powerConsumptionGeneral[0].invoiceType}
                  </Typography.Text>
                </div>
                <div className='flex flex-col space-y-0.5'>
                  <Typography.Text className='text-nowrap text-left font-normal uppercase tracking-normal text-[#6C737E] opacity-100'>
                    {customerLookupDetailedMessages.setOfIndicators}
                  </Typography.Text>
                  <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818] opacity-100'>
                    {item.consumption?.powerConsumptionDetail[0].indexSet}
                  </Typography.Text>
                </div>
                <div className='flex flex-col space-y-0.5'>
                  <Typography.Text className='text-nowrap text-left font-normal uppercase tracking-normal text-[#6C737E] opacity-100'>
                    {customerLookupDetailedMessages.multiplier}
                  </Typography.Text>
                  <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818] opacity-100'>
                    {item.consumption?.powerConsumptionDetail[0].multiplier}
                  </Typography.Text>
                </div>
              </div>
            </div>
            <Divider className='h-[92px]' type='vertical'></Divider>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-row space-x-8'>
                <div className='flex flex-col space-y-0.5'>
                  <Typography.Text className='text-nowrap text-left text-[12px]/[16px] font-normal tracking-normal text-[#6C737E] opacity-100'>
                    {customerLookupDetailedMessages.electricityConsumption}
                  </Typography.Text>
                  <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818] opacity-100'>
                    {(() => {
                      const powerConsumptionDetails = item.consumption?.powerConsumptionDetail || [];

                      const totalElectricityConsumption = powerConsumptionDetails
                        .filter((detail) => !['VC', 'VN'].includes(detail.indexSet))
                        .reduce((total, detail) => total + (detail.consumption || 0), 0);

                      return `${totalElectricityConsumption}`;
                    })()}
                  </Typography.Text>
                </div>
                <div className='flex flex-col space-y-0.5 pl-2'>
                  <Typography.Text className='text-nowrap text-left text-[12px]/[16px] font-normal tracking-normal text-[#6C737E] opacity-100'>
                    {customerLookupDetailedMessages.openingBalance}
                  </Typography.Text>
                  <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818] opacity-100'>
                    {/* {
                      item.consumption?.powerConsumptionDetail[item.consumption?.powerConsumptionDetail.length - 1]
                        .oldMeterReading
                    } */}
                  </Typography.Text>
                </div>
                <div className='flex flex-col space-y-0.5 pl-3'>
                  <Typography.Text className='text-nowrap text-left text-[12px]/[16px] font-normal tracking-normal text-[#6C737E] opacity-100'>
                    {customerLookupDetailedMessages.closingBalance}
                  </Typography.Text>
                  <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818] opacity-100'>
                    {/* {item.consumption?.powerConsumptionDetail[0].newMeterReading} */}
                  </Typography.Text>
                </div>
              </div>
              <div className='flex flex-row space-x-8'>
                <div className='flex flex-col space-y-0.5'>
                  <Typography.Text className='text-nowrap text-left text-[12px]/[16px] font-normal tracking-normal text-[#6C737E] opacity-100'>
                    {customerLookupDetailedMessages.amount}
                  </Typography.Text>
                  <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818] opacity-100'>
                    {item.consumption?.powerConsumptionGeneral[0].amountDue.toLocaleString('vi-VN')}
                  </Typography.Text>
                </div>
                <div className='flex flex-col space-y-0.5'>
                  <Typography.Text className='text-nowrap text-left text-[12px]/[16px] font-normal tracking-normal text-[#6C737E] opacity-100'>
                    {customerLookupDetailedMessages.vat}
                  </Typography.Text>
                  <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818] opacity-100'>
                    {item.consumption?.powerConsumptionGeneral[0].vatAmount.toLocaleString('vi-VN')}
                  </Typography.Text>
                </div>
                <div className='flex flex-col space-y-0.5'>
                  <Typography.Text className='text-nowrap text-left text-[12px]/[16px] font-normal tracking-normal text-[#6C737E] opacity-100'>
                    {customerLookupDetailedMessages.totalAmount}
                  </Typography.Text>
                  {item.consumption?.powerConsumptionGeneral[0].debtAmount !== null ? (
                    <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#D1131D] opacity-100'>
                      {item.consumption?.powerConsumptionGeneral[0].totalAmount.toLocaleString('vi-VN')}
                    </Typography.Text>
                  ) : (
                    <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#06A77D] opacity-100'>
                      {item.consumption?.powerConsumptionGeneral[0].totalAmount.toLocaleString('vi-VN')}
                    </Typography.Text>
                  )}
                </div>
              </div>
            </div>
            {item.consumption?.powerConsumptionGeneral[0].debtAmount !== null ? (
              <>
                <Divider className='h-[92px]' type='vertical'></Divider>
                <div className='flex flex-col space-y-4'>
                  <div className='flex flex-row space-x-5'></div>
                  <div className='flex flex-row space-x-5 pt-9'>
                    <div className='flex flex-col space-y-0.5'>
                      <Typography.Text className='text-nowrap text-left text-[12px]/[16px] font-normal tracking-normal text-[#6C737E] opacity-100'>
                        {customerLookupDetailedMessages.paymentDate}
                      </Typography.Text>
                      <Typography.Text className='text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818] opacity-100'>
                        {/* {item.paymentDate} */}
                      </Typography.Text>
                    </div>
                    <div className='flex flex-col space-y-0.5'>
                      <Typography.Text className='text-le ft text-[12px]/[16px] font-normal tracking-normal text-[#6C737E] opacity-100'>
                        {customerLookupDetailedMessages.debtCancellationDate}
                      </Typography.Text>
                      <Typography.Text className='text-nowrap text-left text-[16px]/[18px] font-normal tracking-normal text-[#181818] opacity-100'>
                        {/* {item.debtCancellationDate} */}
                      </Typography.Text>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className='flex flex-col space-y-4'></div>
            )}
          </div>
        </List.Item>
      )}
    ></List>
  );
};

export default CustomerLookupElectricityConsumptionAndPaymentAll;
