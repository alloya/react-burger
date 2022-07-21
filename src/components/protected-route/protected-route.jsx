import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, refreshAccessToken, setAuth, setAuthSuccess } from '../../services/actions/auth';
import { getCookie, getRefreshToken } from '../../utils/utils';

export const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { token, isAuth } = useSelector(store => store.auth);
  const [ isUserLoaded, setUserLoaded ] = useState(false);

  const init = async () => {
    let accessToken = getCookie('token');
    let refreshToken = getRefreshToken();
    if (!accessToken && !refreshToken) {
      setUserLoaded(true);
      return;
    }
    if (!accessToken && refreshToken) {
      await dispatch(refreshAccessToken(refreshToken));
    }
    await getCookie('token') && dispatch(getUser());
    setUserLoaded(true);
    debugger
    setAuth();
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
      isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}