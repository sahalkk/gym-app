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

const addMember = (req, res) => {
  const { row_id, name, age, gender, height, weight, phone_no, email } =
    req.body;
  pool.query(
    queries.addMember,
    [row_id, name, age, gender, height, weight, phone_no, email],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ message: "Member added successfully!" });
    }
  );
};

module.exports = {
  getMembers,
  addMember,
};
