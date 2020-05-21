import React, { useContext, useEffect } from "react";
import MessagesList from "./MessagesList";
import MessagesChat from "./MessagesChat";
import Nav from "../Nav/Nav";
import { UserContext } from "../../contexts/UserContext";

export default function Messages(props) {
  const id = props.match.params.id;
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user._id === id) {
      props.history.push("/messages");
    }
  }, [user._id, id]);
  return (
    <main className="messages-page container">
      <MessagesList id={id} />
      <MessagesChat id={id} />
    </main>
  );
}
