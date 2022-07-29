import { getIngredientsData } from "../../utils/api";

export const TAB_SWITCH = 'TAB_SWITCH';
export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const getIngredients = () => async (dispatch) => {
  dispatch({
    type: GET_ITEMS_REQUEST
  });
  try {
    const data = await getIngredientsData();
    dispatch({
      type: GET_ITEMS_SUCCESS,
      data: data.data
    })
  } catch (error) {
    dispatch({
      type: GET_ITEMS_FAILED
    });
    console.log(error)
  }
}