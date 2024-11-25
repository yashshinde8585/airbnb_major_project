const { query } = require("express");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Fetch and display all listings
module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  } catch (error) {
    req.flash("error", "Unable to fetch listings. Please try again.");
    res.redirect("/");
  }
};

// Render form to create a new listing
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// Display details of a specific listing
module.exports.showListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author", select: "username" },
      })
      .populate("owner", "username");

    if (!listing) {
      req.flash("error", "The listing you requested does not exist.");
      return res.redirect("/listings");
    }
    res.render("listings/show", { listing });
  } catch (error) {
    req.flash("error", "An error occurred. Please try again.");
    res.redirect("/listings");
  }
};

// Create a new listing
module.exports.createListing = async (req, res, next) => {
  try {
    const { listing } = req.body;

    // Geocode location
    let response = await geocodingClient
      .forwardGeocode({
        query: listing.location,
        limit: 1,
      })
      .send();

    if (!response.body.features || response.body.features.length === 0) {
      req.flash("error", "Invalid location. Please try again.");
      return res.redirect("/listings/new");
    }

    // Extract image details
    const { path: url, filename } = req.file || {};
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = url && filename ? { url, filename } : {};
    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
  } catch (error) {
    next(error);
  }
};

// Render form to edit an existing listing
module.exports.renderEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "The listing you requested does not exist.");
      return res.redirect("/listings");
    }

    const originalImageUrl = listing.image.url?.replace(
      "/upload",
      "/upload/h_300,w_250"
    );
    res.render("listings/edit", { listing, originalImageUrl });
  } catch (error) {
    req.flash("error", "An error occurred. Please try again.");
    res.redirect("/listings");
  }
};

// Update an existing listing
module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });

    if (req.file) {
      const { path: url, filename } = req.file;
      listing.image = { url, filename };
      await listing.save();
    }

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    req.flash("error", "An error occurred while updating the listing.");
    res.redirect(`/listings/${id}`);
  }
};

// Delete an existing listing
module.exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
  } catch (error) {
    req.flash("error", "An error occurred while deleting the listing.");
    res.redirect("/listings");
  }
};
