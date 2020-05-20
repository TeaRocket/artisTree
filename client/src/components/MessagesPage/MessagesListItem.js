import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import { Link } from "react-router-dom";

export default function MessagesListItem({ message }) {
  const { user } = useContext(UserContext);

  const linkId =
    message.from.username === user.username ? message.to._id : message.from._id;
  return (
    <li>
      <Link to={`/messages/${linkId}`}>
        <img
          src={
            message.from.username === user.username
              ? message.to.imageUrl
              : message.from.imageUrl
          }
          alt="user's picture"
          height="70"
          style={{ borderRadius: "50%" }}
        />
        <p>
          {message.from.username === user.username
            ? message.to.username
            : message.from.username}
        </p>
        <p>{message.text}</p>
      </Link>
    </li>
  );
}
