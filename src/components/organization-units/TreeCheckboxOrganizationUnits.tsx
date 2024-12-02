import { Typography } from 'antd';
import { TreeChildrenIcon } from 'assets';
import { RightSideCheckbox } from 'components/common/checkbox';
import { useOrganizationUnitsHierarchy } from 'hooks';
import { FindOrganizationUnitHierarchyDto, OrganizationUnitHierarchyDto } from 'types';

type TreeCheckboxOrganizationUnitsProps = FindOrganizationUnitHierarchyDto & {
  value: number[];
  onChange: (value: number[]) => void;
};

const TreeCheckboxOrganizationUnits: React.FC<TreeCheckboxOrganizationUnitsProps> = ({
  parentId,
  organizationUnitId,
  value,
  onChange
}) => {
  const { organizationsUnitsHierarchy } = useOrganizationUnitsHierarchy({
    parentId,
    organizationUnitId
  });

  const formatData = (data: OrganizationUnitHierarchyDto[]): any[] => {
    if (data.length === 0) return [];

    return data.map((item) => ({
      key: item.organizationUnitId.toString(),
      value: item.organizationUnitId.toString(),
      label: item.name,
      children: item.children && item.children.length > 0 ? formatData(item.children) : []
    }));
  };

  const handleChange = (selectedValue: string[]) => {
    onChange?.(selectedValue.map((val) => Number(val)));
  };

  return (
    <RightSideCheckbox
      options={formatData(organizationsUnitsHierarchy)}
      onChange={handleChange}
      prefix={<Typography.Text className='font-semibold'>•</Typography.Text>}
      childrenPrefix={<TreeChildrenIcon />}
      value={value.map((item) => item.toString())}
    />
  );
};
export default TreeCheckboxOrganizationUnits;
