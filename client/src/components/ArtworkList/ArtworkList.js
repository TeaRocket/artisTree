import React from "react";
import { Link } from "react-router-dom";

const ArtworkList = (props) => {
  return (
    <div className="artbox">
      <h2 className="art-title">Artwork:</h2>
      <div className="art">
        {props.artworks.length > 0}
        {props.artworks.map((artwork) => {
          return (
            <div className="overlaycontainer" key={artwork._id}>
              <Link to={`/user/${props.profileId}/artwork/${artwork._id}`}>
                <img
                  className="overlayartwork"
                  src={artwork.images[0]}
                  alt=""
                  height="200"
                />
                <div className="overlayart">
                  <h3 className="overlaytext">{artwork.title}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtworkList;
