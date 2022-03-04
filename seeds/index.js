const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// connect to db
const connectDB = () => {
  try {
    const db = mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log('connected to db - mongoose');
    });
  } catch (error) {
    console.log('error');
    console.log(error);
  }
};

connectDB();

const sample = (array) => array[Math.floor(Math.random() * array.length)];
// seed the db with random cities
const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);

    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
