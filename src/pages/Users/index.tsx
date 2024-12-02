import { Button, Form, Modal, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CheckTwoToneCircledIcon, HierachyIcon, PlusIcon, UserGroupFilledIcon } from 'assets';
import {
  ChangeUserPasswordModal,
  ChangeUserPermissionModal,
  ChangeUserStatusModal,
  FilterOptions,
  FilterOrganizationUnits,
  FilterUserGroups,
  UserActions,
  UserGender,
  UserInfoModal
} from 'components';
import { Avatar, InputSearch, message, OptionStatus, PageHeader, Table } from 'components/common';
import { useSearchParamsForm, useTitle, useUsersPaging } from 'hooks';
import { cloneDeep } from 'lodash';
import { messages } from 'messages';
import { usersMessages } from 'messages/users.messages';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { useDeleteUserMutation } from 'services';
import { twMerge } from 'tailwind-merge';
import { FindAllUserDto, OrganizationUnitCompactDto, UserDto } from 'types';
import { AUTH_OPTION_TYPES, MICROSERVICES } from 'utils';
const { confirm } = Modal;

type FindType = Omit<FindAllUserDto, 'pageSize'>;

const UsersPage: React.FC = () => {
  useTitle(usersMessages.title);
  const navigate = useNavigate();
  const { setSearchParams, getSearchParams } = useSearchParamsForm();

  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [openPermissions, setOpenPermissions] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const handleUpdatePermission = (data: UserDto) => {
    setOpenPermissions(true);
    setSelectedUserId(data.userId);
  };

  const handleClosePermissionModal = () => {
    setOpenPermissions(false);
    setSelectedUserId(undefined);
  };

  const handleUpdateInfo = (data: UserDto) => {
    setOpen(true);
    setSelectedUserId(data.userId);
  };

  const handleCloseInfoModal = () => {
    setOpen(false);
    setSelectedUserId(undefined);
  };

  const handleDelete = (record: UserDto) => {
    confirm({
      title: `${usersMessages.delete} ${record.fullName}`,
      content: usersMessages.confirmDelete,
      cancelText: messages.cancelButtonText,
      okText: messages.confirmButtonText,
      onOk: () => {
        onDelete(record.userId)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
          });
      },
      okButtonProps: {
        loading: isLoadingDelete
      }
    });
  };

  const handleUpdateStatus = (record: UserDto) => {
    setOpenStatus(true);
    setSelectedUserId(record.userId);
  };

  const handleCloseStatusModal = () => {
    setOpenStatus(false);
    setSelectedUserId(undefined);
  };

  const handleChangePassword = (record: UserDto) => {
    setOpenPassword(true);
    setSelectedUserId(record.userId);
  };

  const handleClosePasswordModal = () => {
    setOpenPassword(false);
    setSelectedUserId(undefined);
  };

  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();

  const { users, count, isLoading, pageIndex, handleChangePage, resetPage } = useUsersPaging({ ...values });

  const columns: ColumnsType<UserDto> = [
    {
      title: usersMessages.fullName,
      key: 'fullName',
      render: (_, record) => (
        <div className='flex items-center gap-4'>
          <Avatar size={40} fileId={record.avatar} name={record.fullName} />
          <Typography.Text className={twMerge('text-sm font-semibold', record.deletedBy ? 'line-through' : '')}>
            {record.fullName}
          </Typography.Text>
        </div>
      )
    },
    {
      title: usersMessages.status,
      key: 'status',
      dataIndex: 'status',
      render: (value) => <OptionStatus value={value} />
    },
    {
      title: usersMessages.employeeId,
      key: 'userId',
      render: (_, record) => <Typography.Text className='text-sm'>{record.employeeId ?? '-'}</Typography.Text>
    },
    {
      title: usersMessages.username,
      key: 'username',
      dataIndex: 'username'
    },
    {
      title: usersMessages.gender,
      key: 'gender',
      dataIndex: 'gender',
      render: (value) => (value ? <UserGender value={value} /> : '-')
    },
    {
      title: usersMessages.phoneNumber,
      key: 'phoneNumber',
      dataIndex: 'phoneNumber'
    },
    {
      title: usersMessages.email,
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: usersMessages.unit,
      key: 'unit',
      dataIndex: 'compactOrganizationUnits',
      render: (data: OrganizationUnitCompactDto[], record) => {
        const orgUnits = cloneDeep(data || []);
        orgUnits.reverse();
        return (
          <div className='flex gap-x-1'>
            {data?.length > 1 ? (
              <>
                {orgUnits
                  .filter((orgUnit) => orgUnit.organizationUnitId !== record.organizationUnitId)
                  .slice(1)
                  .map((orgUnit) => (
                    <div className='flex gap-x-1'>
                      <Typography.Text className='text-sm font-semibold'>{orgUnit.name}</Typography.Text>
                      <Typography.Text className='text-sm'>\</Typography.Text>
                    </div>
                  ))}
                <Typography.Text className='text-sm'>{orgUnits[orgUnits.length - 1]?.name ?? '-'}</Typography.Text>
              </>
            ) : (
              <Typography.Text className='text-sm'>{record?.organizationUnit?.name ?? '-'}</Typography.Text>
            )}
          </div>
        );
      }
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <UserActions
            user={record}
            onUpdateInfo={handleUpdateInfo}
            onUpdatePermission={handleUpdatePermission}
            onUpdateStatus={handleUpdateStatus}
            onUpdatePassword={handleChangePassword}
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
    <div className='flex flex-col gap-5 rounded-xl bg-colorBgContainer p-5'>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {usersMessages.title}
        </Typography.Title>
      </PageHeader>
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
                <Form.Item<FindType> noStyle name='statusId'>
                  <FilterOptions
                    title={usersMessages.status}
                    optionTypeId={AUTH_OPTION_TYPES.USER_STATUS}
                    service={MICROSERVICES.AUTH}
                    icon={<CheckTwoToneCircledIcon />}
                  />
                </Form.Item>
                <Form.Item<FindType> noStyle name='organizationUnitId'>
                  <FilterOrganizationUnits icon={<HierachyIcon />} organizationUnitId={values.organizationUnitId} />
                </Form.Item>
                <Form.Item<FindType> noStyle name='userGroupId'>
                  <FilterUserGroups icon={<UserGroupFilledIcon />} userGroupId={values.userGroupId} />
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
          dataSource={users || []}
          rowKey={(record) => record.userId}
          rowClassName={(record: UserDto) => twMerge('cursor-pointer', record.deletedBy ? 'disabled-row' : '')}
          onRow={(record: UserDto) => ({
            onClick: () => {
              navigate(`${ROUTE.USERS}/${record.userId}`);
            }
          })}
        />
      </div>
      <UserInfoModal
        open={open}
        userId={selectedUserId}
        onCancel={handleCloseInfoModal}
        onClose={handleCloseInfoModal}
        onCloseAndUpdatePermission={(user) => {
          handleCloseInfoModal();
          handleUpdatePermission(user);
        }}
      />
      <ChangeUserPermissionModal
        open={openPermissions}
        userId={selectedUserId}
        onCancel={handleClosePermissionModal}
        onClose={handleClosePermissionModal}
      />
      <ChangeUserPasswordModal
        open={openPassword}
        userId={selectedUserId}
        onCancel={handleClosePasswordModal}
        onClose={handleClosePasswordModal}
      />
      <ChangeUserStatusModal
        open={openStatus}
        userId={selectedUserId}
        onCancel={handleCloseStatusModal}
        onClose={handleCloseStatusModal}
      />
    </div>
  );
};

export default UsersPage;
