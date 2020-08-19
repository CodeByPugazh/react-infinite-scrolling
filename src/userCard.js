import React from "react";
const UserCard = ({ name, cell, email, thumbnail }) => {
  return (
    <div className="userCard">
      <div className="image">
        <img src={thumbnail} alt={name} />
      </div>
      <div>
        <p className="info name">{name}</p>
        <p className="info cell">{cell}</p>
        <p className="info email">{email}</p>
      </div>
    </div>
  );
};

export default UserCard;
