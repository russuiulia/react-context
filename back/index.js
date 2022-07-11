const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Meal = require('./models/meal.js');
const Order = require('./models/order.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

mongoose.connect("mongodb+srv://user1:rq9mcofLkQWP7fjV@cluster0.cw87ebp.mongodb.net/food-ordering-project?retryWrites=true&w=majority", { useNewUrlParser: true });


app.get('/meals', (req, res) => {
  Meal.find({}, (err, meals) => {
    if (err) {
      console.log(err);
    }
    res.json(meals);
  })
});
app.post('/orders', (req, res) => {
  const user = req.body.user;
  const orderedItems = req.body.orderedItems;

  const order = new Order({
    user,
    orderedItems
  });
  order.save((err, doc) => {
    if (err)
      console.log('Error during order insertion : ' + err);
  });
});
app.get('/', (req, res) => {
  res.render('index.html');
});
app.listen(port, () => { console.log(`Listening on ${port}`) });