import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router";
import { getUser, logout } from "../services/actions/auth";

export const LogoutPage = () => {
  const { isAuth } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout())
}, [dispatch])

  return (<Redirect to={isAuth ? '/profile' : '/'} />)
}