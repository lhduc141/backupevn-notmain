import { Card, Divider, Typography } from 'antd'
import { VipCustomerIcon } from 'assets'
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message'
import React from 'react'

const TicketDetailedCustomerInformation = () => {
  return (
    <Card className='card-body-padding-none-override w-[348px] h-[1000px]  bg-[#F5F5F7] bg-no-repeat bg-clip-padding rounded-r-none rounded-l-[12px] opacity-100'>
        <div className='flex flex-col'>
            <Typography.Text className='ml-5 mt-6 text-left font-semibold text-[12px]/[16px] tracking-normal text-[#868D97] uppercase opacity-100'>{customerLookupDetailedMessages.customerPE}</Typography.Text>
            <Typography.Text className='ml-5 mt-3 text-left font-semibold text-[26px]/[34px] tracking-normal text-[#141414] opacity-100'>PE12200036641</Typography.Text>
            <div className='mt-2 bg-[#FCDB6E33] bg-no-repeat bg-clip-padding opacity-100'>
                <div className='ml-5 my-4 flex flex-row gap-3'>
                    <VipCustomerIcon className='w-10 h-10'></VipCustomerIcon>
                    <div className='flex flex-col gap-0.5'>
                        <Typography.Text className='text-left font-semibold text-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>{customerLookupDetailedMessages.vipCustomer}</Typography.Text>
                        <Typography.Text className='text-left text-[12px]/[16px] tracking-normal text-[#141414] opacity-100'>Lorem ipsum dolor sit amet</Typography.Text>
                    </div>
                </div>
            </div>
            <div className='mx-5 mt-6 flex flex-col'>
                <Typography.Text className='text-left font-semibold text-[12px]/[16px] tracking-normal text-[#6C737E] uppercase opacity-100'>{customerLookupDetailedMessages.customerInfor}</Typography.Text>
                <Typography.Text className='mt-4 text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>{customerLookupDetailedMessages.customerFullName}</Typography.Text>
                <Typography.Text className='mt-1.5 text-left font-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>Trần Thanh Tâm</Typography.Text>
                <Typography.Text className='mt-5 text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>{customerLookupDetailedMessages.customerPhone}</Typography.Text>
                <Typography.Text className='mt-1.5 text-left font-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>0934126354</Typography.Text>
                <Typography.Text className='mt-5 text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>{customerLookupDetailedMessages.customerAddress}</Typography.Text>
                <Typography.Text className='mt-1.5 text-left font-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>437/16 Hoàng Văn Thụ, Phường 4, Quận Tân Bình</Typography.Text>
                <Divider></Divider>
            </div>
            <div className='mx-5  flex flex-col'>
                <Typography.Text className='text-left font-semibold text-[12px]/[16px] tracking-normal text-[#6C737E] uppercase opacity-100'>{customerLookupDetailedMessages.requesterInformation}</Typography.Text>
                <Typography.Text className='mt-4 text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>{customerLookupDetailedMessages.requesterFullName}</Typography.Text>
                <Typography.Text className='mt-1.5 text-left font-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>Trần Thanh Tâm</Typography.Text>
                <div className='flex flex-row gap-6'>
                    <div className='flex flex-col'>
                        <Typography.Text className='mt-5 text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>{customerLookupDetailedMessages.requesterPhone}</Typography.Text>
                        <Typography.Text className='mt-1.5 text-left font-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>0934126354</Typography.Text>
                    </div>
                    <div className='flex flex-col'>
                        <Typography.Text className='mt-5 text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>{customerLookupDetailedMessages.numberOfCalls}</Typography.Text>
                        <Typography.Text className='mt-1.5 text-left font-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>1</Typography.Text>
                    </div>
                </div>
                <Typography.Text className='mt-5 text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>{customerLookupDetailedMessages.requesterAddress}</Typography.Text>
                <Typography.Text className='mt-1.5 text-left font-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>437/16 Hoàng Văn Thụ, Phường 4, Quận Tân Bình</Typography.Text>
                <Divider></Divider>
            </div>
            <div className='mx-5 flex flex-col'>
                <div className='flex flex-row gap-20'>
                    <div className='flex flex-col'>
                        <Typography.Text className=' text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>{customerLookupDetailedMessages.citizenIdCard}</Typography.Text>
                        <Typography.Text className='mt-1.5 text-left font-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>0934126354</Typography.Text>
                    </div>
                    <div className='flex flex-col'>
                        <Typography.Text className=' text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>{customerLookupDetailedMessages.dateOfIssue}</Typography.Text>
                        <Typography.Text className='mt-1.5 text-left font-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>1</Typography.Text>
                    </div>
                </div>
                <Typography.Text className='mt-5 text-left text-[14px]/[18px] tracking-normal text-[#6C737E] opacity-100'>{customerLookupDetailedMessages.placeOfIssue}</Typography.Text>
                <Typography.Text className='mt-1.5 text-left font-[16px]/[20px] tracking-normal text-[#141414] opacity-100'>Cục cảnh sát quản lý hành chính về trật tự xã hội</Typography.Text>
                <Divider></Divider>
            </div>
        </div>
    </Card>
  )
}

export default TicketDetailedCustomerInformation