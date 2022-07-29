import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router";
import { logout } from "../services/actions/auth";

export const LogoutPage = () => {
  const { logoutSuccess, logoutFailed } = useSelector(store => store.auth);
  const dispatch = useDispatch();
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