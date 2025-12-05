import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./EventList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  deleteBooking,
  getAllBookings,
  clearErrors,
} from "../../actions/bookingAction";
import { DELETE_BOOKING_RESET } from "../../constants/bookingConstants";

const BookingList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, bookings} = useSelector((state) => state.allBookings);

  const { error: deleteError, isDeleted } = useSelector((state) => state.booking);

  const deleteBookingHandler = (id) => {
    dispatch(deleteBooking(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Booking Deleted Successfully");
      history.push("/admin/bookings");
      dispatch({ type: DELETE_BOOKING_RESET });
    }

    dispatch(getAllBookings());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Booking ID", minWidth: 300, flex: 1 },

    {
      field: "Status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "Status") === "Booked"
          ? "greenColor"
          : "redColor";
      },
    },
    {
        field: "eventsSelected",
        headerName: "   No of Events",
        type: "number",
        minWidth: 150,
        flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/booking/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteBookingHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  bookings &&
    bookings.forEach((item, index) => {
      rows.push({
        eventsSelected: item.bookingEvents.length,
        id: item._id,
        Status: item.bookingStatus,
        amount: item.totalPrice,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL BOOKINGS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="eventListContainer">
          <h1 id="eventListHeading">ALL BOOKINGS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="eventListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BookingList;