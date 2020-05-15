import React from "react";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import Nav from "../Nav/Nav";

export default function HomePage() {
  const value = useContext(UserContext);
  console.log(value);
  return (
    <div>
      <Nav />
      <form action="/results" type="GET">
        <input name="search" type="text" />
        <button>Search</button>
      </form>
    </div>
  );
}
