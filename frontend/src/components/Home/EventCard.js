import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const EventCard = ({ event}) => {
  const options = {
    value: event.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="eventCard" to={`/event/${event._id}`}>
      <img src={event.images[0].url} alt={event.name} />
      <p>{event.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="eventCardSpan">
          {" "}
          ({event.numofReviews} Reviews)
        </span>
      </div>
      <span>{`₹${event.price}`}</span>
    </Link>
  );
};

export default EventCard;