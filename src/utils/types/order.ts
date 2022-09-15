export type TOrder = {
  readonly ingredients: string[],
  readonly name: string,
  readonly number: string,
  readonly status: 'done' | 'pending' | 'cancelled',
  readonly createdAt: string,
  readonly _id: string
}