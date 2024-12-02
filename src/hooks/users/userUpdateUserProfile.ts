import { message } from 'components';
import { useUpdateUserProfileMutation } from 'services';
import { UpdateProfileDto, UserDto } from 'types';
export function useUpdateUserProfile() {
  const [onUpdate, { isLoading }] = useUpdateUserProfileMutation();
  const onUpdateUserProfileHandle = (values: UpdateProfileDto, onChangeSuccess?: (value: UserDto) => void) => {
    onUpdate({
      ...values
    })
      .unwrap()
      .then((rs) => {
        message.systemSuccess(rs.message);
        onChangeSuccess?.(rs.data);
      });
  };

  return {
    onUpdateUserProfileHandle,
    isLoading
  };
}
