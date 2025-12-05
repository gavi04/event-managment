import "./App.css";
import Header from "../src/components/layout/Header/Header";
import { useEffect, useState } from "react";
import Footer from "../src/components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";

import EventDetails from "./components/Event/EventDetails"
import Events from "./components/Event/Events"
import Search from "./components/Event/Search"
import LoginSignUp from "./components/User/LoginSignUp"
import ForgotPassword from "./components/User/ForgotPassword";
import store from "./store";
import { loadUser} from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux" 
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Booking from "./components/Cart/Booking";
import ConfirmBooking from "./components/Cart/ConfirmBooking";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import BookingSuccess from "./components/Cart/BookingSuccess";
import MyBookings from "./components/Booking/MyBookings"
import Dashboard from "./components/admin/Dashboard";
import EventList from "./components/admin/EventList";
import NewEvent from "./components/admin/NewEvent";
import bookingDetails from "./components/Booking/bookingDetails";
import UpdateEvent from "./components/admin/UpdateEvent";
import BookingList from "./components/admin/BookingList";
import ProcessBooking from "./components/admin/ProcessBooking";
import UsersList from "./components/admin/UsersLists";
import UpdateUser from "./components/admin/UpdateUser";
import EventReviews from "./components/admin/EventReviews";
import Contact from "./components/layout/Contact/Contact";
import About from "./components/layout/About/About";
import NotFound from "./components/layout/Not Found/NotFound";







function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();

  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
      <Route exact path="/" component={Home} />
        <Route exact path="/event/:id" component={EventDetails} />
        <Route exact path="/events" component={Events} />
        <Route path="/events/:keyword" component={Events} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/password/update"component={UpdatePassword}/>
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route path="/login" component={LoginSignUp} />
        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/booking" component={Booking} />
        <ProtectedRoute exact path="/booking/confirm" component={ConfirmBooking} />
        <ProtectedRoute exact path="/success" component={BookingSuccess} />
        <ProtectedRoute exact path="/bookings" component={MyBookings} />
        <ProtectedRoute exact path="/booking/:id" component={bookingDetails} />
       

        <ProtectedRoute exact path="/admin/dashboard"component={Dashboard}/>
        <ProtectedRoute exact path="/admin/events" component={EventList}/>
        <ProtectedRoute
          exact
          path="/admin/event"
          isAdmin={true}
          component={NewEvent}
        />
         <ProtectedRoute
          exact
          path="/admin/event/:id"
          isAdmin={true}
          component={UpdateEvent}
        />
        <ProtectedRoute
          exact
          path="/admin/bookings"
          isAdmin={true}
          component={BookingList}
        />
        <ProtectedRoute
          exact
          path="/admin/booking/:id"
          isAdmin={true}
          component={ProcessBooking}
        />
         <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />
         <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />
          <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={EventReviews}
        />
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
        


      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
