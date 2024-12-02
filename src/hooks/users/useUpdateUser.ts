import { message } from 'components';
import { useUpdateUserMutation } from 'services';
import { UpdateUserDto, UserDto } from 'types';
export function useUpdateUser(userId: number) {
  const [onUpdate, { isLoading }] = useUpdateUserMutation();
  const onUpdateUserHandle = (values: Omit<UpdateUserDto, 'userId'>, onChangeSuccess?: (value: UserDto) => void) => {
    onUpdate({
      userId,
      ...values
    })
      .unwrap()
      .then((rs) => {
        message.systemSuccess(rs.message);
        onChangeSuccess?.(rs.data);
      });
  };

  return {
    onUpdateUserHandle,
    isLoading
  };
}
