import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import MessagesListItem from "./MessagesListItem";

export default function MessagesList() {
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
          return <MessagesListItem key={message._id} message={message} />;
        })}
      </ul>
    </div>
  );
}
