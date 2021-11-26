import util from 'util';
import dns from 'dns';
import { getUserByHostname, insertUser } from './database/user';
const lookup = util.promisify(dns.lookupService);

export default async function authUser(req, res) {
  return new Promise(async (resolve, reject) => {

    const ip = req.headers['x-real-ip'] || '1.1.1.1';
    const dnsResult = await lookup(ip, 80).catch(err => null);
    const name = dnsResult?.hostname.split('.dyn.wpi.edu');

    // If there is no hostname or it is not a valid hostname, 401
    if (!name || name.length <= 1) {
      return res.status(401).send('unauthorized');
    }

    // Get user by hostname
    const user = await getUserByHostname(name[0]);

    // If there is no user, create one
    if (!user) {
      const createUser = await insertUser(name[0]);

      return resolve({
        new: true,
        user: createUser
      });
    }

    return resolve({
      new: false,
      user
    });
  })
}
