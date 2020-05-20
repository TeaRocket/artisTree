import React, { useState, useEffect } from "react";
import axios from "axios";
import MessagesListItem from "./MessagesListItem";

export default function MessagesList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("wft");
    axios.get("/messages").then((result) => {
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
