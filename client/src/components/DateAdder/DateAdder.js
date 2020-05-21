import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { UserContext } from "../../contexts/UserContext";

export default class DateAdder extends Component {
  static contextType = UserContext;

  state = {
    visibility: false,
    startDate: null,
    endDate: null,
  };

  toggleVisibility = () => {
    this.setState({
      ...this.state,
      visibility: !this.state.visibility,
    });
  };

  makeCalEntry = () => {
    this.context.updateUser({
      ...this.context.user,
      availability: [
        ...(this.context.user.availability
          ? this.context.user.availability
          : []),
        {
          startDate: this.state.startDate,
          endDate: this.state.endDate,
        },
      ],
    });
    this.setState({ ...this.state, startDate: null, endDate: null });
  };

  render() {
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
            className="button-forms"
            onClick={() => {
              if (this.state.startDate && this.state.endDate) {
                return this.makeCalEntry();
              }
              console.log("no can do, sir");
            }}
          >
            Submit
          </button>
          <button className="button-forms" onClick={this.toggleVisibility}>
            Close
          </button>
        </div>
      );
    } else {
      return (
        <>
          {this.props.allowedToEdit && (
            <button className="button-forms" onClick={this.toggleVisibility}>
              Add Availability
            </button>
          )}
        </>
      );
    }
  }
}
