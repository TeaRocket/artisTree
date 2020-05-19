import React, { Component, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import moment from "moment";

export default function SearchResults() {
  const [artists, setArtists] = useState([]);
  const [formValues, setFormValues] = useState({
    category: "Visual Artist",
    location: "",
    search: "",
  });
  const [{ startDate, endDate }, setDates] = useState({
    startDate: moment(),
    endDate: moment().add(7, "d"),
  });
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

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
  const filteredArtists = artists.filter((artist) => {
    //moment(artist.).isBetween(stardDate, endDate)

    const artistString = `${artist.displayName}_${artist.subcategory}`.toLowerCase();
    const searchMatch = artistString.includes(
      formValues.search.toLowerCase().trim()
    );
    const categoryMatch =
      formValues.category === artist.category ||
      !formValues.category ||
      (formValues.category === "Other" && searchMatch);
    const locationMatch =
      formValues.location === artist.location || !formValues.location;
    const dateMatch = artist.availability.some((range) => {
      let rangeStartDate = moment(range.startDate);
      let rangeEndDate = moment(range.endDate);
      const rangeStartDateMatch =
        rangeStartDate && rangeStartDate.isBetween(startDate, endDate);
      const rangeEndDateMatch =
        rangeEndDate && rangeEndDate.isBetween(startDate, endDate);
      const rangeMatch =
        startDate.isBetween(rangeStartDate, rangeEndDate) &&
        endDate.isBetween(rangeStartDate, rangeEndDate);
      return rangeStartDateMatch || rangeEndDateMatch || rangeMatch;
    });
    return categoryMatch && locationMatch && dateMatch;
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
          <DateRangePicker
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => {
              setDates({ startDate: startDate, endDate: endDate });
              // return endDate
              //   ? (dates = { startDate: startDate._d, endDate: endDate._d })
              //   : {};
              // console.log(startDate._d, endDate._d);
            }} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
          />
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
