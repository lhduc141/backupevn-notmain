import { Typography } from 'antd';
import { Select } from 'components/common';
import { SelectProps } from 'components/common/select/Select';
import { useCustomersOptions } from 'hooks/customers';
import { useState } from 'react';
import { FindAllCustomerDto } from 'types';

type SelectCustomersProps = SelectProps & Omit<FindAllCustomerDto, 'keyword' | 'pageIndex' | 'pageSize'>;

const SelectCustomers = ({ ...props }: SelectCustomersProps) => {
  const [keyword, setKeyword] = useState('');

  const { customersOptions, handleLoadMore, isLoading, resetPage, isFetching, hasMore } = useCustomersOptions({
    customerCode: keyword
  });

  const handleSearch = (val: string) => {
    resetPage();
    setKeyword(val);
  };

  return (
    <Select
      {...props}
      onLoadMore={handleLoadMore}
      loading={isLoading || isFetching}
      hasMore={hasMore}
      showSearch
      filterOption={false}
      onSearch={handleSearch}
      options={
        customersOptions.map((itm) => ({
          ...itm,
          label: (
            <div className='flex items-center gap-2'>
              <Typography.Text>
                {itm.customerCode} - {itm.customerName}
              </Typography.Text>
            </div>
          ),
          value: itm.customerCode
        })) || []
      }
      onDropdownVisibleChange={(open) => {
        if (!open) {
          handleSearch('');
        }
      }}
    />
  );
};
export default SelectCustomers;
