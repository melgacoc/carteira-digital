import { EMAIL } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default: return state;
  }
};

export default user;
