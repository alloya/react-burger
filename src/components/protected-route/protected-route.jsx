import { Redirect, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, getUser, setAuth } from '../../services/actions/auth';

export const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const { isAuth } = useSelector(store => store.auth);
  const [ isUserLoaded, setUserLoaded ] = useState(false);

  const init = async () => {
    const auth = await dispatch(checkAuth());
    if (auth) {
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