import RichHeader from '../components/RichHeader'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import util from 'util'
import dns from 'dns'
const lookup = util.promisify(dns.lookupService)

export default function Index({ connected }) {
  return (
    <div className={styles.container}>
      <RichHeader />

      <main className={styles.main}>
        <h1 className={styles.title}>
          CC Snacks
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Availability Data</h2>
            <p>Data you see on CC Snacks is not 100% accurate. It all depends on what data people report.</p>
          </div>

          <div className={styles.card}>
            <h2>Reporting Accuracy</h2>
            <p>Make sure to double check what items you are marking as available or unavailable.</p>
          </div>
        </div>

        {connected ? (
          <Button size='large' variant='contained' href='/home'>Continue</Button>
        ) : (
          <Alert severity="error">You are not connected to the WPI network. Please connect to use CC Snacks.</Alert>
        )}


      </main>

      {/* <footer className={styles.footer}>
        <span>
          Made with ❤️ by <a href='https://daniel.stoiber.network'>Daniel Stoiber</a>
        </span>
      </footer> */}
    </div>
  )
}

// Figure out whether user is connected to the WPI network
export async function getServerSideProps(req) {

  const ip = req.req.headers['x-real-ip'] || '1.1.1.1';
  const dnsResult = await lookup(ip, 80).catch(err => null);
  const name = dnsResult.hostname.split('.dyn.wpi.edu');

  // Return false if they are not connected to the WPI network
  if (name.length <= 1) {
    return {
      props: {
        connected: false
      }
    }
  }

  return {
    props: {
      connected: true
    }
  }
}