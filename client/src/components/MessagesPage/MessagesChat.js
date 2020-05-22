import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import MessageSingle from "./MessageSingle";

export default function MessagesChat(props) {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const showMessages = () => {
    if (props.id) {
      axios.get(`/api/messages/${props.id}`).then((result) => {
        setMessages(result.data);
      });
    }
  };
  useEffect(() => {
    showMessages();
  }, [props.id]);

  const sendMessage = (e) => {
    e.preventDefault();
    axios.post(`/api/messages/${props.id}`, { message }).then((result) => {
      showMessages();
      setMessage("");
    });
  };
  return (
    <section className="messages-chat">
      {props.id && (
        <>
          <ul>
            {messages.map((message) => {
              return <MessageSingle message={message} user={user} />;
            })}
          </ul>
          <form onSubmit={sendMessage} className="message-form">
            <div class="message-box-container">
              <label htmlFor="Message" className="message-label">
                Message
              </label>
              <input
                className="message-input"
                value={message}
                onChange={handleChange}
                type="text"
                name="message"
                id="Message"
              />
            </div>
            <button className="message-send" type="submit">
              Send
            </button>
          </form>
        </>
      )}
    </section>
  );
}
