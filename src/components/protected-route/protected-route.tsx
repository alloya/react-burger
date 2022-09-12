import { Redirect, Route } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { checkAuth, getUser, setAuth } from '../../services/actions/auth';
import { IAuthState } from '../../services/reducers/auth';
import { TRootState, useAppDispatch } from '../..';

interface IProtectedRoute {
  children?: ReactNode
  path?: string
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useSelector<TRootState, IAuthState>(store => store.auth);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    const auth = await dispatch(checkAuth());
    if (!auth) {
      await dispatch(getUser());
    }
    setUserLoaded(true);
    dispatch(setAuth());
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