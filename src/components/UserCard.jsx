import React from 'react';

const UserCard = ({ user, onClick }) => {
  return (
    <div className="user-card" onClick={() => onClick(user)}>
      <img src={user.avatar} alt={`${user.name}'s avatar`} />
      <h2>{user.profile.username}</h2>
      <p>Email: {user.profile.email}</p>
    </div>
  );
};

export default UserCard;