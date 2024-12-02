import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserProfilePermissionsQuery } from 'services';
import { RootState } from 'store';
import { clearUserProfilePermissions, setUserProfilePermissions } from 'store/features';
export function useUserProfilePermissions() {
  const dispatch = useDispatch();
  const { data: userProfilePermissionsRes, isLoading } = useGetUserProfilePermissionsQuery();
  const userPermissions = useSelector((state: RootState) => state.users.userProfilePermissions);
  useEffect(() => {
    if (userProfilePermissionsRes?.data) {
      dispatch(setUserProfilePermissions(userProfilePermissionsRes.data));
    } else {
      dispatch(clearUserProfilePermissions());
    }
  }, [userProfilePermissionsRes?.data]);
  return {
    userPermissions,
    isLoading
  };
}
