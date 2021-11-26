import authUser from "../../../apiUtils/authUser"
import { updateFavoriteItems } from "../../../apiUtils/database/user";

export default async function handler(req, res) {

  const profile = await authUser(req, res);
  let favorites = profile.user.favorite_items;
  const snack_id = req.body.snack_id;

  if (!snack_id) {
    res.status(400).json({
      error: "Missing snack_id parameter"
    });
    return;
  }

  if (favorites.includes(snack_id)) {
    favorites = favorites.filter(item => item !== snack_id);
  } else {
    favorites.push(snack_id);
  }

  const update = await updateFavoriteItems(profile.user.hostname, JSON.stringify(favorites));

  res.status(200).send();
}
