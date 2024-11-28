const db = require('../db');

module.exports = {
  getAllItems: (req, res) => {
    db.all("SELECT * FROM items", (err, rows) => {
      if (err) {
        res.status(500).json({ message: "Error retrieving items" });
      } else {
        res.json(rows);
      }
    });
  },

  createItem: (req, res) => {
    const { name, description } = req.body;
    db.run("INSERT INTO items (name, description) VALUES (?, ?)", [name, description], function (err) {
      if (err) {
        res.status(500).json({ message: "Error adding item" });
      } else {
        res.status(201).json({ id: this.lastID, name, description });
      }
    });
  },

  updateItem: (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
    db.run("UPDATE items SET name = ?, description = ? WHERE id = ?", [name, description, id], function (err) {
      if (err) {
        res.status(500).json({ message: "Error updating item" });
      } else {
        res.json({ id, name, description });
      }
    });
  },

  patchItem: (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
    db.run("UPDATE items SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?", [name, description, id], function (err) {
      if (err) {
        res.status(500).json({ message: "Error partially updating item" });
      } else {
        res.json({ id, name, description });
      }
    });
  },

  deleteItem: (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM items WHERE id = ?", [id], function (err) {
      if (err) {
        res.status(500).json({ message: "Error deleting item" });
      } else {
        res.status(204).send();
      }
    });
  }
};
