const pool = require("../../db");
const queries = require("./queries");

const getTrainers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const offset = (page - 1) * size;
    const search = req.query.search || '';

    const result = await pool.query(
      "SELECT * FROM trainers WHERE name ILIKE $1 LIMIT $2 OFFSET $3",
      [`%${search}%`,size, offset]
    );
    const countResult = await pool.query("SELECT COUNT(*) FROM trainers WHERE name ILIKE $1", [`%${search}%`]);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      data: result.rows,
      total,
      page,
      size,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const addTrainer = (req, res) => {
  const { row_id, name, height, weight } = req.body;

  pool.query(
    queries.addTrainer,
    [row_id, name, height, weight],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Trainer Created Successfully!");
    }
  );
};

// const removeTrainer = (req, res) => {
//   const id = parseInt(req.params.id);
//   pool.query(queries.removeTrainer, [id], (error, results) => {
//     const noTrainerFound = !results.rows.length;
//     if (noTrainerFound) {
//       res.send("Not found in database");
//     }
//     pool.query(queries.removeTrainer, [id], (error, results) => {
//       if (error) throw error;
//       res.status(200).send("Student removed Successfully");
//     });
//   });
// };

const removeTrainer = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.removeTrainer, [id], (error, results) => {
    if (error) {
      console.error("Error executing query", error);
      return res.status(500).send("An error occurred");
    }

    if (results.rowCount === 0) {
      return res.status(404).send("Not found in database");
    }

    res.status(200).send("Trainer removed successfully");
  });
};

module.exports = {
  getTrainers,
  addTrainer,
  removeTrainer,
};
