import authUser from "../../../apiUtils/authUser"
import { getSnackTypes } from "../../../apiUtils/database/snacks";

export default async function handler(req, res) {

  const profile = await authUser(req, res);
  const types = await getSnackTypes();

  res.status(200).json(types);
}
