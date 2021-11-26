import BottomNav from '../components/BottomNav'
import TopBar from '../components/TopBar'
import RichHeader from '../components/RichHeader'
import Alerts from '../components/Alerts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import SnackList from '../components/SnackList'

export default function Home() {
  const currentPage = 'Home';

  const [alerts, setAlerts] = useState([]);
  const [allSnacks, setAllSnacks] = useState(null);
  const [snacks, setSnacks] = useState(null);
  const [canReport, setCanReport] = useState(false);
  const [snackTypes, setSnackTypes] = useState([]);
  const [typeFilter, setTypeFilter] = useState(null);

  // Get all snacks from api
  useEffect(() => {

    async function getSnacks() {

      const snacksReq = await axios({
        method: 'get',
        url: '/api/snacks',
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
        setAllSnacks([]);
        setSnackTypes([]);
      });

      if (snacksReq) {
        setSnacks(snacksReq.data.snacks);
        setAllSnacks(snacksReq.data.snacks);
        setSnackTypes(snacksReq.data.snack_types);
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

  const handleFilterChange = (e) => {
    setTypeFilter(e.target.value);
    if (e.target.value) {
      setSnacks(allSnacks.filter(snack => snack.type_id === e.target.value));
    } else {
      setSnacks(allSnacks);
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
        {/* Snack type dropdown */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Snack Type</InputLabel>
          <Select
            value={typeFilter}
            label="Snack Type"
            onChange={handleFilterChange}
          >
            <MenuItem value={null}>All Snacks</MenuItem>
            {snackTypes.map(type => (
              <MenuItem key={type.type_id} value={type.type_id}>{type.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />

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
