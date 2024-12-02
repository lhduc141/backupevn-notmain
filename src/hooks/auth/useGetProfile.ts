import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMePermissionsQuery, useGetUserProfileQuery } from 'services';
import { RootState } from 'store';
import { setAuthenticated } from 'store/features/auth/auth.slice';
import { clearUserProfile } from 'store/features/users/users.slice';
import { LOCAL_STORAGE_KEY } from 'utils';

export function useGetProfile() {
  const dispatch = useDispatch();
  const { error, isError, refetch } = useGetUserProfileQuery(undefined, {
    skip: !localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN),
    refetchOnMountOrArgChange: false
  });
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const profile = useSelector((state: RootState) => state.users.userProfile);
  const isLoading = useSelector((state: RootState) => state.users.loadingUserProfile);

  useGetMePermissionsQuery(undefined, {
    skip: !isAuthenticated
  });

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) {
      refetch();
    }

    const listener = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY.ACCESS_TOKEN) {
        if (e.newValue) {
          refetch();
        }
      } else if (!localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) {
        dispatch(clearUserProfile());
        dispatch(setAuthenticated(false));
      }
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, []);
  useEffect(() => {
    if (error) {
      dispatch(setAuthenticated(false));
      dispatch(clearUserProfile());
    }
  }, [error]);

  return {
    isLoading,
    isAuthenticated,
    isError,
    error,
    profile
  };
}
