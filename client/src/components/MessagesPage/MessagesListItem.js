import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

export default function MessagesListItem({ message }) {
  const { user } = useContext(UserContext);
  const fromYou = message.from.username === user.username;
  const linkId = fromYou ? message.to._id : message.from._id;
  console.log(message);
  return (
    <li>
      <Link to={`/messages/${linkId}`}>
        <div
          className="message-profile-pic"
          style={{
            backgroundImage: `url(${
              fromYou ? message.to.imageUrl : message.from.imageUrl
            })`,
          }}
        />

        <p>{fromYou ? message.to.username : message.from.username}</p>
        <p> {fromYou ? `you: ${message.text}` : message.text}</p>
      </Link>
    </li>
  );
}
