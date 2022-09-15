import { TOrder } from "./order"

export type TFeedMessage = {
  orders: TOrder[],
  total: number,
  totalToday: number
}