const pool = require("../../db");
const queries = require("./queries");

const getMembers = (req, res) => {
  pool.query(queries.getMembers, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

module.exports = {
  getMembers,
};
