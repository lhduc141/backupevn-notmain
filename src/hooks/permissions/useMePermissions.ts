import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMePermissionsQuery } from 'services';
import { selectUserPemissionIds, setUserPermissionIds } from 'store/features';
export function useMePermissions() {
  const dispatch = useDispatch();
  const { data: meProfilePermissionsRes, isLoading } = useGetMePermissionsQuery();
  const userPermissions = useSelector(selectUserPemissionIds);
  useEffect(() => {
    if (meProfilePermissionsRes?.data) {
      dispatch(setUserPermissionIds(meProfilePermissionsRes.data));
    }
  }, [meProfilePermissionsRes?.data]);
  return {
    userPermissions,
    isLoading
  };
}
