import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import UserItem from './components/UserItem';
import UserModal from './components/UserModal';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from './store/actions';
import { User } from './types';
import './style.scss';

const UserList: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [localUsers, setLocalUsers] = useState<User[]>([]);
  const [modallUser, setModalUser] = useState({});

  const state = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const handrelUserCardClick = (id: number) => {
    setModalUser(localUsers?.find((user: User) => user?.id === id) ?? {});
  };

  const handrelUserDeleteClick = (id: number) => {
    setLocalUsers(users => users.filter((user: User) => user?.id !== id));
  };

  const handrelResetButtonClick = () => {
    setInputValue('');
    setLocalUsers(state.data);
  };

  useEffect(() => {
    setLocalUsers(users => users.filter((user: User) => {
      const { name, username, email } = user;
      const pattern = new RegExp(inputValue, 'i');
      return pattern.test(name + username + email);
    }));
  }, [inputValue]);

  useEffect(() => {
    setLocalUsers(state.data);
  }, [state.data]);

  useEffect(() => {
    dispatch(fetchUsersRequest());
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      dispatch(fetchUsersSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchUsersFailure(error));
    });
  }, [dispatch]);

  return (
    <div className="user-list-component">
      <h2>User List</h2>
      <div className="user-list-header">
        <input
          type="text"
          className="input-field"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handrelResetButtonClick}>Reset</button>
      </div>
      <div className="user-list">
        {localUsers.map((user: User) => (
          <div onClick={() => handrelUserCardClick(user.id)} key={user.id}>
            <UserItem user={user} onDelete={() => handrelUserDeleteClick(user.id)} />
          </div>
        ))}
      </div>
      {Object.keys(modallUser).length ? (
        <UserModal
          user={(modallUser as User)}
          onClose={() => setModalUser({})}
        />
      ) : null}
    </div>
  );
};

export default UserList;
