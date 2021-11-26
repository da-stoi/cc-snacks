import authUser from "../../apiUtils/authUser";

export default async function handler(req, res) {

  let alerts = [];

  // Personal alerts
  const profile = await authUser(req, res);

  // If user has no username
  if (!profile.user.username) {
    alerts.push({
      type: "warning",
      description: "You have not yet set a username. Please do so in the account tab.",
    });
  }

  // If the user cannot report snack availability
  if (!profile.user.can_report) {
    alerts.push({
      type: 'error',
      description: 'You have been banned from reporting snack availability.',
    });
  }

  res.status(200).json({
    alerts: [
      ...alerts,
      // {
      //   description: 'The CC is currently closed.',
      //   type: 'error'
      // },
      // {
      //   description: `The CC will be closing in ${(Math.random() * (59 - 1) + 1).toFixed(0)} minutes.`,
      //   type: 'warning'
      // }
    ]
  })
}
