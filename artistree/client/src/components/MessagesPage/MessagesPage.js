import React from "react";
import MessagesList from "./MessagesList";
import MessagesChat from "./MessagesChat";
import Nav from "../Nav/Nav";

export default function Messages(props) {
  const id = props.match.params.id;

  return (
    <>
      <Nav />
      <div>
        <MessagesList id={id} />
        <MessagesChat id={id} style={{ color: "red" }} />
      </div>
    </>
  );
}
