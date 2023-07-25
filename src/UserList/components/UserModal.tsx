import { User } from '../types';
import './userModal.scss';

interface UserModalProps {
  user: User;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = (props) => {
  return (
    <div className="user-modal">
      <div className="modal-content">
        <h2>{props.user.name}</h2>
        <p><strong>Username:</strong> {props.user.username}</p>
        <p><strong>Email:</strong> {props.user.email}</p>
        <p><strong>Address:</strong> {props.user.address.street}, {props.user.address.suite}, {props.user.address.city}, {props.user.address.zipcode}</p>
        <br />
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;
