<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Select, Form, FormField, Box, Button } from "grommet";
>>>>>>> cal pow
import Nav from "../Nav/Nav";

export default function SearchResults() {
  const [artists, setArtists] = useState([]);
  const [formValues, setFormValues] = useState({
<<<<<<< HEAD
    category: "Visual Artist",
    location: "",
    search: "",
=======
    category: "Dancer",
    location: "Berlin",
>>>>>>> cal pow
  });
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
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
=======
    axios.get("/categories").then((response) => {
      setCategories(response.data);
    });
    axios.get("/locations").then((response) => {
      setLocations(response.data);
    });
    axios.get("/results").then((artists) => {
      setArtists(artists.data);
    });
  }, []);

>>>>>>> cal pow
  return (
    <>
      <Nav />
      <section>
<<<<<<< HEAD
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

=======
        <Form
          value={formValues}
          onChange={(nextValue) => setFormValues(nextValue)}
          onReset={() => setFormValues({})}
          className="searchForm"
        >
          <Box direction="row" gap="medium">
            <FormField label="category">
              <Select name="category" id="category" options={categories} />
            </FormField>
            <FormField label="location">
              <Select name="location" id="location" options={locations} />
            </FormField>
          </Box>
        </Form>
      </section>
>>>>>>> cal pow
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
