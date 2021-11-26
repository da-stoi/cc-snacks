import authUser from "../../../apiUtils/authUser"
import { getSnackById, updateSnackAvailability } from "../../../apiUtils/database/snacks";
import { incrementReports } from "../../../apiUtils/database/user";

export default async function handler(req, res) {

  const profile = await authUser(req, res);

  const snack_id = req.body.snack_id;
  const available = req.body.available;

  if (!snack_id || (available !== true && available !== false)) {
    res.status(400).json({
      error: "Missing required parameters"
    });
    return;
  }

  // Don't do anything if the snack if already that availability
  const snack = await getSnackById(snack_id).catch(err => null);
  if (snack.available === available) {
    return res.status(200).send();
  }

  const updateSnack = await updateSnackAvailability(snack_id, available);

  res.status(200).json(updateSnack);

  incrementReports(profile.user.hostname);
}
