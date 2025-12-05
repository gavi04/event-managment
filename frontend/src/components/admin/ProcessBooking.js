import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getBookingDetails,
  clearErrors,
  updateBooking,
} from "../../actions/bookingAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_BOOKING_RESET } from "../../constants/bookingConstants";
import "./ProcessBooking.css";

const ProcessBooking = ({ history, match }) => {
  const { booking, error, loading } = useSelector((state) => state.bookingDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.booking);

  const updateBookingSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateBooking(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Booking Updated Successfully");
      dispatch({ type: UPDATE_BOOKING_RESET });
    }

    dispatch(getBookingDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Booking" />
      <div className="dashboard">
        <SideBar />
        <div className="newEventContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmBookingPage"
              style={{
                display: booking.bookingStatus === "booked" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmbookingArea">
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
                          booking.bookingStatus && booking.bookingtatus === "Booked"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {booking.bookingStatus && booking.bookingStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Booking Events:</Typography>
                  <div className="confirmCartItemsContainer">
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
              {/*  */}
              <div
                style={{
                  display: booking.bookingStatus === "Booked" ? "none" : "block",
                }}
              >
                <form
                  className="updateBookingForm"
                  onSubmit={updateBookingSubmitHandler}
                >
                  <h1>Process Booking</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {booking.bookingStatus === "Processing" && (
                        <option value="Booked">Booked</option>
                      )}

                    </select>
                  </div>

                  <Button
                    id="createEventBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Confirm
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessBooking;