import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { SocketContext } from "../../contexts/SocketContext";
import axios from "axios";

export default function Logout(props) {
  const { user, setUser } = useContext(UserContext);
  const { socket, setSocket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      console.log("disconnect socket io client");
      socket.emit("disconnect", { userId: user._id });
      socket.off();
      setSocket(undefined);
    }
    axios.delete("/api/auth/logout").then((response) => {
      setUser(null);
      props.history.push("/");
    });
  }, [props.history, setUser, setSocket, socket]);

  return null;
}
