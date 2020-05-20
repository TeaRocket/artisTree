import React from "react";
import { Link } from "react-router-dom";

const ArtworkList = (props) => {
  console.log(props);
  return (
    <div>
      {props.artworks.length > 0 && <h2>Artworks:</h2>}
      {props.artworks.map((artwork) => {
        return (
          <div key={artwork._id}>
            <Link to={`/user/${props.profileId}/artwork/${artwork._id}`}>
              <h3>{artwork.title}</h3>
              <img src={artwork.images[0]} alt="" />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ArtworkList;
