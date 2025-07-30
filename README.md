# Wanderlust

Wanderlust is a full-stack web application inspired by Airbnb, allowing users to discover, list, and review unique places to stay around the world. It is built with a modern technology stack including Node.js, Express, MongoDB, and EJS, and features a clean, responsive user interface.

This project demonstrates a comprehensive understanding of web development fundamentals, from back-end architecture and database management to front-end design and third-party API integration.

## ✨ Features

  * **User Authentication**: Secure user registration and login system using Passport.js. Users can sign up, log in, and log out to manage their activities.
  * **Listings Management (CRUD)**:
      * **Create**: Authenticated users can create new property listings with details such as title, description, price, location, and image uploads.
      * **Read**: Browse and view all listings on the homepage or see detailed information on individual listing pages.
      * **Update**: Listing owners can edit the details of their properties.
      * **Delete**: Listing owners have the ability to delete their own listings.
  * **Reviews and Ratings**:
      * Logged-in users can post reviews and provide star ratings for listings.
      * Reviews are displayed on the listing pages, showing the author and their comments.
      * Users can only delete reviews they have authored.
  * **Interactive Maps**: Each listing's location is visually represented on an interactive map using the Mapbox API, enhancing the user experience.
  * **Image Uploads**: Image uploads are handled by Multer and stored on Cloudinary, providing a robust and scalable solution for media management.
  * **Responsive Design**: The UI is fully responsive and designed to work seamlessly across various devices and screen sizes, from mobile phones to desktops.

## 🛠️ Tech Stack

This project is built with the following technologies:

  * **Backend**: Node.js, Express.js
  * **Database**: MongoDB, Mongoose (ODM)
  * **Templating Engine**: EJS (Embedded JavaScript), ejs-mate for layouts
  * **Authentication**: Passport.js, Passport-Local, Passport-Local-Mongoose
  * **File Uploads**: Multer, Cloudinary
  * **Mapping & Geocoding**: Mapbox API
  * **Styling**: Bootstrap, CSS3
  * **Data Validation**: Joi

## 🏗️ Architecture

The application is built on the **Model-View-Controller (MVC)** architectural pattern:

  * **Models**: Define the database schemas for `Listing`, `User`, and `Review` using Mongoose.
  * **Views**: EJS templates are used to render dynamic HTML pages that are sent to the client.
  * **Controllers**: Handle the application's business logic, processing incoming requests, interacting with the models, and rendering the appropriate views.
  * **Routes**: Define the application's URL endpoints and map them to the corresponding controller functions.
  * **Middleware**: Custom middleware is used for authentication, authorization, and data validation to ensure the application is secure and robust.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * Node.js and npm installed on your machine.
  * A MongoDB Atlas account or a local MongoDB installation.
  * A Cloudinary account.
  * A Mapbox account.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/airbnb_major_project.git
    cd airbnb_major_project
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables with your own credentials:
    ```env
    CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUD_API_KEY=<your_cloudinary_api_key>
    CLOUD_API_SECRET=<your_cloudinary_api_secret>
    MAP_TOKEN=<your_mapbox_api_token>
    ATLASDB_URL=<your_mongodb_atlas_connection_string>
    SECRET=<your_session_secret_key>
    ```
4.  **Initialize the database (optional):**
    To populate the database with some initial sample data, run the following command:
    ```sh
    node init/index.js
    ```
5.  **Start the server:**
    ```sh
    node app.js
    ```
    The application should now be running at `http://localhost:8080`.

## 📂 File Structure

The project has the following directory structure:

```
/
├── public/
│   ├── css/
│   └── js/
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
├── controllers/
├── models/
├── routes/
├── utils/
├── init/
├── .env
├── app.js
├── middleware.js
└── package.json
```


## 🌐 Demo

Check out the live demo of the project here:  
[Airbnb Clone Demo](https://airbnb-by-yash-shinde.onrender.com/listings)
