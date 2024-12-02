import { Form, FormInstance, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { FormItem } from 'components/common/form-item';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useGetUserGroupDetailQuery, useUpdateUserGroupMutation } from 'services';
import { UserCompactDto } from 'types';
import UpdateUserList from './UpdateUserList';

export type UserGroupUpdateUsersFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onChangeSuccess?: () => void;
  userGroupId: number;
};

export type UserGroupUpdateUsersFormRefProps = {
  form: FormInstance<UserGroupUpdateUsersFormType>;
  isLoading: boolean;
};
export type UserGroupUpdateUsersFormType = {
  users: UserCompactDto[];
};
const UserGroupUpdateUsersForm = forwardRef<UserGroupUpdateUsersFormRefProps, UserGroupUpdateUsersFormProps>(
  ({ userGroupId, onChangeLoading, onChangeSuccess }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { data: userGroupRes, isLoading } = useGetUserGroupDetailQuery(userGroupId!, {
      skip: !userGroupId
    });
    const userGroup = userGroupRes?.data;

    const [form] = Form.useForm<UserGroupUpdateUsersFormType>();
    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateUserGroupMutation();
    const onFinish = (values: UserGroupUpdateUsersFormType) => {
      onUpdate({
        userGroupId,
        userIds: values.users.map((o) => o.userId)
      })
        .unwrap()
        .then(() => {
          onChangeSuccess?.();
        });
    };
    useEffect(() => {
      if (userGroup && userGroupId) {
        form.setFieldsValue({
          users: userGroup.users
        });
      }
    }, [userGroup?.users, userGroupId]);

    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingUpdate);
      }
    }, [onChangeLoading, isLoadingUpdate]);

    const users: UserCompactDto[] = Form.useWatch('users', form);
    const handleRemove = (record: UserCompactDto) => {
      form.setFieldValue(
        'users',
        users.filter((o) => o.userId !== record.userId)
      );
    };

    const handleAdd = (record: DefaultOptionType & UserCompactDto) => {
      form.setFieldValue('users', [
        {
          userId: record.userId,
          fullName: record.fullName,
          shortName: record.shortName,
          avatar: record.avatar
        },
        ...users.filter((o) => o.userId !== record.userId)
      ]);
    };
    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '150px'
        }}
        requiredMark={false}
        form={form}
        name='userGroupUserForm'
        onFinish={onFinish}
        layout='horizontal'
      >
        <Spin spinning={!userGroup || isLoading}>
          <FormItem<UserGroupUpdateUsersFormType> name='users' noStyle />
          <UpdateUserList
            users={users}
            onAdd={handleAdd}
            onRemove={handleRemove}
            organizationUnitId={userGroup?.organizationUnitId ? [userGroup.organizationUnitId] : []}
          />
        </Spin>
      </Form>
    );
  }
);
export default UserGroupUpdateUsersForm;
