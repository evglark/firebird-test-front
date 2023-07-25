import React from 'react';

import { User } from '../types';
import './userItem.scss';

interface UserModalProps {
  user: User;
  onDelete: () => void;
}

const UserItem: React.FC<UserModalProps> = (props) => {
  const handlerClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    props.onDelete();
  };

  return (
    <div className="user-item" key={props.user.id}>
      <div><strong>Name:</strong> {props.user.name}</div>
      <div><strong>Username:</strong> {props.user.username}</div>
      <div><strong>Email:</strong> {props.user.email}</div>
      <button onClick={handlerClick}>Delete</button>
    </div>
  );
};

export default UserItem;
