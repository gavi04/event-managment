const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter event Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter event Description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter event Price"],
    max: [99999999, "Price cannot exceed 8 digits"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }],
  category: {
    type: String,
    required: [true, "Please enter event Category"],
  },
  Available: {
    type: Number,
    required: [true, "Please enter event Available"],
    max: [9999, "Available cannot exceed 4 digits"],
    default: 1,
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
