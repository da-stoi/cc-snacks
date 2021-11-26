import authUser from "../../../apiUtils/authUser"
import { getSnacksByIds } from "../../../apiUtils/database/snacks";

export default async function handler(req, res) {

  const profile = await authUser(req, res);
  const snacks = await getSnacksByIds(profile.user.favorite_items);

  res.status(200).json({
    can_report: profile.user.can_report,
    snacks
  })
}
