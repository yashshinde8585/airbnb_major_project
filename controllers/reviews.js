const Listing = require("../models/listing");
const Review = require("../models/review");

// Add a new review to a listing
module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id); // Fetch the listing by ID
  const newReview = new Review(req.body.review); // Create a new review with form data
  newReview.author = req.user._id; // Associate the review with the current user
  listing.reviews.push(newReview); // Add the review to the listing's reviews array

  await newReview.save(); // Save the review to the database
  await listing.save(); // Save the updated listing
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`); // Redirect to the listing's detail page
};

// Remove a review from a listing
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params; // Extract listing ID and review ID from request parameters

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Remove the review from the listing's reviews array
  await Review.findByIdAndDelete(reviewId); // Delete the review from the database
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`); // Redirect to the listing's detail page
};
