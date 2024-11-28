// db.js
const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database (it will create the database file if it doesn't exist)
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Database connected successfully');
  }
});

// SQL query to create the 'items' table if it doesn't exist
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Auto-incrementing unique identifier
    name TEXT NOT NULL,                    -- Required field for the name of the item
    description TEXT,                      -- Optional field for a description
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Automatically set current timestamp
  )
`;

// Run the SQL query to create the table
db.run(createTableSQL, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table "items" is ready');
  }
});



// Export the database instance for use in other files
module.exports = db;
