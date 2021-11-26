import authUser from "../../../apiUtils/authUser";

export default async function handler(req, res) {

  const profile = await authUser(req, res);

  res.status(200).json(profile.user);
}