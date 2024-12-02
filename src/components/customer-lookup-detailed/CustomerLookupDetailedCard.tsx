import { Button, Card, Modal, Space, Typography } from "antd"
import { LoupIcon } from "assets"
import { customerLookupDetailedMessages } from "messages/customer-lookup-detailed.message"
import { VipCustomerIcon } from "assets"
import { Divider } from 'antd';
import { useState } from "react";
import { useCustomerDetail } from "hooks/customer-lookup/useCustomerDetail";


type CustomerDetailProps = {
    customerId: number;
};

const CustomerLookupDetailedCard = ({ customerId }: CustomerDetailProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const {customer, isLoading} = useCustomerDetail(customerId);
    
    console.log(customerId)
    
    console.log(customer?.customerName)

    return (
        <Space direction="vertical">
            <Card loading={isLoading} className="w-80 ant-card-head-p-5 ant-card-body-pt-none card-body-padding-none-override ant-card-head-border-bottom-none" title={<span className="w-60 text-[22px]">{customer?.customerCode}</span>} extra={<LoupIcon className="w-5 h-5" color="#1564E8" />}>
                <div className='flex flex-col'>
                    <div className='flex pl-4 py-4 gap-1 bg-[#FCDB6E33]'>
                        <Space >
                            <VipCustomerIcon />
                        </Space>
                        <div className='flex flex-col'>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base font-semibold">{customerLookupDetailedMessages.vipCustomer}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-xs">Lorem ipsum dolor sit amet</Typography.Text>
                            </Space>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="flex justify-between items-center py-5">
                            <Space direction='vertical'>
                                <Typography.Text className="text-base font-semibold">{customerLookupDetailedMessages.customerInformation}</Typography.Text>
                            </Space>
                            <Button onClick={showModal}  className="text-[#1564E8] text-base font-normal w-[69px]" type="text">{customerLookupDetailedMessages.detailed}</Button>
                            {/* <Space direction='vertical'>
                                <Typography.Text className="text-base text-[#1564E8]">Chi tiết</Typography.Text>
                            </Space> */}
                        </div>
                        <div className="flex flex-col pb-5 gap-[6px]">
                            <Space direction='vertical'>
                                <Typography.Text className="text-[14px]/[16px] text-[#6C737E]">{customerLookupDetailedMessages.customerFullName}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base">{customer?.customerName}</Typography.Text>
                            </Space>
                        </div>
                        <div className="flex flex-col pb-5 gap-[6px]">
                            <Space direction='vertical'>
                                <Typography.Text className="text-[14px]/[16px] text-[#6C737E]">{customerLookupDetailedMessages.customerPhone}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base">{customer?.customerPhone}</Typography.Text>
                            </Space>
                        </div>
                        <div className="flex flex-col gap-[6px]">
                            <Space direction='vertical'>
                                <Typography.Text className="text-[14px]/[16px] text-[#6C737E]">{customerLookupDetailedMessages.customerAddress}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base">{customer?.customerAddress}</Typography.Text>
                            </Space>
                        </div>
                        <Divider className="mt-5 mb-0"/>
                        <div className="flex flex-col pb-5 gap-[6px] mt-5">
                            <Space direction='vertical'>
                                <Typography.Text className="text-[14px]/[16px] text-[#6C737E]">{customerLookupDetailedMessages.routeSession}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base">{customer?.routeCode}</Typography.Text>
                            </Space>
                        </div>
                        <div className="flex flex-col pb-5 gap-[6px]">
                            <Space direction='vertical'>
                                <Typography.Text className="text-[14px]/[16px] text-[#6C737E]">{customerLookupDetailedMessages.addressName}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base">07099 HOANG VAN THU 437</Typography.Text>
                            </Space>
                        </div>
                        <div className="flex flex-col pb-5 gap-[6px]">
                            <Space direction='vertical'>
                                <Typography.Text className="text-[14px]/[16px] text-[#6C737E]">{customerLookupDetailedMessages.unit}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base">{customer?.organizationUnit?.name}</Typography.Text>
                            </Space>
                        </div>
                        <Divider className="mt-5 mb-0" />
                        <div className="flex flex-col pb-5 gap-[6px] mt-5">
                            <Space direction='vertical'>
                                <Typography.Text className="text-[14px]/[16px] text-[#6C737E]">{customerLookupDetailedMessages.customerCode}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base">PE00000000000</Typography.Text>
                            </Space>
                        </div>
                        <Divider className="mx-0" />
                        <Space className=" pb-4 mt-5" direction='vertical'>
                            <Typography.Text className="text-base font-semibold">{customerLookupDetailedMessages.contract}</Typography.Text>
                        </Space>
                        <div className="flex flex-col pb-4 gap-[6px]">
                            <Space direction='vertical'>
                                <Typography.Text className="text-[14px]/[16px] text-[#6C737E]">{customerLookupDetailedMessages.signedDate}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base">01/09/2019</Typography.Text>
                            </Space>
                        </div>
                        <div className="flex flex-col pb-4 gap-[6px]">
                            <Space direction='vertical'>
                                <Typography.Text className="text-[14px]/[16px] text-[#6C737E]">{customerLookupDetailedMessages.effectiveFrom}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base">01/09/2019</Typography.Text>
                            </Space>
                        </div>
                        <div className="flex flex-col pb-4 gap-[6px]">
                            <Space direction='vertical'>
                                <Typography.Text className="text-[14px]/[16px] text-[#6C737E]">{customerLookupDetailedMessages.effectiveTo}</Typography.Text>
                            </Space>
                            <Space direction='vertical'>
                                <Typography.Text className="text-base">Không thời hạn</Typography.Text>
                            </Space>
                        </div>
                    </div>
                </div>

            </Card>

            <Modal className='w-[768px] ant-modal-body-p-none'  open={isModalOpen} onCancel={handleCancel}   footer={null}>
                <div className='flex flex-col mx-6'>
                    <Typography.Text className='mt-[25px] text-left font-semibold text-[14px]/[20px] tracking-normal text-[#868D97] uppercase opacity-100'>{customerLookupDetailedMessages.detailedInformation}</Typography.Text>
                    <Typography.Text className='mt-3 text-left font-semibold text-[26px]/[34px] tracking-normal text-[#141414] opacity-100'>{customerLookupDetailedMessages.customer} {customer?.customerCode}</Typography.Text>
                    <Typography.Text className='mt-8 text-left font-semibold text-[18px]/[22px] tracking-normal text-[#141414] opacity-100'>{customerLookupDetailedMessages.customerInfor}</Typography.Text>
                    <div className='mt-5'>
                        <div className='flex flex-row gap-5 '>
                            <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.customerPE}:</Typography.Text>
                            <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customer?.customerCode}</Typography.Text>
                        </div>
                        <div className='flex flex-row gap-5  mt-4'>
                            <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100 '>{customerLookupDetailedMessages.customerName}:</Typography.Text>
                            <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100 uppercase'>{customer?.customerName}</Typography.Text>
                        </div>
                        <div className='flex flex-row gap-5  mt-4'>
                            <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.idCard}:</Typography.Text>
                            <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>027165895</Typography.Text>
                        </div>
                        <div className='flex flex-row gap-5  mt-4'>
                            <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.address}:</Typography.Text>
                            <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customer?.customerAddress}</Typography.Text>
                        </div>
                        <div className='flex flex-row gap-5  mt-4'>
                            <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.phoneNumber}:</Typography.Text>
                            <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>0934000662</Typography.Text>
                        </div>
                        <Divider></Divider>
                        <div>
                            <div className='flex flex-row gap-5 '>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.meterNumber}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>19235626778</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.exposed}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>070990-05</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.transformerStationCode}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100 uppercase'>070990 (HOÀNG VAN THU 437)</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.cadastralUnit}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>79928392183923 (Phuong 04, Quan Tan Binh)</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.groupCode}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>-</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.powerCompany}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>Công ty điện lực Tân Bình</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.status}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customer?.status}</Typography.Text>
                            </div>
                            <Divider></Divider>
                        </div>
                    </div>
                    <div>
                        <Typography.Text className='text-left font-semibold text-[18px]/[22px] tracking-normal text-[#141414] opacity-100'>{customerLookupDetailedMessages.cmisSmsEmailInformation}</Typography.Text>
                        <div className='mt-5'>
                            <div className='flex flex-row gap-5 '>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.primaryPhoneNumber}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>0934000662</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.primaryEmail}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>-</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.contactPhoneNumber}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>0934000662</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.contactEmail}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>-</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.phoneNumberInSMS}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>0934000662</Typography.Text>
                            </div>
                            <div className='flex flex-row gap-5  mt-4'>
                                <Typography.Text className='w-[200px] text-right text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>{customerLookupDetailedMessages.emailInSMS}:</Typography.Text>
                                <Typography.Text className='w-[500px] text-[#141414] text-[16px]/[20px] tracking-normal opacity-100'>-</Typography.Text>
                            </div>
                            <Divider></Divider>
                        </div>
                    </div>
                </div>
            </Modal>
        </Space>

        
    )
}
export default CustomerLookupDetailedCard
