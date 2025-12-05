import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/Metadata";
import "./ConfirmBooking.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmBooking = ({ history }) => {
  const { bookingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.available * item.price,
    0
  );

  const bookingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + bookingCharges;

  const address = `${bookingInfo.address}, ${bookingInfo.city}, ${bookingInfo.state}, ${bookingInfo.pinCode}, ${bookingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      bookingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("bookingInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Booking" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmBookingPage">
        <div>
          <div className="confirmbookingArea">
            <Typography>Booking Info</Typography>
            <div className="confirmbookingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{bookingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Selected Events</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
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
        <div>
          <div className="bookingSummary">
            <Typography>Booking Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Booking Charges:</p>
                <span>₹{bookingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="bookingSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmBooking;