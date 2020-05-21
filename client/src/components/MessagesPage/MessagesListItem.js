import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

export default function MessagesListItem({ message }) {
  const { user } = useContext(UserContext);
  const fromYou = message.from.username === user.username;
  const linkId = fromYou ? message.to._id : message.from._id;
  const shortMessageText = message.text.substring(0, 10) + "...";
  return (
    <li>
      <Link to={`/messages/${linkId}`} className="message-preview">
        <div
          className="message-profile-pic"
          style={{
            backgroundImage: `url(${
              fromYou ? message.to.imageUrl : message.from.imageUrl
            })`,
          }}
        />
        <div className="name-and-message">
          <p className="name-from">
            {fromYou ? message.to.username : message.from.username}
          </p>
          <p>
            {fromYou ? (
              <>
                <span>you:</span> {shortMessageText}
              </>
            ) : (
              shortMessageText
            )}
          </p>
        </div>
      </Link>
    </li>
  );
}
