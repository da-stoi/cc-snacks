import BottomNav from '../components/BottomNav'
import TopBar from '../components/TopBar'
import RichHeader from '../components/RichHeader'
import Alerts from '../components/Alerts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, Divider } from '@mui/material'
import SnackList from '../components/SnackList'

export default function Favorites() {
  const currentPage = 'Favorites';

  const [alerts, setAlerts] = useState([]);
  const [snacks, setSnacks] = useState(null);
  const [canReport, setCanReport] = useState(false);

  // Get all snacks from api
  useEffect(() => {

    async function getSnacks() {

      const snacksReq = await axios({
        method: 'get',
        url: '/api/snacks/favorites',
      }).catch(err => {

        if (err.response.status === 401) {
          window.location.href = '/';
        }

        setAlerts([
          ...alerts,
          {
            description: 'There was an error getting snacks.',
            type: 'error'
          }
        ]);

        setSnacks([]);
      });

      if (snacksReq) {
        setSnacks(snacksReq.data.snacks);
        setCanReport(snacksReq.data.can_report);
      }

    }
    getSnacks();
  }, []);

  const handleVote = async (snackId, available) => {
    const updateSnack = await axios({
      method: 'post',
      url: `/api/snacks/reportAvailability`,
      data: {
        snack_id: snackId,
        available
      }
    }).catch(err => {
      if (err.response.status === 401) {
        window.location.href = '/';
      }

      setAlerts([
        ...alerts,
        {
          description: 'There was an error updating snack.',
          type: 'error'
        }
      ]);

    });

    if (updateSnack.data) {
      setSnacks(snacks.map(snack => {
        if (snack.item_id === snackId) {
          snack.available = updateSnack.data.available;
        }
        return snack;
      }));
    }
  }


  return (
    <div>
      <RichHeader />

      <TopBar currentPage={currentPage} />
      <Alerts localAlerts={alerts} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '15px'
      }}>
        {/* Available snacks */}
        <Typography variant="overline" component="h1">Available</Typography>
        <Divider />
        <SnackList snacks={snacks?.filter(snack => snack.available)} canReport={canReport} voteFunction={handleVote} />

        {/* Unavailable snacks */}
        <Typography variant="overline" component="h1">Unavailable</Typography>
        <Divider />
        <SnackList snacks={snacks?.filter(snack => !snack.available)} canReport={canReport} voteFunction={handleVote} />
      </div>

      <BottomNav currentPage={currentPage} />
    </div>
  )
}
