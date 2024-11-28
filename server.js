const express = require('express');
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/items');
const app = express();

app.use(bodyParser.json());
app.use('/api/items', itemsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
