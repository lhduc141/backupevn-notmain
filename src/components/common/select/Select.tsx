import { Select as SelectAntd, SelectProps as SelectPropsAntd, Skeleton, Spin } from 'antd';
import { ArrowDownIcon, LoupIcon } from 'assets';
import { debounce } from 'lodash';
import { useCallback } from 'react';
export type SelectProps = SelectPropsAntd & {
  onLoadMore?: () => void;
  hasMore?: boolean;
};
const Select = ({ onSearch, onLoadMore, hasMore, loading, ...props }: SelectProps) => {
  const debouncedOnSearch = useCallback(
    debounce((keywordValue: string) => {
      onSearch?.(keywordValue);
    }, 500),
    [onSearch]
  );

  const handleSearch = (val: string) => {
    debouncedOnSearch(val);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      onLoadMore?.();
    }
  };
  return (
    <SelectAntd
      {...props}
      dropdownRender={(menu) => {
        return (
          <div>
            {menu}
            {loading && <Skeleton active title={false} />}
          </div>
        );
      }}
      onSearch={handleSearch}
      onPopupScroll={handleScroll}
      loading={loading}
      suffixIcon={
        loading ? (
          <Spin spinning />
        ) : props.showSearch ? (
          <LoupIcon className='h-5 w-5 text-colorTextPlaceholder' />
        ) : (
          <ArrowDownIcon className='h-[10px] w-[10px] text-colorTextBase' />
        )
      }
    />
  );
};
export default Select;
