const pool = require("./pool");

async function insertUser(first_name, last_name, username, hashedPassword) {
  const insertQuery =
    "INSERT INTO users (first_name, last_name, username, password, membership_status, is_admin) VALUES ($1,$2,$3,$4, false,false) ";
  const values = [first_name, last_name, username, hashedPassword];

  await pool.query(insertQuery, values);
}

async function updateMembershipStatus(userId) {
  const updateQuery = "UPDATE users SET membership_status = true WHERE id = $1";
  const values = [userId];

  await pool.query(updateQuery, values);
}

async function insertNewMessage(title, text, userId, timestamp) {
  const insertQuery =
    "INSERT INTO messages (user_id,title,timestamp,text) VALUES ($1,$2,$3,$4)";
  const values = [userId, title, timestamp, text];

  await pool.query(insertQuery, values);
}

module.exports = {
  insertUser,
  updateMembershipStatus,
  insertNewMessage,
};
