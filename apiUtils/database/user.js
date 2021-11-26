import query from "./index";

// Update / Insert user
async function insertUser(hostname) {
  return query(`INSERT INTO users (hostname) VALUES ($1) RETURNING *`, [hostname]).then(
    res => res.rows[0]
  )
}

// Update user username
async function updateUsername(hostname, username) {
  return query(`UPDATE users SET username = $2 WHERE hostname = $1 RETURNING *`, [hostname, username]).then(
    res => res.rows[0]
  )
}

// Update user last_active
async function updateLastActive(hostname, timestamp) {
  return query(`UPDATE users SET last_active = $2 WHERE hostname = $1 RETURNING *`, [hostname, timestamp]).then(
    res => res.rows[0]
  )
}

// Get user by hostname
async function getUserByHostname(hostname) {
  return query(`SELECT * FROM users WHERE hostname = $1`, [hostname]).then(
    res => res.rows[0]
  )
}

// Update favorite_items list
async function updateFavoriteItems(hostname, items) {
  return query(`UPDATE users SET favorite_items = $2 WHERE hostname = $1 RETURNING *`, [hostname, items]).then(
    res => res.rows[0]
  )
}

// Increment user's reports
async function incrementReports(hostname) {
  return query(`UPDATE users SET reports = reports + 1 WHERE hostname = $1 RETURNING *`, [hostname]).then(
    res => res.rows[0]
  )
}

export {
  insertUser,
  getUserByHostname,
  updateUsername,
  updateLastActive,
  updateFavoriteItems,
  incrementReports
}