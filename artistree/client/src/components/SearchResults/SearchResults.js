import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SearchResults() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get("/results").then((artists) => {
      console.log(artists);
      setArtists(artists.data);
    });
  }, []);
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <main>
        <ul>
          {artists.map((artist) => {
            return (
              <li key={artist._id}>
                <Link to={`/profile/${artist._id}`}>
                  {/* <img src={beer.image_url} alt="" height="100" /> */}
                  <p>{artist.username}</p>
                  {/* <p>{beer.tagline}</p>
              <p>{beer.contributed_by}</p> */}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
