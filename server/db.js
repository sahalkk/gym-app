const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gym_data",
  password: "database",
  port: 5432,
});

module.exports = pool;
