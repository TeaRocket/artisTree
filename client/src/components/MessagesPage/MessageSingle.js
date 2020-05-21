import React from "react";
import { Link } from "react-router-dom";

export default function MessageSingle({ message, user }) {
  const fromYou = message.from.username === user.username;

  return (
    <li className={fromYou ? "message outgoing" : "message incoming"}>
      {!fromYou && (
        <Link to={`/user/${message.from._id}`}>
          <div
            className="message-profile-pic small"
            style={{ backgroundImage: `url(${message.from.imageUrl})` }}
          />
        </Link>
      )}
      <p>{message.text}</p>
    </li>
  );
}
