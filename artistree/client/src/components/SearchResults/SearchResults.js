import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Select, Form, FormField, Box, Button } from "grommet";
import Nav from "../Nav/Nav";

export default function SearchResults() {
  const [artists, setArtists] = useState([]);
  const [formValues, setFormValues] = useState({
    category: "Dancer",
    location: "Berlin",
  });
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
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

  return (
    <>
      <Nav />
      <section>
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
