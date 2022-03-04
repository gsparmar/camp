const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');

// connect to db
try {
  mongoose.connect(
    'mongodb+srv://gadmin:12345@cluster0.ohtec.mongodb.net/campDB?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log('Database connected - Mongoose')
  );
} catch (error) {
  console.log('error');
  console.log(error);
}

const app = express();

// middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/makecampground', async (req, res) => {
  const camp = new Campground({
    title: 'my backyard',
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log(`app is listening in port 3000`);
});
