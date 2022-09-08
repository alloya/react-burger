import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router";
import { TAppDispatch, TRootState } from "..";
import { logout } from "../services/actions/auth";
import { IAuthState } from "../services/reducers/auth";

export const LogoutPage = () => {
  const { logoutSuccess, logoutFailed } = useSelector<TRootState, IAuthState>(store => store.auth);
  const dispatch: TAppDispatch = useDispatch();
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