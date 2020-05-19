import React, { Component } from "react";
import { UserContext } from "../../contexts/UserContext";
import moment from "moment";

export default class Availabilities extends Component {
  static contextType = UserContext;

  render() {
    const { availability } = this.context.user;
    // console.log(availability.map((a) => moment(a)));
    const availabilities = availability.map((av) => {
      return (
        <li key={av._id}>
          {av.startDate.split("T")[0]} to {av.endDate.split("T")[0]}
        </li>
      );
    });

    return (
      <div>
        <h1>Your availabilities:</h1>
        <ul id="Availabilities">{availabilities}</ul>
      </div>
    );
  }
}
