import { useEffect } from "react";
import { Redirect } from "react-router";
import { logout } from "../services/actions/auth";
import { useAppSelector, useAppDispatch } from "../services/hooks/appHooks";

export const LogoutPage = () => {
  const { logoutSuccess, logoutFailed } = useAppSelector(store => store.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <>
      {logoutSuccess && <Redirect to='/login' />}
      {logoutFailed && <Redirect to='/profile' />}
    </>
  )
}