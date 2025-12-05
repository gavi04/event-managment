import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateEvent,
  getEventDetails,
} from "../../actions/eventAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_EVENT_RESET } from "../../constants/eventConstants";

const UpdateEvent= ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, event } = useSelector((state) => state.eventDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.event);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Available, setAvailable] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Educational and Academic Events",
    "Cultural and Entertainment Events",
    "Sports Events",
    "Trade Shows and Expos",
    "Networking Events",
    "Virtual and Hybrid Events",
    "Community and Public Events",
  ];

  const eventId = match.params.id;

  useEffect(() => {
    if (event && event._id !== eventId) {
      dispatch(getEventDetails(eventId));
    } else {
      setName(event.name);
      setDescription(event.description);
      setPrice(event.price);
      setCategory(event.category);
      setAvailable(event.Available);
      setOldImages(event.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Event Updated Successfully");
      history.push("/admin/events");
      dispatch({ type: UPDATE_EVENT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    eventId,
    event,
    updateError,
  ]);

  const updateEventSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Available",Available);

    images.forEach((image) => {
        myForm.append("images", image);
      });
    dispatch(updateEvent(eventId, myForm));
  };

  const updateEventImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Event" />
      <div className="dashboard">
        <SideBar />
        <div className="newEventContainer">
          <form
            className="createEventForm"
            encType="multipart/form-data"
            onSubmit={updateEventSubmitHandler}
          >
            <h1>Update Event</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Event Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Available"
                required
                onChange={(e) => setAvailable(e.target.value)}
                value={Available}
              />
            </div>

            <div id="createEventFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateEventImagesChange}
                multiple
              />
            </div>

            <div id="createEventFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Event Preview" />
                ))}
            </div>

            <div id="createEventFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Event Preview" />
              ))}
            </div>

            <Button
              id="createEventBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateEvent;