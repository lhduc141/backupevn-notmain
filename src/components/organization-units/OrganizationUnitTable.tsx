import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useOrganizationUnitsPaging, useSearchParamsForm } from 'hooks';
import { organizationUnitsMessages } from 'messages';
import { OptionCompactDto, OrganizationUnitCompactDto, OrganizationUnitDto } from 'types';
import OrganizationUnitActions from './OrganizationUnitActions';
import { Table } from 'components/common';

type OrganizationUnitTableProps = {
  onClick?: (data: OrganizationUnitDto) => void;
  onDelete?: (data: OrganizationUnitDto) => void;
  onClickServiceType?: (data: OrganizationUnitDto) => void;
  onClickUser?: (data: OrganizationUnitDto) => void;
  onUpdateInfo?: (data: OrganizationUnitDto) => void;
};
const OrganizationUnitTable = ({
  onClick,
  onClickUser,
  onDelete,
  onClickServiceType,
  onUpdateInfo
}: OrganizationUnitTableProps) => {
  const { getSearchParams } = useSearchParamsForm();
  const values = getSearchParams();
  const { organizationsUnits, isLoading, count, pageIndex, handleChangePage } = useOrganizationUnitsPaging({
    ...values
  });

  const columns: ColumnsType<OrganizationUnitDto> = [
    {
      title: organizationUnitsMessages.organizationUnitName,
      dataIndex: 'name',
      key: 'name',
      className: 'font-semibold'
    },
    {
      title: organizationUnitsMessages.code,
      key: 'code',
      dataIndex: 'code'
    },
    {
      title: organizationUnitsMessages.classify,
      dataIndex: 'organizationUnitClassify',
      key: 'organizationUnitClassify',
      render: (data?: OptionCompactDto) => (
        <Typography.Text type='secondary' className='text-sm'>
          {data?.name ?? '-'}
        </Typography.Text>
      )
    },
    {
      title: organizationUnitsMessages.parent,
      dataIndex: 'parent',
      key: 'parent',
      render: (data?: OrganizationUnitCompactDto) => (
        <Typography.Text className='text-sm'>{data?.name ?? '-'}</Typography.Text>
      )
    },
    {
      title: organizationUnitsMessages.service,
      dataIndex: 'countServiceTypes',
      key: 'countServiceTypes',
      render: (value, record) =>
        value ? (
          <Typography.Link
            className='text-sm'
            onClick={(e) => {
              e.stopPropagation();
              onClickServiceType?.(record);
            }}
          >
            {value}
          </Typography.Link>
        ) : (
          <Typography.Text className='text-sm'>-</Typography.Text>
        )
    },
    {
      title: organizationUnitsMessages.users,
      dataIndex: 'countUsers',
      key: 'countUsers',
      render: (value, record) =>
        value ? (
          <Typography.Link
            className='text-sm'
            onClick={(e) => {
              e.stopPropagation();
              onClickUser?.(record);
            }}
          >
            {value}
          </Typography.Link>
        ) : (
          <Typography.Text className='text-sm'>{value}</Typography.Text>
        )
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <OrganizationUnitActions organizationUnit={record} onDelete={onDelete} onUpdateInfo={onUpdateInfo} />
        </div>
      ),
      className: 'px-0',
      fixed: 'right',
      width: 32
    }
  ];

  return (
    <Table
      count={count}
      currentPage={pageIndex}
      handleChangePage={handleChangePage}
      loading={isLoading}
      columns={columns}
      dataSource={organizationsUnits || []}
      rowKey={(record: OrganizationUnitDto) => record.organizationUnitId}
      onRow={(record: OrganizationUnitDto) => ({
        onClick: () => {
          onClick?.(record);
        }
      })}
    />
  );
};

export default OrganizationUnitTable;
