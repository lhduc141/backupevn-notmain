import { useSelector } from 'react-redux';
import { RootState } from 'store';

export function useProfile() {
  const profile = useSelector((state: RootState) => state.users.userProfile);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return { profile, isAuthenticated };
}
