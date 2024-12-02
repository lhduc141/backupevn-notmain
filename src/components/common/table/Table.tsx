import { Input, PaginationProps, Table as TableAntd, TableProps, Typography } from 'antd';
import { LeftIcon, RightIcon } from 'assets';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from 'utils';

type Props = TableProps & {
  currentPage: number;
  count: number;
  handleChangePage: (pageIndex: number) => void;
  isLoading?: boolean;
};
const pageSize = DEFAULT_PAGE_SIZE;

const Table = ({ isLoading, currentPage = 1, count = 1, handleChangePage, ...props }: Props) => {
  const [inputPageIndex, setInputPageIndex] = useState(currentPage);
  const totalPages = count ? Math.ceil(count / pageSize) : 1;
  useEffect(() => {
    setInputPageIndex(currentPage);
  }, [currentPage]);

  // Debounced function to handle page change
  const debouncedOnPageChange = useCallback(
    debounce((page: number) => {
      if (!isNaN(inputPageIndex) && page >= 1 && page <= totalPages) {
        handleChangePage(page);
      }
    }, 500),
    [handleChangePage, totalPages, currentPage]
  );

  const handleInputChange = (page: number) => {
    const value = page;
    setInputPageIndex(value);
    debouncedOnPageChange(value);
  };

  const handleInputBlur = () => {
    // Immediate validation if blur occurs
    if (isNaN(inputPageIndex) || inputPageIndex < 1 || inputPageIndex > totalPages) {
      setInputPageIndex(currentPage);
    } else {
      handleChangePage(inputPageIndex);
    }
  };
  const paginationConfig: PaginationProps = {
    disabled: isLoading,
    pageSize,
    total: count,
    showSizeChanger: false,
    current: currentPage,
    itemRender: (_, type) => {
      if (type === 'prev') {
        return (
          <div className='flex h-full w-full rounded-base hover:bg-colorBgIconHover'>
            <LeftIcon className='m-auto' />
          </div>
        );
      }
      if (type === 'next') {
        return (
          <div className='flex h-full w-full rounded-base hover:bg-colorBgIconHover'>
            <RightIcon className='m-auto' />
          </div>
        );
      }
      return null;
    },
    onChange: handleChangePage,
    showTotal: () => (
      <div className='flex select-none items-center'>
        <Input
          className='mr-2 h-8 w-10 rounded-base text-center text-sm'
          value={inputPageIndex}
          onBlur={handleInputBlur}
          onChange={(e) => handleInputChange(Number(e.target.value))}
        />
        <Typography.Text className='select-none text-sm'>/ {totalPages} trang</Typography.Text>
      </div>
    )
  };
  return <TableAntd loading={isLoading} {...props} pagination={paginationConfig} />;
};
export default Table;
