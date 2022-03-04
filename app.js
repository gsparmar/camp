const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const path = require('path');
const Campground = require('./models/campground');

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

const app = express();

// middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});

app.listen(PORT, () => {
  console.log(`app is listening in port ${PORT}`);
});
