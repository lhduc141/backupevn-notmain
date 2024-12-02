import { Form, List, Skeleton } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { PermissionItem, UpdatePermissionScopeModal } from 'components';
import { InfiniteScroll, InputSearch } from 'components/common';
import { usePermissionsPaging, useSearchParamsForm, useTitle } from 'hooks';
import { PermissionLayout } from 'layouts';
import { permissionsMessages } from 'messages';
import React, { useState } from 'react';
import { FindAllPermissionDto, PermissionDto } from 'types';
type FindType = Omit<FindAllPermissionDto, 'pageIndex' | 'pageSize'>;

const PermissionList: React.FC = () => {
  useTitle(permissionsMessages.page);
  const { setSearchParams, getSearchParams } = useSearchParamsForm();
  const [form] = Form.useForm<FindType>();
  const values = Form.useWatch([], form) || getSearchParams();
  const [permissionId, setPermissionId] = useState<number | undefined>();
  const [open, setOpen] = useState(false);

  const { permissions, count, pageIndex, handleChangePage, isLoading, resetPage } = usePermissionsPaging({ ...values });

  const onClickItem = (item: PermissionDto) => {
    setPermissionId(item.permissionId);
    setOpen(true);
  };

  return (
    <PermissionLayout>
      <Content className='flex h-full flex-col'>
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
          <div className='px-6 pb-5'>
            <div className='flex items-center gap-4'>
              <Form.Item<FindType> className='mb-0 max-w-[400px] flex-1' name='keyword'>
                <InputSearch placeholder={[permissionsMessages.name].join(', ')} />
              </Form.Item>
            </div>
          </div>
        </Form>

        <div className='flex-1 pb-5'>
          <InfiniteScroll
            className='px-6'
            maxHeight={'calc(100vh - 300px)'}
            hasMore={permissions.length < count}
            next={() => handleChangePage(pageIndex + 1)}
            isLoading={isLoading}
            loader={<Skeleton active={isLoading} title={false} paragraph={{ rows: 5 }} />}
          >
            <List
              className='mr-2'
              dataSource={permissions}
              rowKey={(item) => item.permissionId}
              renderItem={(item) => (
                <List.Item className='py-4'>
                  <PermissionItem data={item} onClick={onClickItem} />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Content>
      <UpdatePermissionScopeModal
        permissionId={permissionId}
        open={open}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      />
    </PermissionLayout>
  );
};

export default PermissionList;
