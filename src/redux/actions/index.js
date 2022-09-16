import apiRequest from '../../services/apiRequest';

export const EMAIL = 'EMAIL';
export const FETCH_API = 'FETCH_API';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveEmail = (email) => ({
  type: EMAIL,
  payload: email,
});

export const fetchApi = (result) => ({
  type: FETCH_API,
  payload: result,
});

export const resultApi = () => async (dispatch) => {
  const result = await apiRequest();
  dispatch(fetchApi(result));
};

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  payload: expenses,
});
