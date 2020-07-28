import React, { useContext, useEffect, useState } from "react";
import MessagesList from "./MessagesList";
import MessagesChat from "./MessagesChat";
import { UserContext } from "../../contexts/UserContext";
import { SocketContext } from "../../contexts/SocketContext";

export default function Messages(props) {
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const id = props.match.params.id;

  const [newMessages, setNewMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        console.log(data);
        setNewMessages([...newMessages, data.message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (user._id === id) {
      props.history.push("/messages");
    }
  }, [user._id, id, props.history]);

  return (
    <main className="messages-page container">
      <MessagesList id={id} newMessages={newMessages} />
      <MessagesChat id={id} newMessages={newMessages} />
    </main>
  );
}
