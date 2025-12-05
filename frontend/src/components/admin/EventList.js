import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./EventList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminEvent,
 deleteEvent,
} from "../../actions/eventAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_EVENT_RESET } from "../../constants/eventConstants";

const EventList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, events} = useSelector((state) => state.events);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.event
  );

  const deleteEventHandler = (id) => {
    dispatch(deleteEvent(id));
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
      alert.success("Event Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_EVENT_RESET });
    }

    dispatch(getAdminEvent());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "Available",
      headerName: "Available",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/event/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteEventHandler(params.getValue(params.id, "id"))
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

  events &&
    events.forEach((item) => {
      rows.push({
        id: item._id,
        Available: item.Available,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL EVENTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="eventListContainer">
          <h1 id="eventListHeading">ALL Events</h1>

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

export default EventList;