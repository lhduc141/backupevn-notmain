import { message as messageAntd } from 'antd';
import { SuccessCircleOutlinedIcon, WarningCircleOutlinedIcon } from 'assets';

const systemSuccessMessage = (content: string) => {
  messageAntd.open({
    type: 'success',
    content,
    icon: <SuccessCircleOutlinedIcon className='text-white' />,
    className: 'system-message'
  });
};

const systemErrorMessage = (content: string) => {
  messageAntd.open({
    type: 'error',
    content,
    icon: <WarningCircleOutlinedIcon className='text-white' />,
    className: 'system-message'
  });
};

export type MessageProps = typeof messageAntd & {
  systemSuccess: typeof systemSuccessMessage;
  systemError: typeof systemErrorMessage;
};
const message = messageAntd as MessageProps;
message.systemSuccess = systemSuccessMessage;
message.systemError = systemErrorMessage;
export default message;
