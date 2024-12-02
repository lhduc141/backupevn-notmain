import { Button, Card, Modal, Radio, RadioChangeEvent, Space, Typography } from 'antd'
import CreateTicketForm from 'components/create-ticket/CreateTicketForm';
import CreateTicketInStructions from 'components/create-ticket/CreateTicketInStructions';
import { customerLookupDetailedMessages } from "messages/customer-lookup-detailed.message"
import { useState } from 'react';

const CustomerLookupCreateTicket = () => {
    const [value, setValue] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Card
                title={<Typography.Text className='pl-5 text-left font-semibold text-[18px]/[22px] tracking-normal text-[#181818] opacity-100'>{customerLookupDetailedMessages.createTicket}</Typography.Text>}
                extra={<Button onClick={showModal} shape='circle' className='text-xl border-[#1564E8] text-[#1564E8] font-semibold w-[32px] h-[32px]'>+</Button>}
                styles={{
                    body: {
                        paddingTop: 0,
                        paddingLeft: 0,
                    },
                    header: {
                        paddingLeft: 0
                    }
                }}
                className='w-[320px] bg-[#FFFFFF] bg-no-repeat bg-clip-padding shadow-[0px_2px_12px_#0000001F]'
            >
                <Radio.Group onChange={onChange} value={value} style={{ width: '100%' }} >
                    <Space direction='vertical'>
                        <Radio.Button style={{ '--main-color': '#D1131D' } as React.CSSProperties} className='w-[315px] border-none h-[46px] pl-0 circle-expand-animation' value={1}>
                            <Space className='flex flex-row items-center justify-start pl-[32px] ml-3'>
                                <Typography.Text className='text-left font-normal text-[16px]/[20px] group-hover:text-white tracking-normal text-[#181818] opacity-100'>{customerLookupDetailedMessages.electricalRepairReport}</Typography.Text>
                            </Space>
                        </Radio.Button>
                        <Radio.Button style={{ '--main-color': '#FF9500' } as React.CSSProperties} className='w-[315px] border-none h-[46px] pl-0 circle-expand-animation' value={1}>
                            <Space className='flex flex-row items-center justify-start pl-[32px] ml-3'>
                                <Typography.Text className='text-left font-normal text-[16px]/[20px] group-hover:text-white tracking-normal text-[#181818] opacity-100'>{customerLookupDetailedMessages.powerOutageDueToDebt}</Typography.Text>
                            </Space>
                        </Radio.Button>
                        <Radio.Button style={{ '--main-color': '#06A77D' } as React.CSSProperties} className='w-[315px] border-none h-[46px] pl-0 circle-expand-animation' value={1}>
                            <Space className='flex flex-row items-center justify-start pl-[32px] ml-3'>
                                <Typography.Text className='text-left font-normal text-[16px]/[20px] group-hover:text-white tracking-normal text-[#181818] opacity-100'>{customerLookupDetailedMessages.requestForElectricitySupply}</Typography.Text>
                            </Space>
                        </Radio.Button>
                        <Radio.Button style={{ '--main-color': '#1564E8' } as React.CSSProperties} className='w-[315px] border-none h-[46px] pl-0 circle-expand-animation' value={1}>
                            <Space className='flex flex-row items-center justify-start pl-[32px] ml-3'>
                                <Typography.Text className='text-left font-normal text-[16px]/[20px] group-hover:text-white tracking-normal text-[#181818] opacity-100'>{customerLookupDetailedMessages.removal}</Typography.Text>
                            </Space>
                        </Radio.Button>
                        <Radio.Button style={{ '--main-color': '#FF9500' } as React.CSSProperties} className='w-[315px] border-none h-[46px] pl-0 circle-expand-animation' value={1}>
                            <Space className='flex flex-row items-center justify-start pl-[32px] ml-3'>
                                <Typography.Text className='text-left font-normal text-[16px]/[20px] group-hover:text-white tracking-normal text-[#181818] opacity-100'>{customerLookupDetailedMessages.contract}</Typography.Text>
                            </Space>
                        </Radio.Button>
                        <Radio.Button style={{ '--main-color': '#1564E8' } as React.CSSProperties} className='w-[315px] border-none h-[46px] pl-0 circle-expand-animation' value={1}>
                            <Space className='flex flex-row items-center justify-start pl-[32px] ml-3'>
                                <Typography.Text className='text-left font-normal text-[16px]/[20px] group-hover:text-white tracking-normal text-[#181818] opacity-100'>{customerLookupDetailedMessages.measuringDevice}</Typography.Text>
                            </Space>
                        </Radio.Button>
                        <Radio.Button style={{ '--main-color': '#FF9500' } as React.CSSProperties} className='w-[315px] border-none h-[46px] pl-0 circle-expand-animation' value={1}>
                            <Space className='flex flex-row items-center justify-start pl-[32px] ml-3'>
                                <Typography.Text className='text-left font-normal text-[16px]/[20px] group-hover:text-white tracking-normal text-[#181818] opacity-100 text-nowrap'>{customerLookupDetailedMessages.customerInquiryResolution}</Typography.Text>
                            </Space>
                        </Radio.Button>
                        <Radio.Button style={{ '--main-color': '#06A77D' } as React.CSSProperties} className='w-[315px] border-none h-[46px] pl-0 circle-expand-animation' value={1}>
                            <Space className='flex flex-row items-center justify-start pl-[32px] ml-3'>
                                <Typography.Text className='text-left font-normal text-[16px]/[20px] group-hover:text-white tracking-normal text-[#181818] opacity-100'>{customerLookupDetailedMessages.lookup}</Typography.Text>
                            </Space>
                        </Radio.Button>
                    </Space>
                </Radio.Group>
            </Card>

            <Modal className='w-[1748px] ant-modal-body-p-none' closable={false} onCancel={handleCancel} open={isModalOpen}  footer={null}>
                <div className='flex flex-row'>
                    <CreateTicketForm/>
                    <CreateTicketInStructions/>
                </div>
            </Modal>
        </>
    )
}

export default CustomerLookupCreateTicket