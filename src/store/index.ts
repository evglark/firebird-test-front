import { createStore, combineReducers } from 'redux';

import { usersReducer } from '../UserList/store/reducer';

const rootReducer = combineReducers({
  users: usersReducer,
});

export const store = createStore(rootReducer);
