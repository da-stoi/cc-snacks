import authUser from "../../../apiUtils/authUser"
import { getSnacks } from "../../../apiUtils/database/snacks";

export default async function handler(req, res) {

  const profile = await authUser(req, res);
  const snacks = await getSnacks();

  res.status(200).json({
    can_report: profile.user.can_report,
    favorite_items: profile.user.favorite_items,
    snacks,
  })
}
