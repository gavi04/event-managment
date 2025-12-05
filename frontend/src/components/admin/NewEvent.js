import React, { Fragment, useEffect, useState } from "react";
import "./NewEvent.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createEvent } from "../../actions/eventAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
//import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewEvent = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newEvent);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Available, setAvailable] = useState(0);
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    if (error) {
      alert.error(error);
     dispatch(clearErrors());
    }

    if (success) {
      alert.success("Event Created Successfully");
      history.push("/admin/dashboard");
     // dispatch({ type: NEW_EVENT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createEventSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Available", Available);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createEvent(myForm));
  };

  const createEventImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
            onSubmit={createEventSubmitHandler}
          >
            <h1>Create Event</h1>

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
              <select onChange={(e) => setCategory(e.target.value)}>
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
              />
            </div>

            <div id="createEventFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createEventImagesChange}
                multiple
              />
            </div>

            <div id="createEventFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="EventPreview" />
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

export default NewEvent;