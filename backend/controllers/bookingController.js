const Booking = require("../models/bookingModel");
const Event = require("../models/eventModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// Create new Booking
exports.newBooking = catchAsyncErrors(async (req, res, next) => {
  const {
    bookingInfo,
    bookingEvents,
    paymentInfo,
    eventsPrice,
    taxPrice,
    bookingPrice,
    totalPrice,
  } = req.body;

  const booking = await Booking.create({
    bookingInfo,
    bookingEvents,
    paymentInfo,
    eventsPrice,
    taxPrice,
    bookingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    booking,
  });
});


// get Single Booking--Admin
exports.getSingleBooking = catchAsyncErrors(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!booking) {
      return next(new ErrorHandler("Booking not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      booking,
    });
  });
  
  // get logged in user Booking
  exports.myBooking = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user._id });
  
    res.status(200).json({
      success: true,
      bookings,
    });
  });
  
  // get all Bookings -- Admin
  exports.getAllBooking = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find();
  
    let totalAmount = 0;
  
    bookings.forEach((booking) => {
      totalAmount += booking.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      bookings,
    });
  });
  
  // update Booking Status -- Admin
  exports.updateBooking = catchAsyncErrors(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);
  
    if (!booking) {
      return next(new ErrorHandler("Booking not found with this Id", 404));
    }
  
    if (booking.bookingStatus === "Booked") {
      return next(new ErrorHandler("You have already booked", 400));
    }
  
    if (req.body.status === "Booked") {
      booking.bookingEvents.forEach(async (b) => {
        await updateAvailable(b.event, b.available);
      });
    }
    booking.bookingStatus = req.body.status;
  
    if (req.body.status === "Booked") {
      booking.BookedAt = Date.now();
    }
  
    await booking.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateAvailable(id, available) {
    const event = await Event.findById(id);
  
    event.Available -= available;
  
    await event.save({ validateBeforeSave: false });
  }
  
  // delete Booking -- Admin
  exports.deleteBooking = catchAsyncErrors(async (req, res, next) => {
    const booking= await Booking.findById(req.params.id);
  
    if (!booking) {
      return next(new ErrorHandler("Booking not found with this Id", 404));
    }
    await booking.deleteOne({ _id: req.params.id });
  
    res.status(200).json({
      success: true,
    });
  });