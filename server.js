//import express from 'express';
//import mongoose from 'mongoose';
const express = require('express');
const mongoose = require('mongoose');
const Cards = require('./dbCards.js');
const Cors = require('cors');
const dotenv = require('dotenv');

// App Config
const app = express();
dotenv.config();
const port = process.env.PORT || 8001;
const connection_url = process.env.NODE_ENV == 'development' ? "mongodb://localhost/tinder-clone" : `${process.env.CONNECTION_URL}`;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// API Endpoints
app.get('/',  (req, res) => res.status(200).send("Hello Tinder backend"));

app.post('/tinder/cards', (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  })
})

app.get("/tinder/cards", (req, res) => {
  Cards.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
})

//Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));