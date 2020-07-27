import React, { useContext, useEffect } from "react";
import MessagesList from "./MessagesList";
import MessagesChat from "./MessagesChat";
import { UserContext } from "../../contexts/UserContext";
import { SocketContext } from "../../contexts/SocketContext";

export default function Messages(props) {
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const id = props.match.params.id;

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => console.log(data));
    }
  }, [socket]);

  useEffect(() => {
    if (user._id === id) {
      props.history.push("/messages");
    }
  }, [user._id, id, props.history]);
  return (
    <main className="messages-page container">
      <MessagesList id={id} />
      <MessagesChat id={id} />
    </main>
  );
}
