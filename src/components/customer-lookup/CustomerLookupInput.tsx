import { Button, Input } from 'antd';
import type { GetProps } from 'antd';
import { SearchIcon } from 'assets';

type SearchProps = GetProps<typeof Input.Search>;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
const CustomerLookupInput = () => {
    const { Search } = Input;
    return (
        <div className='w-[1288px] bg-[#EBEBED] flex items-center justify-center rounded-t-[12px]'>
            <Search 
                className='pt-5 pb-[26px] px-[354px]' 
                placeholder="Nhập thông tin cần tìm" 
                onSearch={onSearch}
                enterButton={<Button icon={<SearchIcon/>} className='w-10 h-10 bg-[#1564E8] rounded-lg opacity-100 bg-no-repeat bg-clip-padding'/>}

            />
        </div>
    )
}
export default CustomerLookupInput