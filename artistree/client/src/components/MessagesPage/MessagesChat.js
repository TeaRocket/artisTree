import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

export default function MessagesChat(props) {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const showMessages = () => {
    axios.get(`/messages/${props.id}`).then((result) => {
      setMessages(result.data);
    });
  };
  useEffect(() => {
    showMessages();
  }, [props.id]);

  const sendMessage = (e) => {
    e.preventDefault();
    axios.post(`/messages/${props.id}`, { message }).then((result) => {
      showMessages();
      setMessage("");
      console.log(message);
    });
  };

  return (
    <div>
      <ul>
        {messages.map((message) => {
          return (
            <li>
              <p>{message.from.username}</p>
              <p>{message.to.username}</p>
              <p>{message.text}</p>
            </li>
          );
        })}
      </ul>
      <form onSubmit={sendMessage}>
        <label htmlFor="Message">Message</label>
        <input
          value={message}
          onChange={handleChange}
          type="text"
          name="message"
          id="Message"
        />
        <button type="submit">Send</button>
        <button onClick={showMessages}>Show messages</button>{" "}
      </form>
    </div>
  );
}
