import { ChannelDto } from "./channel.dto";

export type ChannelCompactDto = Pick <
    ChannelDto,
    'channelId' | 'channelCode' | 'channelName'
>;