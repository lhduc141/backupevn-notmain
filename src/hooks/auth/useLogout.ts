import { useDispatch } from 'react-redux';
import { useInactiveShiftMutation, useLogoutMutation } from 'services';
import { LOCAL_STORAGE_KEY } from 'utils/constants';

export function useLogout() {
  const [logout, { isLoading }] = useLogoutMutation();
  const [inactiveShift, { isLoading: isLoadingInactive }] = useInactiveShiftMutation();

  const dispatch = useDispatch();

  const onLogoutHandle = async () => {
    await inactiveShift();
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (accessToken) {
      logout(accessToken);
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY.SHIFT_ACTIVE);
    dispatch({
      type: 'RESET'
    });
    window.location.href = '/';
  };
  return {
    isLoading: isLoading || isLoadingInactive,
    onLogoutHandle
  };
}
