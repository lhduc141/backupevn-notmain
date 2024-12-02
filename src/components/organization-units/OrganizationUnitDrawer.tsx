import { Button, Descriptions, Divider, DrawerProps, List, Typography } from 'antd';
import { useGetOrganizationUnitDetailQuery } from 'services';
import OrganizationUnitActions from './OrganizationUnitActions';
import { OrganizationUnitDto } from 'types';
import { messages, organizationUnitsMessages } from 'messages';
import { useState } from 'react';
import OrganizationUnitServiceTypeList from './OrganizationUnitServiceTypeList';
import { DEFAULT_LIST_INFO_SIZE, ORGANIZATION_UNIT_CLASSIFY } from 'utils';
import { Avatar, Drawer } from 'components/common';
import OrganizationUnitUserList from './OrganizationUnitUserList';
import OrganizationUnitChildrenList from './OrganizationUnitChildrenList';

type OrganizationUnitDrawerProps = DrawerProps & {
  organizationUnitId?: number;
  onDelete?: (data: OrganizationUnitDto) => void;
  onUpdateInfo?: (data: OrganizationUnitDto) => void;
};

const OrganizationUnitDrawer = ({
  organizationUnitId,
  onDelete,
  onUpdateInfo,
  ...props
}: OrganizationUnitDrawerProps) => {
  const { data, isLoading } = useGetOrganizationUnitDetailQuery(organizationUnitId!, {
    skip: !organizationUnitId
  });

  const [showService, setShowService] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const organizationUnit = data?.data;

  const generalDescriptionItem = [
    {
      key: 'name',
      label: organizationUnitsMessages.organizationUnitName,
      children: organizationUnit?.name
    },
    {
      key: 'code',
      label: organizationUnitsMessages.code,
      children: organizationUnit?.code
    },
    {
      key: 'parent',
      label: organizationUnitsMessages.directUnder,
      children: organizationUnit?.parent?.name
    }
  ];

  const deputyDescriptionItem = [
    {
      key: 'headUser',
      label: organizationUnitsMessages.headUser,
      children: organizationUnit?.headUser ? (
        <div className='flex items-center gap-x-4'>
          <Avatar size={20} fileId={organizationUnit?.headUser?.avatar} name={organizationUnit?.headUser?.fullName} />
          <Typography.Text>{organizationUnit?.headUser?.fullName}</Typography.Text>
        </div>
      ) : (
        ''
      )
    },
    {
      key: 'deputy',
      label: organizationUnitsMessages.deputyUser,
      children:
        organizationUnit?.deputyUsers && organizationUnit?.deputyUsers.length > 0 ? (
          <div className='flex flex-col gap-y-4'>
            {organizationUnit?.deputyUsers?.map((deputy) => (
              <div key={deputy.userId} className='flex items-center gap-x-4'>
                <Avatar size={20} fileId={deputy.avatar} name={deputy.fullName} />
                <Typography.Text>{deputy.fullName}</Typography.Text>
              </div>
            ))}
          </div>
        ) : (
          ''
        )
    }
  ];

  return (
    <Drawer
      {...props}
      loading={isLoading}
      width={454}
      title={organizationUnit?.code}
      extra={
        <div>
          {organizationUnit && (
            <OrganizationUnitActions
              organizationUnit={organizationUnit}
              onDelete={onDelete}
              onUpdateInfo={onUpdateInfo}
            />
          )}
        </div>
      }
    >
      <Typography.Title className='mb-8 mt-0 text-2.5xl'>{organizationUnit?.name}</Typography.Title>

      <Typography.Title className='mb-4 mt-0 text-lg'>{messages.general}</Typography.Title>
      <Descriptions items={generalDescriptionItem} column={1} labelStyle={{ minWidth: 140 }} />
      <Divider className='mb-8 mt-6' />

      <Typography.Title className='mb-4 mt-0 text-lg'>
        {organizationUnitsMessages.organizationUnitType}
      </Typography.Title>
      <Typography.Text>{organizationUnit?.organizationUnitClassify?.name ?? '-'}</Typography.Text>
      {organizationUnit?.organizationUnitClassifyId === ORGANIZATION_UNIT_CLASSIFY.PHONGDOI ? (
        <Descriptions className='mt-4' column={1} labelStyle={{ minWidth: 140 }} items={deputyDescriptionItem} />
      ) : undefined}
      <Divider className='mb-8 mt-6' />

      <Typography.Title className='mb-0 mt-0 pb-2 text-lg'>{organizationUnitsMessages.service}</Typography.Title>
      {showService && organizationUnitId ? (
        <OrganizationUnitServiceTypeList organizationUnitId={organizationUnitId} />
      ) : (
        <>
          {organizationUnit?.serviceTypes && organizationUnit.serviceTypes.length > 0 ? (
            <List
              split={false}
              dataSource={organizationUnit?.serviceTypes}
              rowKey={(item) => item.serviceTypeId}
              renderItem={(item) => <List.Item className='py-2'>{item.name}</List.Item>}
            />
          ) : undefined}
          {organizationUnit?.countServiceTypes && organizationUnit.countServiceTypes > DEFAULT_LIST_INFO_SIZE ? (
            <Button type='text' className='-mx-4 font-normal text-colorPrimary' onClick={() => setShowService(true)}>
              {messages.viewAll(
                `${organizationUnit.countServiceTypes} ${organizationUnitsMessages.service.toLowerCase()}`
              )}
            </Button>
          ) : undefined}
        </>
      )}
      <Divider className='mb-8 mt-3' />

      <Typography.Title className='mb-0 mt-0 pb-2 text-lg'>{organizationUnitsMessages.children}</Typography.Title>
      {showChildren && organizationUnitId ? (
        <OrganizationUnitChildrenList organizationUnitId={organizationUnitId} />
      ) : (
        <>
          {organizationUnit?.children && organizationUnit.children.length > 0 ? (
            <List
              split={false}
              dataSource={organizationUnit?.children}
              rowKey={(item) => item.organizationUnitId}
              renderItem={(item) => <List.Item className='py-2'>{item.name}</List.Item>}
            />
          ) : undefined}
          {organizationUnit?.countChildren && organizationUnit.countChildren > DEFAULT_LIST_INFO_SIZE ? (
            <Button type='text' className='-mx-4 font-normal text-colorPrimary' onClick={() => setShowChildren(true)}>
              {messages.viewAll(
                `${organizationUnit.countChildren} ${organizationUnitsMessages.children.toLowerCase()}`
              )}
            </Button>
          ) : undefined}
        </>
      )}
      <Divider className='mb-8 mt-3' />

      <Typography.Title className='mb-0 mt-0 pb-2 text-lg'>{organizationUnitsMessages.users}</Typography.Title>
      {showUser && organizationUnitId ? (
        <OrganizationUnitUserList organizationUnitId={organizationUnitId} compact />
      ) : (
        <>
          {organizationUnit?.users && organizationUnit.users.length > 0 ? (
            <List
              split={false}
              dataSource={organizationUnit?.users}
              rowKey={(item) => item.userId}
              renderItem={(item) => (
                <List.Item className='py-2'>
                  <div className='flex items-center gap-x-4'>
                    <Avatar size={32} fileId={item.avatar} name={item.fullName} />
                    <div>
                      <Typography.Text>{item.fullName}</Typography.Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          ) : undefined}
          {organizationUnit?.countUsers && organizationUnit.countUsers > DEFAULT_LIST_INFO_SIZE ? (
            <Button type='text' className='-mx-4 font-normal text-colorPrimary' onClick={() => setShowUser(true)}>
              {messages.viewAll(`${organizationUnit.countUsers} ${organizationUnitsMessages.users.toLowerCase()}`)}
            </Button>
          ) : undefined}
        </>
      )}
    </Drawer>
  );
};

export default OrganizationUnitDrawer;
