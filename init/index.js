const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // MongoDB connection URL

// Connect to MongoDB and handle success/error
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL); // Establish connection to the MongoDB database
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "673b3eb744f8409e717ec8c5",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

// Initialize the database with sample listings
initDB();
