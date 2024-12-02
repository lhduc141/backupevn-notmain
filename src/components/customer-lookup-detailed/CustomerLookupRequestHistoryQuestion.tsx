import { Button, Input, List, Select, Typography } from 'antd'
import { LoupIcon, QuestionAvatarIcon } from 'assets'
import { customerLookupDetailedMessages } from 'messages/customer-lookup-detailed.message'
import React from 'react'

const CustomerLookupRequestHistoryQuestion = () => {
    const questionName = [
        {
            title: 'Tư vấn sử dụng điện trong hộ gia đình'
        },
        {
            title: 'Tư vấn điện sinh hoạt'
        },
    ]

    const questionType = [
        {
            title: 'Tra cứu'
        },
        {
            title: 'Hỏi đáp'
        }
    ]

    const data = Array.from({ length: 2 }).map((_, i) => ({
        title: `${questionName[i].title}`,
        description: `${questionType[i].title}`,
    }));

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className='pt-1'>
            <div className='flex justify-center'>
                <div className='flex flex-row space-x-2'>
                    <Input className='w-[400px] h-[40px] text-base' size='large' placeholder='Nhập thông tin cần tìm' prefix={<LoupIcon className='w-5 h-5' />} />
                    <Select
                        className='w-[240px] h-[40px]'
                        defaultValue="Tất cả loại dịch vụ"
                        style={{ width: 240 }}
                        onChange={handleChange}
                        options={[
                            { value: 'Tất cả loại dịch vụ', label: 'Tất cả loại dịch vụ' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                        ]}
                    />
                    <Button className='w-[126px] h-[40px] text-[#1564E8] border-[#1564E8]' icon={<LoupIcon />} iconPosition='start'>
                        {customerLookupDetailedMessages.search}
                    </Button>
                </div>
            </div>
            <List
                className="pt-3 mb-5 list-item-hover-animation list-item-hover list-item-px-0-py-4"
                itemLayout='horizontal'
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item className=''>
                        <List.Item.Meta
                            avatar={<QuestionAvatarIcon />}
                            title={<b className='text-left opacity-100 tracking-normal text-base'>{item.title}</b>}
                            description={<Typography.Text className='text-[#141414] text-sm'>{item.description}</Typography.Text>}
                        >
                        </List.Item.Meta>
                    </List.Item>
                )}
            >
            </List>
        </div>
    )
}

export default CustomerLookupRequestHistoryQuestion