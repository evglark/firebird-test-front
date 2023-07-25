import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './actions';
import { User } from '../types';

interface UsersState {
  data: User[];
  loading: boolean;
  error: {} | null;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
};

export const usersReducer = (state = initialState, action: any): UsersState => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};