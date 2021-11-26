import authUser from "../../../apiUtils/authUser";
import { updateUsername } from "../../../apiUtils/database/user";

export default async function handler(req, res) {

  const profile = await authUser(req, res);
  const updateProfile = await updateUsername(profile.user.hostname, req.body.username);

  res.status(200).json(updateProfile);
}