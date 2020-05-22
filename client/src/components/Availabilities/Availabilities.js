import React, { Component } from "react";
import { UserContext } from "../../contexts/UserContext";
import moment from "moment";

export default class Availabilities extends Component {
  static contextType = UserContext;

  render() {
    const { availability } = this.context.user;
    const availabilities = availability
      ? availability.map((av) => {
          return (
            <li key={av._id}>
              {av.startDate.split("T")[0]} to {av.endDate.split("T")[0]}
            </li>
          );
        })
      : null;

    return (
      <div className="avail-div">
        <h1 className="avail-text">Availability:</h1>
        <ul id="Availabilities">{availabilities}</ul>
      </div>
    );
  }
}
