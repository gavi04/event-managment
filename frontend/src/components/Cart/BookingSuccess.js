import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./BookingSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const BookingSuccess = () => {
  return (
    <div className="bookingSuccess">
      <CheckCircleIcon />

      <Typography>Your Bookings is almost complete wait for our response.</Typography>
      <Link to="/bookings">View Bookings</Link>
    </div>
  );
};

export default BookingSuccess;