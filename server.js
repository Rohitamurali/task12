require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Create a server
const server = express();
const mongoURI = process.env.mongo_url;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Assign a port number
const productschema = new mongoose.Schema({
    name: 
    {
        type:String,
        required: true}
        ,
    price: {
        type:Number,
        required: true}
  
  });
  const Item = mongoose.model('Item', productschema);
const port = 5004;

// Sample data
const items = [
  { id: 1, name: 'jeans' },
  { id: 2, name: 'shirts' },
  { id: 3, name: 'kurti' },
];

// Middleware to parse JSON
server.use(express.json());

// Root route
server.get('/', (req, res) => {
  res.end("server is running");
});

// GET /product
server.get('/product', (req, res) => {
  res.json(items);
});

// POST /product
server.post('/product', (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /product/:id
server.put('/product/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    items[itemIndex].name = req.body.name;
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ error: "Item not found in database" });
  }
});

// DELETE /product/:id
server.delete('/product/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
  } else {
    res.status(404).send('Item not found in database');
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
