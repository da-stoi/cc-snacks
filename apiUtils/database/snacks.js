import query from "./index";

// Get all snacks
async function getSnacks() {
  return query(`SELECT
	i.item_id,
	i.name,
	i.gluten_free,
	i.nut_free,
	i.vegan,
	i.kosher,
  i.available,
	i.type_id,
	t.name AS type_name,
	t.icon AS type_icon
FROM
	items i
	LEFT JOIN item_types t USING (type_id)`).then(
    res => res.rows
  )
}

// Update snack availability
async function updateSnackAvailability(item_id, available) {
  return query(`UPDATE items SET available = $2 WHERE item_id = $1 RETURNING *`, [item_id, available]).then(
    res => res.rows[0]
  )
}

// Get snack by id
async function getSnackById(item_id) {
  return query(`SELECT * FROM items WHERE item_id = $1`, [item_id]).then(
    res => res.rows[0]
  )
}

// Get snacks by list of ids
async function getSnacksByIds(item_ids) {
  return query(`SELECT * FROM items WHERE item_id = ANY($1)`, [item_ids]).then(
    res => res.rows
  )
}

// Get snack types
async function getSnackTypes() {
  return query(`SELECT * FROM item_types`).then(
    res => res.rows
  )
}

export {
  getSnacks,
  updateSnackAvailability,
  getSnackById,
  getSnacksByIds,
  getSnackTypes
}