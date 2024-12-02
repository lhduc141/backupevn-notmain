import { Avatar, Card, Divider, Image, Tooltip, Typography } from 'antd';
import { CheckIcon, File, TicketStateCheckCircleIcon, TicketStateHourGlassIcon } from 'assets';
import { ticketDetailedMessages } from 'messages/ticket-detailed.messages';
import React from 'react';
import CustomerLookupRequestHistoryCardProcessing from './CustomerLookupRequestHistoryCardProcessing';

import img from '../../assets/images/logo.png';
import { CloudDownloadOutlined, FileOutlined } from '@ant-design/icons';

interface File {
  key: string;
  name: string;
  type: string;
  src: string;
}

interface Datatype {
  key: string;
  ticketName: string;
  ticketType: string;
  notMultipleRequests: boolean;
  ticketState: string;
  requestDate: string;
  receiptDate: string;
  completeDate: string;
  creator: string;
  recipient: string;
  completer: string;
  apoinmentDate: string;
  unit: string;
  receivingChannel: string;
  requestContent: string;
}

const data: Datatype[] = [
  {
    key: '1',
    ticketName: 'PHIẾU YÊU CẦU',
    ticketType: 'Hỏi đáp',
    notMultipleRequests: true,
    ticketState: 'Đã hoàn tất tại trung tâm',
    requestDate: '23/08/2024, 10:26',
    receiptDate: '23/08/2024, 10:26',
    completeDate: '23/08/2024, 10:26',
    creator: 'Trần Nguyễn Hoàng Lê',
    recipient: 'Trần Nguyễn Hoàng Lê',
    completer: 'Trần Nguyễn Hoàng Lê',
    apoinmentDate: '-',
    unit: 'Công ty điện lực Chợ Lớn',
    receivingChannel: 'Tổng đài CSKH',
    requestContent:
      'Khách hàng báo điện kế sút ốc treo lủng lẳng chưa được xử lý. Kính chuyển trung tâm kiểm tra và hổ trợ giúp. Xin cảm ơn ! Vui lòng liên hệ Chị Quyên_ 123456789'
  }
];

const fileArr: File[] = [
  {
    key: '1',
    name: 'anh1',
    type: 'png',
    src: img
  },
  {
    key: '2',
    name: 'anh2',
    type: 'jpg',
    src: img
  },
  {
    key: '3',
    name: 'anh3',
    type: 'png',
    src: img
  },
  {
    key: '3',
    name: 'anh1',
    type: 'txt',
    src: ''
  },
  {
    key: '2',
    name: 'anh2',
    type: 'word',
    src: ''
  },
  {
    key: '3',
    name: 'anh3',
    type: 'xlsm',
    src: ''
  }
];

const TicketDetailedInformation = () => {
  const ticketData = data[0];
  return (
    <Card className='card-body-padding-none-override h-[1000px] w-[804px] rounded-l-none rounded-r-[12px] bg-white bg-clip-padding bg-no-repeat opacity-100'>
      <div className='mx-5 mb-5 mt-6 flex flex-col'>
        <Typography.Text className='text-left text-[12px]/[16px] font-semibold uppercase tracking-normal text-[#868D97] opacity-100'>
          {ticketData.ticketName}
        </Typography.Text>
        <Typography.Text className='mt-3 text-left text-[26px]/[34px] font-semibold tracking-normal text-[#141414] opacity-100'>
          {ticketData.ticketType}
        </Typography.Text>
        {ticketData.notMultipleRequests === true ? (
          <div className='mt-2 flex flex-row items-center'>
            <CheckIcon
              className='h-[13px] w-[14px] bg-no-repeat bg-origin-padding opacity-100'
              style={{ color: '#06A77D' }}
            />
            <Typography.Text className='ml-2 text-left text-[16px]/[18px] tracking-normal text-[#141414] opacity-100'>
              {ticketDetailedMessages.notARepeatedRequest}
            </Typography.Text>
          </div>
        ) : (
          <></>
        )}
        {ticketData.ticketState === 'Chuyển đơn vị' ? (
          <div className='mt-3 h-10 rounded-[5px] bg-[#FF9500] bg-clip-padding bg-no-repeat'>
            <div className='mx-4 flex h-10 flex-row items-center justify-between'>
              <div className='flex flex-row'>
                <Typography.Text className='text-nowrap text-left text-[14px]/[18px] font-semibold tracking-normal text-[#FFFFFF] opacity-100'>
                  {ticketDetailedMessages.ticketState}:
                </Typography.Text>
                <Typography.Text className='ml-2 text-nowrap text-left text-[14px]/[18px] tracking-normal text-[#FFFFFF] opacity-100'>
                  {ticketData.ticketState}
                </Typography.Text>
              </div>
              <TicketStateHourGlassIcon className='h-6 w-6 bg-clip-padding bg-no-repeat opacity-100' />
            </div>
          </div>
        ) : ticketData.ticketState === 'Đã hoàn tất tại trung tâm' ? (
          <div className='mt-3 h-10 rounded-[5px] bg-[#06A77D] bg-clip-padding bg-no-repeat'>
            <div className='mx-4 flex h-10 flex-row items-center justify-between'>
              <div className='flex flex-row'>
                <Typography.Text className='text-nowrap text-left text-[14px]/[18px] font-semibold tracking-normal text-[#FFFFFF] opacity-100'>
                  {ticketDetailedMessages.ticketState}:
                </Typography.Text>
                <Typography.Text className='ml-2 text-nowrap text-left text-[14px]/[18px] tracking-normal text-[#FFFFFF] opacity-100'>
                  {ticketData.ticketState}
                </Typography.Text>
              </div>
              <TicketStateCheckCircleIcon className='h-6 w-6 bg-clip-padding bg-no-repeat opacity-100' />
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className='max-h-[800px] overflow-hidden overflow-y-scroll text-wrap p-1'>
          <div className='mt-5 h-[212px] rounded-[5px] bg-[#F5F5F7] bg-clip-padding bg-no-repeat px-1 pt-2 opacity-100'>
            <div className='m-5 flex flex-col space-x-5'>
              <div className='flex flex-row space-x-5'>
                <div className='flex w-[228px] flex-col space-y-1'>
                  <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                    {ticketDetailedMessages.requestDate}:
                  </Typography.Text>
                  <Typography.Text className='opacity text-left text-[16px]/[20px] tracking-normal text-[#141414]'>
                    {ticketData.requestDate}
                  </Typography.Text>
                </div>
                <div className='flex w-[228px] flex-col space-y-1'>
                  <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                    {ticketDetailedMessages.receptionDate}:
                  </Typography.Text>
                  <Typography.Text className='opacity text-left text-[16px]/[20px] tracking-normal text-[#141414]'>
                    {ticketData.receiptDate}
                  </Typography.Text>
                </div>
                <div className='flex w-[228px] flex-col space-y-1'>
                  <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                    {ticketDetailedMessages.completionDate}:
                  </Typography.Text>
                  <Typography.Text className='opacity text-left text-[16px]/[20px] tracking-normal text-[#141414]'>
                    {ticketData.completeDate}
                  </Typography.Text>
                </div>
              </div>
            </div>
            <div className='m-5 flex flex-col space-x-5'>
              <div className='flex flex-row space-x-5'>
                <div className='flex w-[228px] flex-col space-y-1'>
                  <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                    {ticketDetailedMessages.creator}:
                  </Typography.Text>
                  <div className='flex flex-row'>
                    <Avatar size={20} />
                    <Typography.Text className='opacity ml-2 text-left text-[16px]/[20px] tracking-normal text-[#141414]'>
                      {ticketData.creator}
                    </Typography.Text>
                  </div>
                </div>
                <div className='flex w-[228px] flex-col space-y-1'>
                  <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                    {ticketDetailedMessages.recipient}:
                  </Typography.Text>
                  <div className='flex flex-row'>
                    <Avatar size={20} />
                    <Typography.Text className='opacity ml-2 text-left text-[16px]/[20px] tracking-normal text-[#141414]'>
                      {ticketData.recipient}
                    </Typography.Text>
                  </div>
                </div>
                <div className='flex w-[228px] flex-col space-y-1'>
                  <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                    {ticketDetailedMessages.completer}:
                  </Typography.Text>
                  <div className='flex flex-row'>
                    <Avatar size={20} />
                    <Typography.Text className='opacity ml-2 text-left text-[16px]/[20px] tracking-normal text-[#141414]'>
                      {ticketData.completer}
                    </Typography.Text>
                  </div>
                </div>
              </div>
            </div>
            <div className='m-5 flex flex-col space-x-5'>
              <div className='flex flex-row space-x-5'>
                <div className='flex w-[228px] flex-col space-y-1'>
                  <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                    {ticketDetailedMessages.appointmentDate}:
                  </Typography.Text>
                  <Typography.Text className='opacity text-left text-[16px]/[20px] tracking-normal text-[#141414]'>
                    {ticketData.apoinmentDate}
                  </Typography.Text>
                </div>
                <div className='flex w-[228px] flex-col space-y-1'>
                  <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                    {ticketDetailedMessages.unit}:
                  </Typography.Text>
                  <Typography.Text className='opacity text-left text-[16px]/[20px] tracking-normal text-[#141414]'>
                    {ticketData.unit}
                  </Typography.Text>
                </div>
                <div className='flex w-[228px] flex-col space-y-1'>
                  <Typography.Text className='text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>
                    {ticketDetailedMessages.receivingChannel}:
                  </Typography.Text>
                  <Typography.Text className='opacity text-left text-[16px]/[20px] tracking-normal text-[#141414]'>
                    {ticketData.receivingChannel}
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>

          <div className='my-10 flex h-[60px] flex-row items-center justify-between'>
            <Typography.Text className='text-left text-[16px]/[16px] tracking-normal text-[#141414] opacity-100'>
              {ticketDetailedMessages.attachedFile}
            </Typography.Text>
            <div className='file-list' style={{ display: 'flex', gap: '20px' }}>
              {fileArr.map((file) => {
                const isImage = !['png', 'jpg', 'jpeg', 'gif'].includes(file.type.toLowerCase());

                const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.classList.add('hover-active');
                  const fileElement = e.currentTarget.querySelector(
                    isImage ? '.file-icon' : '.file-image'
                  ) as HTMLElement | null;
                  const cloudElement = e.currentTarget.querySelector('.cloud-icon') as HTMLElement | null;
                  if (fileElement) fileElement.classList.add('hidden');
                  if (cloudElement) cloudElement.classList.remove('hidden');
                };

                const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.classList.remove('hover-active');
                  const fileElement = e.currentTarget.querySelector(
                    isImage ? '.file-icon' : '.file-image'
                  ) as HTMLElement | null;
                  const cloudElement = e.currentTarget.querySelector('.cloud-icon') as HTMLElement | null;
                  if (fileElement) fileElement.classList.remove('hidden');
                  if (cloudElement) cloudElement.classList.add('hidden');
                };

                return (
                  <div key={file.key} className='file-item ant-btn ant-btn-circle ant-btn-default'>
                    {isImage ? (
                      <Tooltip>
                        <div
                          className='file-download-icon ant-btn ant-btn-circle ant-btn-default'
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <File className='file-icon' />
                          <CloudDownloadOutlined className='cloud-icon hidden' />
                        </div>
                      </Tooltip>
                    ) : (
                      <div
                        className='file-image-container ant-btn ant-btn-circle ant-btn-default'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Image src={file.src} className='file-image' />
                        <CloudDownloadOutlined className='cloud-icon hidden' />
                      </div>
                    )}
                    <p className='mt-2 text-center'>{file.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <Divider></Divider>
          <Typography.Text className='mt-2 text-left text-[18px]/[22px] font-semibold tracking-normal text-[#141414] opacity-100'>
            {ticketDetailedMessages.requestContent}
          </Typography.Text>
          <Typography.Paragraph className='mt-5 text-left text-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>
            {ticketData.requestContent}
          </Typography.Paragraph>
          <Divider></Divider>

          {/* History of processing request */}
          <CustomerLookupRequestHistoryCardProcessing />
        </div>
      </div>
    </Card>
  );
};

export default TicketDetailedInformation;
