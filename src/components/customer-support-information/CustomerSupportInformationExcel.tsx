import { Spin, Pagination } from 'antd';
import { InputSearchV2 } from 'components/common';
import Excel from 'components/common/excel/Excel';
import { messages } from 'messages';
import { useEffect, useState } from 'react';
import { useGetCustomerSupportInformationFormatContentActiveQuery } from 'services';
import { twMerge } from 'tailwind-merge';
import { addIndexColumn, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'utils';

type CustomerSupportInformationExcelProps = {
  customerSupportInformationId?: number;
  minWidth?: number;
  maxWidth?: number;
  height?: number;
  searchClassName?: string;
  showSearch?: boolean;
  onLoadData?: (data: (string | number)[][]) => void;
};

const CustomerSupportInformationExcel = ({
  customerSupportInformationId,
  minWidth,
  maxWidth,
  searchClassName,
  height,
  onLoadData,
  showSearch = true
}: CustomerSupportInformationExcelProps) => {
  const [keyword, setKeyword] = useState('');
  const [excelPage, setExcelPage] = useState(DEFAULT_PAGE_INDEX);
  const [rowZero, setRowZero] = useState<(string | number)[]>([]);
  const {
    data: formatContent,
    isLoading: isLoadingContent,
    isFetching: isFetchingContent
  } = useGetCustomerSupportInformationFormatContentActiveQuery(
    {
      customerSupportInformationId: customerSupportInformationId!,
      keyword: keyword,
      pageIndex: excelPage,
      pageSize: DEFAULT_PAGE_SIZE
    },
    {
      skip: !customerSupportInformationId,
      refetchOnMountOrArgChange: true
    }
  );

  useEffect(() => {
    setExcelPage(DEFAULT_PAGE_INDEX);
    setKeyword('');
  }, [customerSupportInformationId]);

  useEffect(() => {
    if (formatContent?.data.rows) {
      let excelData: (string | number)[][] | undefined = [
        ...(excelPage === 1 ? [] : [rowZero]),
        ...(formatContent?.data.rows || [])
      ];
      if (excelPage === 1) {
        excelData = addIndexColumn(excelData);
        if (excelData) setRowZero(excelData[0]);
      }
      if (excelData) onLoadData?.(excelData);
    }
  }, [formatContent]);
  const heightTable = height ? height - (showSearch ? 164 : 0) : undefined;
  return (
    <div className='w-full'>
      {showSearch && (
        <div
          className={twMerge('relative left-1/2 mb-5 flex h-fit -translate-x-1/2 items-center rounded-lg')}
          style={{ width: minWidth }}
        >
          {showSearch && (
            <InputSearchV2
              placeholder={messages.search}
              className={twMerge('rounded-lg', searchClassName)}
              onChange={setKeyword}
            />
          )}
        </div>
      )}
      <Spin spinning={isLoadingContent || isFetchingContent}>
        <Excel
          height={heightTable}
          minWidth={minWidth}
          maxWidth={maxWidth}
          data={formatContent?.data.rows}
          pageIndex={excelPage - 1}
          titleRows={excelPage !== 1 && rowZero ? rowZero : undefined}
        />
      </Spin>
      <Pagination
        className='mt-4 text-end'
        current={excelPage}
        total={formatContent?.data.count}
        onChange={setExcelPage}
        pageSize={DEFAULT_PAGE_SIZE}
        showSizeChanger={false}
      />
    </div>
  );
};

export default CustomerSupportInformationExcel;
