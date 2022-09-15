import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import { TAppDispatch, TRootState } from "../store/store"

export const useAppDispatch: () => TAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector