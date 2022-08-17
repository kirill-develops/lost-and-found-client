# LOST & FOUND

### React.js app

*is an eco-system that leverages technology to build on the foundation of paying it forward!*

It's also my capstone project for BrainStation's full-stack bootcamp. We were tasked to ideate, plan, and execute a full-stack application within two weeks. Lost&Found was made using create-react-app, react-router, axios, react-burger-menu, react-select, swiper and SASS for the front end, a Node/Express backend API leveraging Passport.js & the passport-google-Oauth2 strategy for authentication, and Knex to migrate, seed and query a MySQL database. At least for now. We'll see how things change as I continue to build on it.

You can visit a live Demo [here](https://lostnfound.netlify.app/)

Below are instructions on how to install the React.js front-end app. If you
haven't already, please install the back-end Node/Express API server first.

[Click here](https://github.com/kirill-develops/lost-and-found-server) to find the repo and instruction.

 Thanks for stopping by. 💫

 -Kirill (06-04-2022)

![Screenshot of Lost&Found app](./src/assets/images/Desktop_1.png)

# Installation

 Follow these steps to run a local instance of Lost&Found:

> You'll need google App credentials and node, npm, and MySQL already installed.

#### **Set up the back-end**

1. Please goto the
   [lost-and-found-server](https://github.com/kirill-develops/lost-and-found-server) repo

#### **Set up the front-end**

2. Clone or download this repo.
3. Install client dependencies:

   > Run `npm install` from inside the client directory.
   >

   $ cd lost-and-found-client
   $ npm install
4. Set environment variables:

   > #### Rename `.env_sample` to `.env` and change placeholder `<values>` with your own.
   >

   REACT_APP_SERVER_URL=<YOUR_SERVER_ADDRESS>
5. Start the React app:

   $ npm start
