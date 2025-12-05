
import React, { Fragment, useEffect, useState } from "react";
import "./Events.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getEvent } from "../../actions/eventAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/Metadata.js"
import Loader from "../layout/Loader/Loader";
import EventCard from "../Home/EventCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
const categories = [
  "Educational and Academic Events",
  "Cultural and Entertainment Events",
  "Sports Events",
  "Trade Shows and Expos",
  "Networking Events",
  "Virtual and Hybrid Events",
  "Community and Public Events",
  ];
const Events= ({ match }) => {
    const dispatch = useDispatch();
  
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
  
  
    const {
      events,
      loading,
      error,
      eventsCount,
      resultPerPage,
      filteredEventsCount, 

      
    } = useSelector((state) => state.events);
  
    const keyword = match.params.keyword;
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
      const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
    
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(getEvent(keyword,currentPage,price,category,ratings));
    }, [dispatch, keyword,currentPage,price,category,ratings,alert,error]);
    let count=filteredEventsCount; 
  
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title=" -- EVENTS" />
            <h2 className="eventsHeading">Events</h2>
  
            <div className="events">
              {events &&
                events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
            </div>
            <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
            {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={eventsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
            )}

  
          </Fragment>
        )}
      </Fragment>
    );
  };
  
  export default Events;
