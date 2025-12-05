import React, { Fragment, useEffect } from "react";
import "./bookingDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getBookingDetails, clearErrors } from "../../actions/bookingAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const BookingDetails = ({ match }) => {
  const { booking, error, loading } = useSelector((state) => state.bookingDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getBookingDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Booking Details" />
          <div className="bookingDetailsPage">
            <div className="bookingDetailsContainer">
              <Typography component="h1">
                booking #{booking && booking._id}
              </Typography>
              <Typography>Booking Info</Typography>
              <div className="bookingDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{booking.user && booking.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {booking.bookingInfo && booking.bookingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {booking.bookingInfo &&
                      `${booking.bookingInfo.address}, ${booking.bookingInfo.city}, ${booking.bookingInfo.state}, ${booking.bookingInfo.pinCode}, ${booking.bookingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="bookingDetailsContainerBox">
                <div>
                  <p
                    className={
                      booking.paymentInfo &&
                      booking.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {booking.paymentInfo &&
                    booking.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{booking.totalPrice && booking.totalPrice}</span>
                </div>
              </div>

              <Typography>Booking Status</Typography>
              <div className="bookingDetailsContainerBox">
                <div>
                  <p
                    className={
                      booking.bookingStatus && booking.bookingStatus === "Booked"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {booking.bookingStatus && booking.bookingStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="bookingDetailsCartItems">
              <Typography>Booking Events:</Typography>
              <div className="bookingDetailsCartItemsContainer">
                {booking.bookingEvents &&
                  booking.bookingEvents.map((item) => (
                    <div key={item.event}>
                      <img src={item.image} alt="Event" />
                      <Link to={`/event/${item.event}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.available} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.available}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BookingDetails;