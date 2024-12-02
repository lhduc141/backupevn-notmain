import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, Timeline, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import img from '../../assets/images/logo.png';
import { ticketDetailedMessages } from 'messages/ticket-detailed.messages';

const CustomerLookupRequestHistoryCardProcessing = () => {
  const processArr = processArr12.filter((item, index, self) => self.findIndex((t) => t.name === item.name) === index);
  const maxShowAll = 3;
  const groupArr = [...processArr.slice(0, processArr.length - 1)];
  const calculatedLeft = -2.5 * (processArr.length - 1) + 10;

  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div>
      <Typography.Text className='text-[18px]/[22px] font-semibold text-[#141414]'>Quá trình xử lý</Typography.Text>
      {processArr.length > maxShowAll && !showAll ? (
        <div className={`${showAll ? 'hidden' : 'relative left-4 mt-8 block'}`}>
          <Timeline className='custom-timeline'>
            <Timeline.Item
              className='relative left-8'
              dot={
                groupArr.length <= 7 ? (
                  <Tooltip
                    arrow={false}
                    className={`relative left-2`}
                    title={groupArr.map((avt, index) => (
                      <div key={index} className='z-0 flex items-center space-x-1 rounded p-2'>
                        <Avatar src={avt.image} className='z-10 h-8 w-8 rounded-full border-[2px] border-white' />
                        <span className='text-sm text-white'>{avt.name}</span>
                      </div>
                    ))}
                    placement='rightBottom'
                    overlayStyle={{ backgroundColor: '#222A41', color: 'white', borderRadius: '8px' }}
                  >
                    <div className='relative flex items-center'>
                      <div className='relative flex'>
                        {groupArr.map((avt, index) => (
                          <Avatar
                            key={index}
                            src={avt.image}
                            className={`z-10 h-10 w-10 rounded-full border-[3px] border-white ${
                              index !== 0 ? 'ml-[-20px]' : ''
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip
                    arrow={false}
                    className='relative left-[18px]'
                    title={groupArr.map((avt, index) => (
                      <div key={index} className='z-0 flex items-center space-x-1 rounded p-2'>
                        <Avatar src={avt.image} className='z-10 h-8 w-8 rounded-full border-[2px] border-white' />
                        <Typography.Text className='text-sm text-white'>{avt.name}</Typography.Text>
                      </div>
                    ))}
                    placement='rightBottom'
                    overlayStyle={{ backgroundColor: '#222A41', color: 'white', borderRadius: '8px' }}
                  >
                    <div className='relative flex items-center'>
                      <div className='relative flex'>
                        {groupArr.slice(0, 5).map((avt, index) => (
                          <Avatar
                            key={index}
                            src={avt.image}
                            className={`z-10 h-10 w-10 rounded-full border-[3px] border-white ${
                              index !== 0 ? 'ml-[-20px]' : ''
                            }`}
                          />
                        ))}
                        {groupArr.length > 5 && (
                          <Avatar className='z-10 ml-[-20px] flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-gray-800 text-white'>
                            {groupArr.length - 5}
                          </Avatar>
                        )}
                      </div>
                    </div>
                  </Tooltip>
                )
              }
            >
              <div className={`relative -top-4 ${groupArr.length > 7 ? 'left-16' : `left-20`} space-y-2 pb-2`}>
                <Button className='text border-none bg-transparent text-[#1564E8] shadow-none' onClick={handleShowAll}>
                  {ticketDetailedMessages.buttonShowAllHistoryProcess}
                </Button>
              </div>
            </Timeline.Item>

            <Timeline.Item dot={<Avatar src={img} className='top-6 h-10 w-10 rounded-full'></Avatar>}>
              <div className='relative left-2 space-y-2 pb-2'>
                <Typography.Text className='text-[16px]/[20px] font-semibold text-[#141414]'>
                  {processArr[processArr.length - 1]?.name}
                </Typography.Text>
                <div className='flex space-x-2'>
                  <Typography.Text className='text-[14px]/[18px] font-normal text-[#141414]'>
                    {processArr[processArr.length - 1].time}, {processArr[processArr.length - 1].date}
                  </Typography.Text>
                  <Typography.Text className='text-[14px]/[18px] font-normal text-[#141414]'>.</Typography.Text>
                  <Typography.Text className='text-[14px]/[18px] font-normal text-[#141414]'>
                    {processArr[processArr.length - 1].department}
                  </Typography.Text>
                </div>
                {processArr[processArr.length - 1].historyProcess?.map((process, index) => (
                  <div className='py-1' key={index}>
                    <div className='status-result font-semibold'>
                      <EditOutlined className='mr-1 pb-1' />
                      {process.status}
                    </div>
                    <div className='status-comment'>
                      {process.content !== null || process.content == '' ? `"${process.content}"` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </Timeline.Item>
          </Timeline>
        </div>
      ) : (
        <div className='ml-4 mt-8'>
          <Timeline className='custom-timeline showAll-timeline'>
            {processArr.map((data, index) => (
              <Timeline.Item
                key={index}
                dot={<img src={data.image} alt='User 1' className='left-8 h-10 w-10 rounded-full' />}
              >
                <div className='relative -top-4 left-4 space-y-2 pb-2'>
                  <Typography.Text className='text-[16px]/[20px] font-semibold text-[#141414]'>
                    {data.name}
                  </Typography.Text>
                  <div className='flex space-x-2'>
                    <Typography.Text className='text-[14px]/[18px] font-normal text-[#141414]'>
                      {data.time}, {data.date}
                    </Typography.Text>
                    <Typography.Text className='text-[14px]/[18px] font-normal text-[#141414]'>.</Typography.Text>
                    <Typography.Text className='text-[14px]/[18px] font-normal text-[#141414]'>
                      {data.department}
                    </Typography.Text>
                  </div>

                  {data.historyProcess?.map((process, index) => (
                    <div className='py-1' key={index}>
                      <div className='status-result font-semibold'>
                        <EditOutlined className='mr-1 pb-1' />
                        {process.status}
                      </div>
                      <div className='status-comment'>
                        {process.content !== null || process.content == '' ? `"${process.content}"` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      )}
    </div>
  );
};

export default CustomerLookupRequestHistoryCardProcessing;

const processArr4 = [
  {
    id: 1,
    name: 'Trần Nguyễn Hoàng Lê',
    image: img,
    time: '11:48',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Tạo phiếu chuyển đơn vị',
        content: null
      }
    ]
  },
  {
    id: 2,
    name: 'Lê Thu Thủy',
    image: img,
    time: '12:08',
    date: '23/08/2024',
    department: 'Công ty Điện lực Tân Bình',
    historyProcess: [
      {
        status: 'Chuyển trưởng ca xử lý',
        content: 'Địa chỉ không chính xác, nhờ anh chị liên hệ khách hàng kiểm tra lại'
      }
    ]
  },
  {
    id: 3,
    name: 'Nguyễn Văn Mai',
    image: img,
    time: '13:01',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Cập nhật địa chỉ',
        content: '253 Hoàng Văn Thụ, Phường 4, Quận Tân Bình'
      }
    ]
  },
  {
    id: 4,
    name: 'Phạm Minh Huy',
    image: img,
    time: '14:30',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Hoàn tất',
        content: 'Khách hàng đã được hỗ trợ thành công'
      }
    ]
  }
];

const processArr7 = [
  ...processArr4,
  {
    id: 5,
    name: 'Ngô Thu Minh',
    image: img,
    time: '15:00',
    date: '23/08/2024',
    department: 'Điện lực Thành phố',
    historyProcess: [
      {
        status: 'Gửi thông báo',
        content: 'Khách hàng đã nhận thông báo qua email'
      }
    ]
  },
  {
    id: 6,
    name: 'Trần Văn Hải',
    image: img,
    time: '15:30',
    date: '23/08/2024',
    department: 'Điện lực Quận 5',
    historyProcess: [
      {
        status: 'Cập nhật trạng thái',
        content: 'Đơn vị đã tiến hành kiểm tra và xử lý'
      }
    ]
  },
  {
    id: 7,
    name: 'Nguyễn Thị Lan',
    image: img,
    time: '16:00',
    date: '23/08/2024',
    department: 'CSKH Miền Đông',
    historyProcess: [
      {
        status: 'Hoàn tất xử lý',
        content: 'Hệ thống đã được cập nhật thành công'
      }
    ]
  }
];

const processArr12 = [
  ...processArr7,
  {
    id: 8,
    name: 'Hoàng Thanh Bình',
    image: img,
    time: '16:30',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Tạo mới phiếu',
        content: 'Phiếu yêu cầu đã được khởi tạo thành công'
      }
    ]
  },
  {
    id: 9,
    name: 'Đỗ Văn Lâm',
    image: img,
    time: '17:00',
    date: '23/08/2024',
    department: 'Điện lực Hà Nội',
    historyProcess: [
      {
        status: 'Kiểm tra thông tin',
        content: 'Thông tin khách hàng đã được xác nhận'
      }
    ]
  },
  {
    id: 10,
    name: 'Phạm Thị Nhung',
    image: img,
    time: '17:30',
    date: '23/08/2024',
    department: 'Điện lực TP.HCM',
    historyProcess: [
      {
        status: 'Chuyển đơn vị khác',
        content: 'Đơn vị không thuộc phạm vi quản lý, đã chuyển sang nơi khác'
      }
    ]
  },
  {
    id: 11,
    name: 'Lý Minh Đức',
    image: img,
    time: '18:00',
    date: '23/08/2024',
    department: 'Điện lực miền Trung',
    historyProcess: [
      {
        status: 'Hoàn tất',
        content: 'Đã xử lý thành công yêu cầu của khách hàng'
      }
    ]
  },
  {
    id: 12,
    name: 'Trần Quốc Anh',
    image: img,
    time: '18:30',
    date: '23/08/2024',
    department: 'Điện lực miền Bắc',
    historyProcess: [
      {
        status: 'Cập nhật thông tin',
        content: 'Thông tin đã được thay đổi theo yêu cầu khách hàng'
      }
    ]
  }
];

const processArr12WithDuplicates = [
  {
    id: 1,
    name: 'Trần Nguyễn Hoàng Lê',
    image: img,
    time: '11:48',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Tạo phiếu chuyển đơn vị',
        content: null
      }
    ]
  },
  {
    id: 2,
    name: 'Lê Thu Thủy',
    image: img,
    time: '12:08',
    date: '23/08/2024',
    department: 'Công ty Điện lực Tân Bình',
    historyProcess: [
      {
        status: 'Chuyển trưởng ca xử lý',
        content: 'Địa chỉ không chính xác, nhờ anh chị liên hệ khách hàng kiểm tra lại'
      }
    ]
  },
  {
    id: 3,
    name: 'Nguyễn Văn Mai',
    image: img,
    time: '13:01',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Cập nhật địa chỉ',
        content: '253 Hoàng Văn Thụ, Phường 4, Quận Tân Bình'
      }
    ]
  },
  {
    id: 4,
    name: 'Phạm Minh Huy',
    image: img,
    time: '14:30',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Hoàn tất',
        content: 'Khách hàng đã được hỗ trợ thành công'
      }
    ]
  },
  {
    id: 1,
    name: 'Trần Nguyễn Hoàng Lê',
    image: img,
    time: '11:48',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Tạo phiếu chuyển đơn vị',
        content: null
      }
    ]
  },
  {
    id: 2,
    name: 'Lê Thu Thủy',
    image: img,
    time: '12:08',
    date: '23/08/2024',
    department: 'Công ty Điện lực Tân Bình',
    historyProcess: [
      {
        status: 'Chuyển trưởng ca xử lý',
        content: 'Địa chỉ không chính xác, nhờ anh chị liên hệ khách hàng kiểm tra lại'
      }
    ]
  },
  {
    id: 3,
    name: 'Nguyễn Văn Mai',
    image: img,
    time: '13:01',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Cập nhật địa chỉ',
        content: '253 Hoàng Văn Thụ, Phường 4, Quận Tân Bình'
      }
    ]
  },
  {
    id: 4,
    name: 'Phạm Minh Huy',
    image: img,
    time: '14:30',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Hoàn tất',
        content: 'Khách hàng đã được hỗ trợ thành công'
      }
    ]
  },
  {
    id: 5,
    name: 'Ngô Thu Minh',
    image: img,
    time: '15:00',
    date: '23/08/2024',
    department: 'Điện lực Thành phố',
    historyProcess: [
      {
        status: 'Gửi thông báo',
        content: 'Khách hàng đã nhận thông báo qua email'
      }
    ]
  },
  {
    id: 6,
    name: 'Trần Văn Hải',
    image: img,
    time: '15:30',
    date: '23/08/2024',
    department: 'Điện lực Quận 5',
    historyProcess: [
      {
        status: 'Cập nhật trạng thái',
        content: 'Đơn vị đã tiến hành kiểm tra và xử lý'
      }
    ]
  },
  {
    id: 7,
    name: 'Nguyễn Thị Lan',
    image: img,
    time: '16:00',
    date: '23/08/2024',
    department: 'CSKH Miền Đông',
    historyProcess: [
      {
        status: 'Hoàn tất xử lý',
        content: 'Hệ thống đã được cập nhật thành công'
      }
    ]
  },
  {
    id: 8,
    name: 'Hoàng Thanh Bình',
    image: img,
    time: '16:30',
    date: '23/08/2024',
    department: 'TT CSKH',
    historyProcess: [
      {
        status: 'Tạo mới phiếu',
        content: 'Phiếu yêu cầu đã được khởi tạo thành công'
      }
    ]
  }
];
