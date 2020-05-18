import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

export default class DateAdder extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      startDate: null,
      endDate: null,
    };
  }

  toggleVisibility = () => {
    this.setState({
      ...this.state,
      visibility: !this.state.visibility,
    });
  };

  makeCalEntry = () => {
    // update user in context with spreading out the old stuff
    console.log(this.state.startDate._d, this.state.endDate._d);

    this.context.setUser({
      ...this.context.user,
      availability: [
        ...this.context.user.availability,
        {
          startDate: this.state.startDate._d,
          endDate: this.state.endDate._d,
        },
      ],
    });

    const {
      displayName,
      location,
      category,
      subcategory,
      bio,
      availability,
    } = this.context.user;

    // console.log(availability);

    // put axios to backend to bring db to current level
    axios
      .put(this.context.user._id + "/profile", {
        displayName,
        location,
        category,
        subcategory,
        bio,
        availability,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    this.setState({ ...this.state, startDate: null, endDate: null });
  };

  render() {
    // console.log({ ...this.context.user });
    if (this.state.visibility) {
      return (
        <div>
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) =>
              this.setState({ startDate, endDate })
            } // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
          <br />
          <button
            onClick={
              this.state.startDate && this.state.endDate && this.makeCalEntry
            }
          >
            Submit
          </button>
          <button onClick={this.toggleVisibility}>Close</button>
        </div>
      );
    } else {
      return <button onClick={this.toggleVisibility}>Add Availability</button>;
    }
  }
}
