const pool = require("../../db");
const queries = require("./queries");

const getTrainers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const offset = (page - 1) * size;
    const search = req.query.search || "";

    let query = "SELECT * FROM trainers";
    let params = [];
    let paramIndex = 1;

    if (search.length) {
      query += ` WHERE name ILIKE $${paramIndex}`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(size, offset);

    console.log({ query });
    console.log({ params });

    const result = await pool.query(query, params);
    console.log(result);

    let countQuery = " SELECT COUNT(*) FROM trainers ";
    let countParams = [];
    if (search.length) {
      countQuery += "WHERE name ILIKE $1";
      countParams.push(`%${search}%`);
    }
    console.log({ countQuery });
    console.log({ countParams });

    const countResult = await pool.query(countQuery, countParams);
    console.log("Count Result:", countResult);

    const total = parseInt(countResult.rows[0].count);

    res.json({
      data: result.rows,
      total,
      page,
      size,
    });
  } catch (err) {
    console.error.message(err);
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
