import React, { createContext, useState } from "react";

export const SocketContext = createContext();

export default function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState();
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
}
