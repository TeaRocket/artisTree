import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

export default function Logout(props) {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    axios.delete("/api/auth/logout").then((response) => {
      setUser(null);
      props.history.push("/");
    });
  }, [props.history, setUser]);

  return null;
}
