import authUser from "../../../apiUtils/authUser"
import { getSnackById } from "../../../apiUtils/database/snacks";

export default async function handler(req, res) {
  const profile = await authUser(req, res);
  const snack = await getSnackById(req.query.snack_id).catch(err => null);

  if (!snack) {
    return res.status(404).json();
  }

  return res.status(200).json({
    ...snack,
    favorite: profile.user.favorite_items.includes(snack.item_id),
  })
}
