import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { useLoginMutation } from 'services';
import { setAuthenticated } from 'store/features/auth/auth.slice';
import { LoginDto } from 'types';
import { LOCAL_STORAGE_KEY } from 'utils/constants';

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const onLoginHandle = async (values: LoginDto) => {
    try {
      login(values)
        .unwrap()
        .then((res) => {
          // dispatch(setProfile(res.profile));
          dispatch(setAuthenticated(true));

          localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, res.data.accessToken);
          localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, res.data.refreshToken);
          navigate(ROUTE.HOME);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      dispatch(setAuthenticated(false));
    }
  };
  return {
    isLoading,
    error,
    onLoginHandle
  };
}
