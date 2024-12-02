import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'components';
import dayjs from 'dayjs';
import { useInternalAnnouncementsDeletedPaging, useSearchParamsForm } from 'hooks';
import { internalAnnouncementsMessages } from 'messages';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FindAllInternalAnnouncementDto, InternalAnnouncementDto } from 'types';
import { DATE_TIME_FORMAT } from 'utils';
import InternalAnnouncementDeletedDetailDrawer from './InternalAnnouncementDeletedDetailDrawer';

type InternalAnnouncementsDeletedTableProps = {
  filterData: Omit<FindAllInternalAnnouncementDto, 'pageIndex' | 'pageSize'>;
  onRowClick: (record: InternalAnnouncementDto) => void;
};
export type InternalAnnouncementsDeletedTableRefProps = {
  resetPage: () => void;
};
const InternalAnnouncementsDeletedTable = forwardRef<
  InternalAnnouncementsDeletedTableRefProps,
  InternalAnnouncementsDeletedTableProps
>(({ filterData, onRowClick }, ref) => {
  useImperativeHandle(ref, () => ({
    resetPage: resetPage
  }));
  const { getSearchParams, setSearchParam } = useSearchParamsForm();
  const { IA } = getSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [internalAnnouncementId, setInternalAnnouncementId] = useState<number | undefined>(IA);

  const {
    data: internalAnnouncements,
    count,
    pageIndex,
    handleChangePage,
    isLoading,
    resetPage
  } = useInternalAnnouncementsDeletedPaging({ ...filterData });

  const handleOpenDrawer = ({ internalAnnouncementId }: InternalAnnouncementDto) => {
    setInternalAnnouncementId(internalAnnouncementId);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setInternalAnnouncementId(undefined);
  };

  const columns: ColumnsType<InternalAnnouncementDto> = [
    {
      title: internalAnnouncementsMessages.title,
      dataIndex: 'title',
      key: 'title',
      className: 'font-semibold',
      width: '30%'
    },
    {
      title: internalAnnouncementsMessages.organizationUnit,
      dataIndex: 'organizationUnit',
      key: 'organizationUnit',
      render: (_, record) => (
        <Typography.Text className='text-sm'>
          {record.organizationUnits?.map((org) => org.name).join(', ') || '-'}
        </Typography.Text>
      )
    },
    {
      title: internalAnnouncementsMessages.deletedAt,
      key: 'deletedAt',
      dataIndex: 'deletedAt',
      render: (val) => (
        <Typography.Text className='text-sm'>{val ? dayjs(val).format(DATE_TIME_FORMAT) : '-'}</Typography.Text>
      ),
      width: 150
    },
    {
      title: internalAnnouncementsMessages.viewedCount,
      key: 'viewedCount',
      dataIndex: 'viewedCount',
      render: (val) => <Typography.Text className='text-sm'>{val}</Typography.Text>,
      width: 100
    },
    {
      title: internalAnnouncementsMessages.confirmedCount,
      key: 'confirmedCount',
      dataIndex: 'confirmedCount',
      render: (val, record) => (
        <Typography.Text className='text-sm'>{record.isRequestConfirm ? val : '-'}</Typography.Text>
      ),
      width: 150
    }
  ];

  return (
    <>
      <Table
        loading={isLoading}
        currentPage={pageIndex}
        count={count}
        handleChangePage={handleChangePage}
        columns={columns}
        dataSource={internalAnnouncements || []}
        rowClassName='cursor-pointer'
        rowKey={(record: InternalAnnouncementDto) => record.internalAnnouncementId}
        onRow={(record: InternalAnnouncementDto) => ({
          onClick: () => {
            onRowClick(record);
            setSearchParam('IA', record.internalAnnouncementId);
            handleOpenDrawer(record);
          }
        })}
      />
      <InternalAnnouncementDeletedDetailDrawer
        open={openDrawer}
        internalAnnouncementId={internalAnnouncementId}
        onClose={handleCloseDrawer}
      />
    </>
  );
});

export default InternalAnnouncementsDeletedTable;
