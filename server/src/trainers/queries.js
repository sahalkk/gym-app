const getTrainers = "SELECT * FROM trainers";
const addTrainer =
  "INSERT INTO trainers (row_id, name, height, weight) VALUES ($1, $2, $3, $4)";
const removeTrainer = "DELETE FROM trainers WHERE row_id = $1";

module.exports = {
  getTrainers,
  addTrainer,
  removeTrainer,
};
