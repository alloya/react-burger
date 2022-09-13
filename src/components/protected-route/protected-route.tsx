import { Redirect, Route, useLocation } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { checkAuth, getUser, refreshAccessToken, setAuth } from '../../services/actions/auth';
import { IAuthState } from '../../services/reducers/auth';
import { TRootState, useAppDispatch } from '../../services/store/store';
import { getCookie, getRefreshToken } from '../../utils/utils';
import { ILocationStateType } from '../app/app';

interface IProtectedRoute {
  children?: ReactNode
  path?: string
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();
  const token = getCookie('token');
  const location = useLocation<ILocationStateType>();
  const [isAuthChecked, setAuthChecked] = useState(false);
  const { isAuth } = useSelector<TRootState, IAuthState>(store => store.auth);

  const init = async () => {
    const auth = checkAuth();
    if (auth == 'refresh') {
      await dispatch(refreshAccessToken(getRefreshToken()!))
    }
    if (auth) {
      await dispatch(getUser())
    }
    setAuthChecked(true);
    dispatch(setAuth());
  }

  useEffect(() => {
    init();
  }, [])

  if (!isAuthChecked) {
    return null
  }

  return (
    <Route
      {...rest}
      render={() =>
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