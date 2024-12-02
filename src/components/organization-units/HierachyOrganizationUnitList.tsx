import { Spin, Typography } from 'antd';
import {
  MinusSquareOutlinedIcon,
  PlusSquareFilledIcon,
  ServiceTypeIcon,
  TreeChildrenLargeIcon,
  UserFilledIcon
} from 'assets';
import { useOrganizationUnitsHierarchy, useSearchParamsForm } from 'hooks';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { OrganizationUnitHierarchyDto } from 'types';
import OrganizationUnitActions from './OrganizationUnitActions';

type HierachyOrganizationUnitListProps = {
  onClick?: (data: OrganizationUnitHierarchyDto) => void;
  onDelete?: (data: OrganizationUnitHierarchyDto) => void;
  onClickServiceType?: (data: OrganizationUnitHierarchyDto) => void;
  onClickUser?: (data: OrganizationUnitHierarchyDto) => void;
  onUpdateInfo?: (data: OrganizationUnitHierarchyDto) => void;
};

const HierachyOrganizationUnitList = ({
  onClick,
  onDelete,
  onClickServiceType,
  onClickUser,
  onUpdateInfo
}: HierachyOrganizationUnitListProps) => {
  const [expandedKeys, setExpandedKeys] = useState<number[]>([1]);
  const { getSearchParams } = useSearchParamsForm();

  const values = getSearchParams();
  const { organizationsUnitsHierarchy, isLoading } = useOrganizationUnitsHierarchy({
    ...values
  });

  const handleOnExpand = (expanded: boolean, record: OrganizationUnitHierarchyDto) => {
    if (expanded) {
      setExpandedKeys((prev) => [...prev, record.organizationUnitId]);
    } else {
      setExpandedKeys((prev) => prev.filter((key) => key !== record.organizationUnitId));
    }
  };

  const renderItem = (record: OrganizationUnitHierarchyDto, showIcon?: boolean) => {
    return (
      <>
        <div className='hidden-container flex select-none items-center py-[5px]'>
          {showIcon ? <TreeChildrenLargeIcon /> : undefined}
          {record.children && record.children.length > 0 ? (
            expandedKeys.includes(record.organizationUnitId) ? (
              <MinusSquareOutlinedIcon className='cursor-pointer' onClick={() => handleOnExpand(false, record)} />
            ) : (
              <PlusSquareFilledIcon className='cursor-pointer' onClick={() => handleOnExpand(true, record)} />
            )
          ) : undefined}
          <Typography.Text className='hidden-container-text ml-[18px]' onClick={() => onClick?.(record)}>
            {record.name}
          </Typography.Text>
          <div className='hidden-content'>
            <div className='ml-4 flex gap-x-4'>
              <div className='flex items-center gap-x-1 text-subTextColor'>
                <UserFilledIcon />
                <span
                  className={twMerge(record.countUsers ? 'cursor-pointer underline' : '')}
                  onClick={() => onClickUser?.(record)}
                >
                  {record.countUsers}
                </span>
              </div>
              <div className='flex items-center gap-x-1 text-subTextColor'>
                <ServiceTypeIcon />
                <span
                  className={twMerge(record.countServiceTypes ? 'cursor-pointer underline' : '')}
                  onClick={() => onClickServiceType?.(record)}
                >
                  {record.countServiceTypes}
                </span>
              </div>
              <OrganizationUnitActions organizationUnit={record} onDelete={onDelete} onUpdateInfo={onUpdateInfo} />
            </div>
          </div>
        </div>
        {expandedKeys.includes(record.organizationUnitId) && record.children && record.children.length > 0 ? (
          <div className={twMerge(showIcon ? 'ml-16' : '')}>{renderList(record.children, true)}</div>
        ) : undefined}
      </>
    );
  };

  const renderList = (data: OrganizationUnitHierarchyDto[], showIcon?: boolean) => {
    return (
      <ul>
        {data.map((orgUnit) => (
          <li key={orgUnit.organizationUnitId}>{renderItem(orgUnit, showIcon)}</li>
        ))}
      </ul>
    );
  };

  return <Spin spinning={isLoading}>{renderList(organizationsUnitsHierarchy)}</Spin>;
};

export default HierachyOrganizationUnitList;
