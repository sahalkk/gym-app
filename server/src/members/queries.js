const getMembers = "SELECT * FROM members";
const addMember =
  "INSERT INTO members (row_id, name, age, gender, height, weight, phone_no, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const removeMember = "DELETE FROM members WHERE row_id = $1";

module.exports = {
  getMembers,
  addMember,
  removeMember,
};
