import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MessagesList() {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages").then((result) => {
      console.log(result.data);
      setMessages(result.data);
    });
  }, [setMessages]);

  return (
    <div>
      <ul>
        {messages.map((message) => {
          const linkId =
            message.from.username === user.username
              ? message.to._id
              : message.from._id;
          return (
            <li key={message._id}>
              <Link to={`/messages/${linkId}`}>
                <p>
                  {message.from.username === user.username
                    ? message.to.username
                    : message.from.username}
                </p>
                <p>{message.text}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
