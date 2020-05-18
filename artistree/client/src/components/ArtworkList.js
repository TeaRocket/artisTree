import React from "react";
import { Link } from "react-router-dom";

const ArtworkList = props => {
  return (
    <div>
      {props.artworks.length > 0 && <h2>Artworks:</h2>}
      {props.artworks.map(artwork => {
        return (
          <div key={artwork._id}>
            <Link to={`/artworks/${artwork._id}`}>
              <h3>{artwork.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ArtworkList;