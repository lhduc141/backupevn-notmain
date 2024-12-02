import { Button, Form, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ColumnsType } from 'antd/es/table';
import { HierachyIcon, PlusIcon, ThreeSquareOneCircleIcon } from 'assets';
import {
  FilterOptions,
  FilterOrganizationUnits,
  UserGroupUpdateUsersModal,
  UserGroupActions,
  UserGroupFormRefProps,
  UserGroupInfoModal,
  UserGroupUpdatePermisisonsModal
} from 'components';
import { InputSearch, PageHeader, Table } from 'components/common';
import UserGroupDrawer from 'components/user-groups/UserGroupDrawer';
import { useSearchParamsForm, useTitle, useUserGroupsPaging } from 'hooks';
import { messages } from 'messages';
import { userGroupsMessages } from 'messages/user-groups.messages';
import React, { useEffect, useRef, useState } from 'react';
import { FindAllUserGroupDto, OptionCompactDto, OrganizationUnitCompactDto, UserGroupDto } from 'types';
import { AUTH_OPTION_TYPES, MICROSERVICES } from 'utils';
type FindType = Omit<FindAllUserGroupDto, 'pageIndex' | 'pageSize'>;

const UserGroupList: React.FC = () => {
  useTitle(userGroupsMessages.title);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();

  const [open, setOpen] = useState(false);
  const [openPermissions, setOpenPermissions] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [userGroupId, setUserGroupId] = useState<number | undefined>();
  const [openDrawer, setOpenDrawer] = useState(false);

  const userGroupFormRef = useRef<UserGroupFormRefProps>(null);

  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();
  const { userGroups, count, pageIndex, handleChangePage, isLoading, resetPage } = useUserGroupsPaging({
    ...values
  });

  useEffect(() => {
    if (!open && userGroupFormRef.current) {
      userGroupFormRef.current.form.resetFields();
      setUserGroupId(undefined);
    }
  }, [open, userGroupFormRef.current]);

  const handleUpdateInfo = (data: UserGroupDto) => {
    setOpen(true);
    setUserGroupId(data.userGroupId);
  };

  const handleCloseInfoModal = () => {
    setOpen(false);
    setUserGroupId(undefined);
  };

  const handleUpdateUsers = (data: UserGroupDto) => {
    setOpenUsers(true);
    setUserGroupId(data.userGroupId);
  };

  const handleCloseUsersModal = () => {
    setOpenUsers(false);
    setUserGroupId(undefined);
  };

  const handleUpdatePermission = (data: UserGroupDto) => {
    setOpenPermissions(true);
    setUserGroupId(data.userGroupId);
  };

  const handleClosePermissionModal = () => {
    setOpenPermissions(false);
    setUserGroupId(undefined);
  };

  const handleOnClickRow = ({ userGroupId }: UserGroupDto) => {
    setUserGroupId(userGroupId);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setUserGroupId(undefined);
  };

  const columns: ColumnsType<UserGroupDto> = [
    {
      title: userGroupsMessages.name,
      dataIndex: 'name',
      key: 'name',
      className: 'font-semibold',
      width: '30%'
    },
    {
      title: userGroupsMessages.organizationUnit,
      dataIndex: 'organizationUnit',
      key: 'organizationUnit',
      render: (data: OrganizationUnitCompactDto) => (
        <div className='flex gap-x-1'>
          {data?.parent && (
            <>
              <Typography.Text className='text-sm font-semibold'>{data.parent.name}</Typography.Text>
              <Typography.Text className='text-sm'>\</Typography.Text>
            </>
          )}
          <Typography.Text className='text-sm'>{data?.name ?? '-'}</Typography.Text>
        </div>
      ),
      width: '30%'
    },
    {
      title: userGroupsMessages.classify,
      dataIndex: 'userGroupClassify',
      key: 'userGroupClassify',
      render: (data: OptionCompactDto) => <Typography.Text className='text-sm'>{data?.name}</Typography.Text>,
      width: '20%'
    },
    {
      title: userGroupsMessages.userGroupQuantity,
      key: 'userCount',
      render: (_, record) => <Typography.Text className='text-sm'>{record.countUsers ?? '-'}</Typography.Text>
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <UserGroupActions
            userGroup={record}
            onUpdateInfo={handleUpdateInfo}
            onUpdateUsers={handleUpdateUsers}
            onUpdatePermissions={handleUpdatePermission}
          />
        </div>
      ),
      className: 'px-0',
      fixed: 'right',
      width: 32
    }
  ];
  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {userGroupsMessages.title}
        </Typography.Title>
      </PageHeader>
      <Content className='flex flex-col gap-5 rounded-xl bg-colorBgContainer p-5'>
        <Form
          scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
          form={form}
          initialValues={getSearchParams()}
          onValuesChange={() => {
            resetPage();
            const values = form.getFieldsValue();
            setSearchParams(values);
          }}
        >
          <div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-1 gap-6'>
                <Form.Item<FindType> className='mb-0 max-w-[400px] flex-1' name='keyword'>
                  <InputSearch placeholder={messages.inputSearchInfo} />
                </Form.Item>
                <div className='flex items-center gap-2'>
                  <Form.Item<FindType> noStyle name='organizationUnitId'>
                    <FilterOrganizationUnits icon={<HierachyIcon />} organizationUnitId={values.organizationUnitId} />
                  </Form.Item>
                  <Form.Item<FindType> noStyle name='userGroupClassifyId'>
                    <FilterOptions
                      title={userGroupsMessages.classify}
                      service={MICROSERVICES.AUTH}
                      optionTypeId={AUTH_OPTION_TYPES.USER_GROUP_CLASSIFY}
                      icon={<ThreeSquareOneCircleIcon />}
                    />
                  </Form.Item>
                </div>
              </div>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                type='primary'
                icon={<PlusIcon />}
              >
                {messages.createButtonText}
              </Button>
            </div>
          </div>
        </Form>

        <div>
          <Table
            loading={isLoading}
            currentPage={pageIndex}
            count={count}
            handleChangePage={handleChangePage}
            columns={columns}
            dataSource={userGroups || []}
            rowKey={(record: UserGroupDto) => record.userGroupId}
            onRow={(record: UserGroupDto) => ({
              onClick: () => {
                // navigate(`${ROUTE.USER_GROUPS}/${record.userGroupId}`);
                handleOnClickRow(record);
              }
            })}
          />
        </div>
        <UserGroupInfoModal
          open={open}
          userGroupId={userGroupId}
          onCancel={handleCloseInfoModal}
          onClose={handleCloseInfoModal}
          onCloseAndUpdatePermission={(user) => {
            handleCloseInfoModal();
            handleUpdatePermission(user);
          }}
        />
        <UserGroupUpdateUsersModal
          open={openUsers}
          userGroupId={userGroupId}
          onCancel={handleCloseUsersModal}
          onClose={handleCloseUsersModal}
        />
        <UserGroupUpdatePermisisonsModal
          open={openPermissions}
          userGroupId={userGroupId}
          onCancel={handleClosePermissionModal}
          onClose={handleClosePermissionModal}
        />
      </Content>
      <UserGroupDrawer
        open={openDrawer}
        userGroupId={userGroupId}
        onClose={handleCloseDrawer}
        onUpdateUsers={handleUpdateUsers}
        onUpdatePermissions={handleUpdatePermission}
        onUpdateInfo={handleUpdateInfo}
      />
    </div>
  );
};

export default UserGroupList;
