const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// connect to db
try {
  mongoose.connect(
    'mongodb+srv://gadmin:12345@cluster0.ohtec.mongodb.net/campDB?retryWrites=true&w=majority',
    () => console.log('Database connected - Mongoose')
  );
} catch (error) {
  console.log('error');
  console.log(error);
}

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
