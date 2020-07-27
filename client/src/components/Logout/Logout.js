import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { SocketContext } from "../../contexts/SocketContext";
import axios from "axios";

export default function Logout(props) {
  const { user, setUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  if (socket) {
    socket.emit("leave");
  }

  useEffect(() => {
    if (user) {
      axios.delete("/api/auth/logout").then(() => {
        setUser(null);
        props.history.push("/");
      });
    }
  }, [user && user._id, props.history, setUser]);

  return null;
}
