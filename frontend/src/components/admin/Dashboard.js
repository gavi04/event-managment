import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminEvent } from "../../actions/eventAction";
import { getAllBookings} from "../../actions/bookingAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/Metadata.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.events);

  const { bookings } = useSelector((state) => state.allBookings);

  const { users } = useSelector((state) => state.allUsers);

  let UnAvailable = 0;

  events &&
    events.forEach((item) => {
      if (item.Available === 0) {
        UnAvailable+= 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminEvent());
    dispatch(getAllBookings());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  bookings&&
   bookings.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["UnAvailable", "Available"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [UnAvailable, events.length - UnAvailable],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/events">
              <p>Event</p>
              <p>{events && events.length}</p>
            </Link>
            <Link to="/admin/bookings">
              <p>Bookings</p>
              <p>{bookings && bookings.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;