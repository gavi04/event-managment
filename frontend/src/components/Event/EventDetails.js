import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./EventDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getEventDetails,
   newReview,
} from "../../actions/eventAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/Metadata.js";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/eventConstants";

const EventDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { event, loading, error } = useSelector(
    (state) => state.eventDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: event.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [available, setAvailable] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseAvailable = () => {
    if (event.Available <= available) return;

    const qty = available + 1;
    setAvailable(qty);
  };

  const decreaseAvailable = () => {
    if (1 >= available) return;

    const qty = available - 1;
    setAvailable(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, available));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("eventId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getEventDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${event.name} -- Event`} />
          <div className="EventDetails">
            <div>
              <Carousel>
                {event.images &&
                  event.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{event.name}</h2>
                <p>Event # {event._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({event.numofReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${event.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseAvailable}>-</button>
                    <input readOnly type="number" value={available} />
                    <button onClick={increaseAvailable}>+</button>
                  </div>
                  <button
                    disabled={event.Available < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add for Booking
                  </button>
                </div>

                <p>
                  Status:&nbsp; 
                <b className={event.Available < 1 ? "redColor" : "greenColor"}>
                    {event.Available < 1 ? "Unavailable" : "Available"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{event.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {event.reviews && event.reviews[0] ? (
            <div className="reviews">
              {event.reviews &&
                event.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default EventDetails;