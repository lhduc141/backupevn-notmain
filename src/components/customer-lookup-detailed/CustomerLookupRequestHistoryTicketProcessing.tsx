import { List, Divider, Typography, Modal } from 'antd';
import { CheckIcon, ClockIcon, PhoneIcon, UserIcon } from 'assets';
import TicketDetailedCustomerInformation from 'components/ticket-detailed/TicketDetailedCustomerInformation';
import TicketDetailedInformation from 'components/ticket-detailed/TicketDetailedInformation';
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message';
import { useState } from 'react';

const CustomerLookupRequestHistoryTicketProcessing = () => {
  interface DataType {
    key: string;
    ticketName: string;
    ticketState: string;
    receivingUnit: string;
    receivingTime: string;
    receivingDate: string;
    receivingYear: string;
    customerName: string;
    customerPhone: string;
    appointmentDate: string;
    notMultipleRequests: boolean;
  }

  const data: DataType[] = [
    {
      key: '1',
      ticketName: 'Báo mất điện',
      ticketState: 'Chuyển đơn vị',
      receivingUnit: 'Công ty điện lực Tân Bình',
      receivingTime: '10:26:32',
      receivingDate: '22/07',
      receivingYear: '2023',
      customerName: 'Nguyễn Văn Phúc',
      customerPhone: '0934000662',
      appointmentDate: '16:54, 22/04/2024',
      notMultipleRequests: true
    },
    {
      key: '2',
      ticketName: 'Di dời điện kế',
      ticketState: 'Chuyển phòng kỹ thuật',
      receivingUnit: '',
      receivingTime: '10:26:32',
      receivingDate: '22/07',
      receivingYear: '2023',
      customerName: 'Nguyễn Văn Phúc',
      customerPhone: '0934000662',
      appointmentDate: '16:54, 22/04/2024',
      notMultipleRequests: false
    },
    {
      key: '3',
      ticketName: 'Cấp điện trở lại khi khách hàng đã tạm ngừng sử dụng điện',
      ticketState: 'Chuyển phòng xử lí',
      receivingUnit: '',
      receivingTime: '10:26:32',
      receivingDate: '22/07',
      receivingYear: '2023',
      customerName: 'Nguyễn Văn Phúc',
      customerPhone: '0934000662',
      appointmentDate: '16:54, 22/04/2024',
      notMultipleRequests: false
    }
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <List
        className='list-item-hover-animation list-item-hover mb-5'
        itemLayout='vertical'
        size='large'
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            className=''
            extra={
              <div className=''>
                {item.notMultipleRequests === true ? (
                  <div className='flex flex-row items-center'>
                    <CheckIcon
                      className='h-[13px] w-[14px] bg-no-repeat bg-origin-padding opacity-100'
                      style={{ color: '#06A77D' }}
                    />
                    <Typography.Text
                      className='ml-2 text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'
                      type='secondary'
                    >
                      {customerLookupDetailedMessages.notARepeatedRequest}
                    </Typography.Text>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            }
            onClick={showModal}
          >
            <div className='flex flex-row space-x-5'>
              <div className='flex flex-col space-y-2'>
                <Typography.Text className='text-left font-oswald text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                  {item.receivingTime}
                </Typography.Text>
                <Typography.Text className='text-left font-oswald text-[22px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                  {item.receivingDate}
                </Typography.Text>
                <Typography.Text className='text-left font-oswald text-[12px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                  {item.receivingYear}
                </Typography.Text>
              </div>
              <Divider className='h-[72px]' type='vertical'></Divider>
              <div className='flex flex-col space-y-1'>
                <div className='flex flex-col space-y-1'>
                  <Typography.Text className='text-left text-base/[18px] font-semibold tracking-normal text-[#181818] opacity-100'>
                    {item.ticketName}
                  </Typography.Text>
                  <Typography.Text className='text-left text-[14px]/[18px] font-semibold tracking-normal text-[#E98A04] opacity-100'>
                    {item.ticketState}
                  </Typography.Text>
                </div>
                <div className='flex items-center space-x-2'>
                  <div className='flex gap-1'>
                    <UserIcon className='h-[16px] w-[16px] bg-transparent bg-no-repeat bg-origin-padding opacity-100' />
                    <Typography.Text className='text-left text-base/[18px] tracking-normal text-[#181818] opacity-100'>
                      {item.customerName}
                    </Typography.Text>
                  </div>
                  <Typography.Text className='relative -top-1.5 text-2xl font-bold'>.</Typography.Text>
                  <PhoneIcon className='h-[16] w-[16px] bg-transparent bg-no-repeat bg-origin-padding opacity-100' />
                  <Typography.Text className='text-left text-base/[18px] tracking-normal text-[#181818] opacity-100'>
                    {item.customerPhone}
                  </Typography.Text>
                  <Typography.Text className='relative -top-1.5 text-2xl font-bold'>.</Typography.Text>
                  <ClockIcon className='h-[16] w-[16px] bg-transparent bg-no-repeat bg-origin-padding opacity-100' />
                  <Typography.Text className='text-left text-base/[18px] tracking-normal text-[#141414] opacity-100'>
                    {customerLookupDetailedMessages.appointment} {item.appointmentDate}
                  </Typography.Text>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
      <Modal
        destroyOnClose
        className='ant-modal-body-p-none w-[1152px]'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className='flex flex-row'>
          <TicketDetailedCustomerInformation />
          <TicketDetailedInformation />
        </div>
      </Modal>
    </>
  );
};

export default CustomerLookupRequestHistoryTicketProcessing;
