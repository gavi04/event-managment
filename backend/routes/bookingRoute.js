const express=require("express");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router=express.Router();
const{newBooking, getSingleBooking, myBooking, getAllBooking, updateBooking, deleteBooking }=require("../controllers/bookingController");

router.route("/booking/new").post(isAuthenticatedUser,newBooking);
router.route("/booking/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleBooking);

router.route("/bookings/me").get(isAuthenticatedUser,myBooking);

router
  .route("/admin/bookings")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllBooking);

router
  .route("/admin/booking/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBooking)
  .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteBooking);
module.exports=router;