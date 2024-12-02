import { Modal, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  InternalAnnouncementActions,
  InternalAnnouncementDetailDrawer,
  message,
  OptionStatus,
  Table
} from 'components';
import dayjs from 'dayjs';
import { useInternalAnnouncementsPaging, useSearchParamsForm } from 'hooks';
import { internalAnnouncementsMessages, messages } from 'messages';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useDeleteInternalAnnouncementMutation } from 'services';
import { FindAllInternalAnnouncementDto, InternalAnnouncementDto } from 'types';
import { DATE_TIME_FORMAT } from 'utils';
import ChangeInternalAnnouncementStatusModal from './ChangeInternalAnnouncementStatusModal';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';

const { confirm } = Modal;

type InternalAnnouncementsTableProps = {
  filterData: Omit<FindAllInternalAnnouncementDto, 'pageIndex' | 'pageSize'>;
  onRowClick?: (record: InternalAnnouncementDto) => void;
};
export type InternalAnnouncementsTableRefProps = {
  resetPage: () => void;
};
const InternalAnnouncementsTable = forwardRef<InternalAnnouncementsTableRefProps, InternalAnnouncementsTableProps>(
  ({ filterData, onRowClick }, ref) => {
    useImperativeHandle(ref, () => ({
      resetPage: resetPage
    }));
    const navigate = useNavigate();
    const { getSearchParams, setSearchParam } = useSearchParamsForm();
    const { IA } = getSearchParams();
    const [openStatus, setOpenStatus] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [onDelete, { isLoading: isLoadingDelete }] = useDeleteInternalAnnouncementMutation();
    const [internalAnnouncementId, setInternalAnnouncementId] = useState<number | undefined>(IA);

    const {
      data: internalAnnouncements,
      count,
      pageIndex,
      handleChangePage,
      isLoading,
      resetPage
    } = useInternalAnnouncementsPaging({ ...filterData });

    const handleOpenDrawer = ({ internalAnnouncementId }: InternalAnnouncementDto) => {
      setInternalAnnouncementId(internalAnnouncementId);
      setOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
      setOpenDrawer(false);
      setInternalAnnouncementId(undefined);
    };

    const handleUpdateInfo = (data: InternalAnnouncementDto) => {
      navigate(`${ROUTE.INTERNAL_ANNOUNCEMENTS}/${data.internalAnnouncementId}`);
    };

    const handleUpdateStatus = (data: InternalAnnouncementDto) => {
      setOpenStatus(true);
      setInternalAnnouncementId(data.internalAnnouncementId);
    };

    const handleCloseStatusModal = () => {
      setOpenStatus(false);
      setInternalAnnouncementId(undefined);
    };

    const handleDelete = (record: InternalAnnouncementDto) => {
      confirm({
        title: `${internalAnnouncementsMessages.delete} ${record.title}`,
        content: internalAnnouncementsMessages.confirmDelete,
        cancelText: messages.cancelButtonText,
        okText: messages.confirmButtonText,
        onOk: () => {
          onDelete(record.internalAnnouncementId)
            .unwrap()
            .then((rs) => {
              handleCloseDrawer();
              message.systemSuccess(rs.message);
            });
        },
        okButtonProps: {
          loading: isLoadingDelete
        }
      });
    };

    const columns: ColumnsType<InternalAnnouncementDto> = [
      {
        title: internalAnnouncementsMessages.title,
        dataIndex: 'title',
        key: 'title',
        className: 'font-semibold'
      },
      {
        title: internalAnnouncementsMessages.organizationUnit,
        dataIndex: 'organizationUnit',
        key: 'organizationUnit',
        render: (_, record) => (
          <Typography.Text className='text-sm'>
            {record.organizationUnits?.map((org) => org.name).join(', ') || '-'}
          </Typography.Text>
        ),
        width: '30%'
      },
      {
        title: internalAnnouncementsMessages.status,
        dataIndex: 'status',
        key: 'status',
        render: (value) => <OptionStatus value={value} />,
        width: 200
      },

      {
        title: internalAnnouncementsMessages.priority,
        dataIndex: 'priority',
        key: 'priority',
        render: (data) => <Typography.Text className='text-sm'>{data}</Typography.Text>,
        width: 150
      },
      {
        title: messages.updateAt,
        key: 'updatedAt',
        dataIndex: 'updatedAt',
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
      },
      {
        title: '',
        key: 'action',
        render: (_, record) => (
          <div onClick={(e) => e.stopPropagation()}>
            <InternalAnnouncementActions
              internalAnnouncement={record}
              onUpdateInfo={handleUpdateInfo}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          </div>
        ),
        className: 'px-0',
        fixed: 'right',
        width: 32
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
          rowKey={(record: InternalAnnouncementDto) => record.internalAnnouncementId}
          rowClassName='cursor-pointer'
          onRow={(record: InternalAnnouncementDto) => ({
            onClick: () => {
              onRowClick?.(record);
              setSearchParam('IA', record.internalAnnouncementId);
              handleOpenDrawer(record);
            }
          })}
        />
        <InternalAnnouncementDetailDrawer
          open={openDrawer}
          internalAnnouncementId={internalAnnouncementId}
          onClose={handleCloseDrawer}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
          onUpdateInfo={handleUpdateInfo}
        />
        <ChangeInternalAnnouncementStatusModal
          open={openStatus}
          internalAnnouncementId={internalAnnouncementId}
          onCancel={handleCloseStatusModal}
          onClose={handleCloseStatusModal}
        />
      </>
    );
  }
);

export default InternalAnnouncementsTable;
