import React, { Fragment,useEffect } from "react";
import { FaArrowTurnDown } from "react-icons/fa6";
import "./Home.css";
import EventCard from "./EventCard";
import MetaData from "../layout/Metadata";
import {clearErrors,getEvent } from "../../actions/eventAction";
import {useSelector,useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,events,eventsCount}=useSelector(
        (state)=>state.events
    )

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }
        dispatch(getEvent());
      }, [dispatch,error,alert]);
    
      return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title="Event Management System" />
    
              <div className="banner">
                <p>Welcome</p>
                <h1>FIND AMAZING EVENTS BELOW</h1>
    
                <a href="#container">
                  <button>
                    Here < FaArrowTurnDown />
                  </button>
                </a>
              </div>
    
              <h2 className="homeHeading">Featured Events</h2>
    
              <div className="container" id="container">
                {events &&
                  events.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
              </div>
            </Fragment>
          )}
        </Fragment>
      );
    };
    
    export default Home;