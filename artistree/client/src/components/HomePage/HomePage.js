import React, { useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";

export default function HomePage() {
  const value = useContext(UserContext);

  return (
    <div>
      <Nav />
    </div>
  );
}
