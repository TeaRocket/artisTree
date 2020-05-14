import React from "react";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

export default function HomePage() {
  const value = useContext(UserContext);
  console.log(value);
  return (
    <div>
      <form action="/results" type="GET">
        <input name="search" type="text" />
        <button>Search</button>
      </form>
    </div>
  );
}
