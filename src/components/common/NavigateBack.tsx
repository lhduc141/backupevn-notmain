import { Button, ButtonProps } from 'antd';
import { LeftIcon } from 'assets';
import { messages } from 'messages';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { configuration } from 'utils';

type NavigateBackType = ButtonProps & {
  defaultUrl?: string;
};
const NavigateBack = ({ defaultUrl = ROUTE.HOME, ...props }: NavigateBackType) => {
  const navigate = useNavigate();

  /** Hàm kiểm tra xem trang trước đó có cùng domain với trang hiện tại không */
  const isSameDomain = () => {
    /** document.referrer trả về rỗng ở local */
    const referrer = document.referrer;
    const currentDomain = window.location.origin;

    /** Tạo đối tượng URL từ referrer để so sánh domain  */
    try {
      const referrerDomain = new URL(referrer).origin;
      return referrerDomain === currentDomain;
    } catch (e) {
      console.error(messages.urlInvalid, e);
      return false;
    }
  };
  const handleGoBack = () => {
    if (isSameDomain() || configuration.NODE_ENV === 'develop') {
      navigate(-1);
    } else {
      navigate(defaultUrl);
    }
  };
  return (
    <Button onClick={handleGoBack} icon={<LeftIcon />} type='text' ghost size='small' className='h-8 w-8' {...props} />
  );
};
export default NavigateBack;
