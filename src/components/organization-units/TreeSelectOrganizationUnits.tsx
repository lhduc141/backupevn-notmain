import { Spin, TreeSelect, TreeSelectProps } from 'antd';
import { LoupIcon } from 'assets';
import React, { useState } from 'react';
import { useGetOrganizationUnitsHierachyOptionsQuery } from 'services';
import { FindOrganizationUnitHierarchyDto, OrganizationUnitHierarchyCompactDto } from 'types';

type TreeSelectOrganizationUnitsProps = TreeSelectProps & FindOrganizationUnitHierarchyDto;

const TreeSelectOrganizationUnits: React.FC<TreeSelectOrganizationUnitsProps> = ({
  parentId,
  organizationUnitId,
  showCheckedStrategy = 'SHOW_PARENT',
  ...props
}) => {
  const [keyword, setKeyword] = useState('');

  const { data: organizationsUnitsHierarchy, isLoading } = useGetOrganizationUnitsHierachyOptionsQuery({
    keyword,
    parentId,
    organizationUnitId
  });

  const handleSearch = (val: string) => {
    setKeyword(val);
  };
  const transformData = (treeData: OrganizationUnitHierarchyCompactDto[]): any[] => {
    if (treeData.length === 0) return [];

    return treeData.map((org) => ({
      title: org.name,
      value: org.organizationUnitId,
      key: org.organizationUnitId,
      children: org.children?.length ? transformData(org.children) : []
    }));
  };

  return (
    <TreeSelect
      {...props}
      onSearch={handleSearch}
      treeCheckable
      showCheckedStrategy={showCheckedStrategy}
      treeData={transformData(organizationsUnitsHierarchy?.data ?? [])}
      suffixIcon={isLoading ? <Spin spinning /> : <LoupIcon className='text-colorTextPlaceholder' />}
    />
  );
};
export default TreeSelectOrganizationUnits;
