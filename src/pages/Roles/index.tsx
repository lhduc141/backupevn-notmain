import { Button, Form, List, Skeleton } from 'antd';
import { PlusIcon } from 'assets';
import { RoleItem, RoleModal } from 'components';
import { InfiniteScroll, InputSearch } from 'components/common';
import { useSearchParamsForm } from 'hooks';
import { useRolesPaging } from 'hooks/roles';
import { PermissionLayout } from 'layouts';
import { messages } from 'messages';
import { rolesMessages } from 'messages/roles.messages';
import React, { useState } from 'react';
import { FindAllRoleDto, RoleDto } from 'types';
type FindType = Omit<FindAllRoleDto, 'pageIndex' | 'pageSize'>;

const RolesPage: React.FC = () => {
  const { setSearchParams, getSearchParams } = useSearchParamsForm();

  const [open, setOpen] = useState(false);
  const [roleId, setRoleId] = useState<number | undefined>();

  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();
  const { roles, count, pageIndex, handleChangePage, isLoading, resetPage } = useRolesPaging({ ...values });

  const onClickItem = (item: RoleDto) => {
    setRoleId(item.roleId);
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setRoleId(undefined);
  };

  return (
    <PermissionLayout>
      <div className='flex h-full flex-col gap-3'>
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
          <div className='rounded-b-xl bg-colorBgContainer px-6 pb-5'>
            <div className='flex items-center gap-4'>
              <Form.Item<FindType> className='mb-0 max-w-[400px] flex-1' name='keyword'>
                <InputSearch placeholder={[rolesMessages.name].join(', ')} />
              </Form.Item>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                type='primary'
                icon={<PlusIcon />}
                id='create-new-role'
                className='hidden'
              >
                {messages.createButtonText}
              </Button>
            </div>
          </div>
        </Form>

        <div className='flex-1 rounded-xl bg-colorBgContainer pb-5'>
          <InfiniteScroll
            className='px-6'
            maxHeight={'calc(100vh - 300px)'}
            hasMore={roles.length < count}
            next={() => handleChangePage(pageIndex + 1)}
            isLoading={isLoading}
            loader={<Skeleton active={isLoading} title={false} paragraph={{ rows: 5 }} />}
          >
            <List
              className='mr-2'
              dataSource={roles}
              rowKey={(item) => item.roleId}
              renderItem={(item) => (
                <List.Item className='py-4'>
                  <RoleItem data={item} onClick={onClickItem} />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
        <RoleModal open={open} roleId={roleId} onCancel={onCloseModal} onClose={onCloseModal} />
      </div>
    </PermissionLayout>
  );
};

export default RolesPage;
