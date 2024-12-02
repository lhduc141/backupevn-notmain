import { Select, Typography } from 'antd'
import { ArrowDownIcon } from 'assets'
import { useChannelsPaging } from 'hooks/channels'
import { createTicketMessages } from 'messages/create-ticket.messages'


const SelectChannels = ({...props}) => {
    const {channels, isLoading} = useChannelsPaging(props)
    return (
        <Select
            {...props}
            suffixIcon={<ArrowDownIcon className='w-[10px]'></ArrowDownIcon>}
            placeholder={<Typography.Text className='text-left text-[16px]/[22px] tracking-normal text-[#141414] opacity-100'>{createTicketMessages.selectReceptionChannel}</Typography.Text>}
            loading={isLoading}
            filterOption={false}
            options={[
                ...(channels?.map((itm) => ({
                    label: itm.channelName,
                    value: itm.channelId
                })) || [])
            ]}
        >
        </Select>
    )
}

export default SelectChannels