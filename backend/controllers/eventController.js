
const Event=require("../models/eventModel");
const ErrorHandler=require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createEvent = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "events",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks; // Corrected key to images
  req.body.user = req.user._id; // Assuming you have req.user populated with user info

  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    event,
  });
});


// Get All Event (Admin)
exports.getAdminEvents = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).json({
    success: true,
    events,
  });
});
//getALLevents details
exports.getAllEvents= catchAsyncErrors(async(req, res,next) => {
 
    const resultPerPage=8;
    const eventsCount = await Event.countDocuments();
   const apiFeature= new ApiFeatures(Event.find(),req.query)
   .search().filter()
   let events = await apiFeature.query;

   let filteredEventsCount = events.length;
 
   apiFeature.pagination(resultPerPage);
    //const events=await Event.find();
    res.status(200).json({  success:true,events,resultPerPage,eventsCount,filteredEventsCount });
})

//get single event details
exports.getEventDetails=catchAsyncErrors(async(req,res,next) => {
    const event=await Event.findById(req.params.id);
    if(!event){
        return next(new ErrorHandler("Event not found",404));
    }
    res.status(200).json({  success:true,event });
}) 

//update event--->Admin

exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHander("Event not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < event.images.length; i++) {
      await cloudinary.v2.uploader.destroy(event.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "events",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    event,
  });
});
//delete event--->Admin
exports.deleteEvent=catchAsyncErrors(async(req,res,next)=>{
    let event=await Event.findById(req.params.id);
    if(!event){
        return next(new ErrorHandler("Event not found",404));
    }
   
     // Deleting Images From Cloudinary
  for (let i = 0; i < event.images.length; i++) {
    await cloudinary.v2.uploader.destroy(event.images[i].public_id);
  }

  event=await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"Event deleted successfully"
    })
})
// Create New Review or Update the review
exports.createEventReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, eventId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const event = await Event.findById(eventId);
  
    // Check if event exists
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }
  
    const isReviewedIndex = event.reviews.findIndex(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewedIndex !== -1) {
      // Update existing review
      event.reviews[isReviewedIndex].rating = rating;
      event.reviews[isReviewedIndex].comment = comment;
    } else {
      // Add new review
      event.reviews.push(review);
    }
  
    // Update the number of reviews
    event.numofReviews = event.reviews.length;
  
    // Calculate average rating
    let avg = 0;
    event.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    event.ratings = avg / event.reviews.length;
  
    await event.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Get All Reviews of a event
exports.getEventReviews = catchAsyncErrors(async (req, res, next) => {
    const event = await Event.findById(req.query.id);
  
    if (!event) {
      return next(new ErrorHandler("Eventnot found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: event.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const event = await Event.findById(req.query.eventId);
  
    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }
  
    const reviews = event.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Event.findByIdAndUpdate(
      req.query.eventId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
  