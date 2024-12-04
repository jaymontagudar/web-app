const express = require('express');
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/items');
const app = express();

require('./db');

app.set('view engine', 'ejs'); 
app.set('views', './views');

app.use(bodyParser.json());
app.use('/api/items', itemsRoutes);
app.use(express.urlencoded({ extended: true }));


app.post('/items', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  db.run(sql, [name, description], (err) => {
    if (err) {
      console.error('Error inserting item:', err.message);
      res.status(500).send('Failed to add item');
    } else {
      res.redirect('/items'); // Redirect to the list of items after adding
    }
  });
});

app.get('/items', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching items: ', err.message);
      res.status(500).send('Server Error');
    } else {
      res.render('items', { items: rows }); // Pass items to the EJS template
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
