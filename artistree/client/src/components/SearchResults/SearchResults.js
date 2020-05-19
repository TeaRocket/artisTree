import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";

export default function SearchResults() {
  const [artists, setArtists] = useState([]);
  const [formValues, setFormValues] = useState({
    category: "Visual Artist",
    location: "",
    search: "",
  });
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const categoriesPromise = axios.get("/categories");
    const locationPromise = axios.get("/locations");
    const resultsPromise = axios.get("/results");
    Promise.all([categoriesPromise, locationPromise, resultsPromise]).then(
      ([categories, locations, results]) => {
        setCategories(categories.data);
        setLocations(locations.data);
        setArtists(results.data);
      }
    );
  }, []);
  const handleFormChange = useCallback(
    (event) => {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    },
    [formValues, setFormValues]
  );
  const filteredArtists = artists.filter((user) => {
    const userString = `${user.displayName}_${user.subcategory}`.toLowerCase();
    const search = userString.includes(formValues.search.toLowerCase().trim());
    return (
      (formValues.category === user.category ||
        !formValues.category ||
        (formValues.category === "Other" && search)) &&
      (formValues.location === user.location || !formValues.location)
    );
  });
  return (
    <>
      <Nav />
      <section>
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={handleFormChange}
            value={formValues.category}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {formValues.category === "Other" && (
            <label htmlFor="subcategory">
              Custom Search
              <input
                type="text"
                name="search"
                id="subcategory"
                onChange={handleFormChange}
                value={formValues.search}
              />
            </label>
          )}
          <label htmlFor="location">Location</label>
          <select
            name="location"
            id="location"
            onChange={handleFormChange}
            value={formValues.location}
          >
            <option value="" />
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </form>
        <ul>
          {filteredArtists.map((artist) => {
            return <li key={artist._id}>{artist.username}</li>;
          })}
        </ul>
      </section>
      {/* <main>
        <ul>
          {artists.map((artist) => {
            return (
              <li key={artist._id}>
                <Link to={`/profile/${artist._id}`}>
                  <img src={beer.image_url} alt="" height="100" />
                  <p>{artist.username}</p>
                  <p>{beer.tagline}</p>
              <p>{beer.contributed_by}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </main> */}
    </>
  );
}
