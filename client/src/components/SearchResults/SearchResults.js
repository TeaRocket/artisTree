import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import moment from "moment";
import hero from "./hero.jpg";

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
    const categoriesPromise = axios.get("/api/categories");
    const locationPromise = axios.get("/api/locations");
    const resultsPromise = axios.get("/api/results");
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
    const dateMatch =
      artist.availability &&
      artist.availability.some((range) => {
        let rangeStartDate = moment(range.startDate);
        let rangeEndDate = moment(range.endDate);
        const rangeStartDateMatch =
          rangeStartDate && rangeStartDate.isBetween(startDate, endDate);
        const rangeEndDateMatch =
          rangeEndDate && rangeEndDate.isBetween(startDate, endDate);
        const rangeMatch =
          startDate &&
          startDate.isBetween(rangeStartDate, rangeEndDate) &&
          endDate &&
          endDate.isBetween(rangeStartDate, rangeEndDate);
        return rangeStartDateMatch || rangeEndDateMatch || rangeMatch;
      });
    return categoryMatch && locationMatch && dateMatch;
  });

  console.log(filteredArtists);

  return (
    <main>
      <div className="hero-container">
        <div className="hero" style={{ backgroundImage: `url(${hero})` }} />
        <div className="hero-filter">
          <h1>ArtisTree</h1>
        </div>
        <a
          href="#search"
          onClick={(e) => {
            e.preventDefault();
            window.scrollBy({
              top: window.innerHeight - window.scrollY, // could be negative value
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          <div class="arrow">
            <div class="progress"></div>
            <i></i>
          </div>
        </a>
      </div>
      <span id="search" />
      <div className="search-container">
        <h2>Search for Artists</h2>
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <div className="select-container">
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
          </div>
          {formValues.category === "Other" && (
            <div className="input-container">
              <label htmlFor="subcategory">Custom Search</label>
              <input
                type="text"
                name="search"
                id="subcategory"
                onChange={handleFormChange}
                value={formValues.search}
              />
            </div>
          )}
          <div className="select-container">
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
          </div>
          <DateRangePicker
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => {
              setDates({ startDate: startDate, endDate: endDate });
            }} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
          />
        </form>
        <ul className="filteredArtists">
          {filteredArtists.map((artist) => {
            return (
              <li key={artist._id}>
                <Link to={`/user/${artist._id}`}>
                  <div
                    className="message-profile-pic large"
                    style={{ backgroundImage: `url(${artist.imageUrl})` }}
                  />
                  <span>
                    <p className="name-artist">
                      {artist.displayName
                        ? artist.displayName
                        : artist.username}
                    </p>
                    <p>{artist.category}</p>
                    <p>{artist.subcategory}</p>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
