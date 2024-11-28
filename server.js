const express = require('express');
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/items');
const app = express();

require('./db');

app.use(bodyParser.json());
app.use('/api/items', itemsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the web app! Navigate to /items to see your items.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
