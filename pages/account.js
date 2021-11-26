import BottomNav from '../components/BottomNav'
import TopBar from '../components/TopBar'
import RichHeader from '../components/RichHeader'
import Alerts from '../components/Alerts'
import { TextField, Typography, Divider, Skeleton, Button, Checkbox, FormGroup, FormControlLabel, FormControl } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Account() {
  const currentPage = 'Account';

  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    public_reports: false,
    public_stats: false,
    public_favorites: false,
    gluten_free: false,
    vegan: false,
    nut_free: false,
    kosher: false
  });

  useEffect(() => {

    async function getProfile() {

      const profileReq = await axios({
        method: 'get',
        url: '/api/profile',
      }).catch(err => {
        if (err.response.status === 401) {
          window.location.href = '../';
        }

        return { data: {} };
      });

      setProfile(profileReq.data);
      setUsername(profileReq.data.username);
      setCheckboxes({
        public_reports: profileReq.data.public_reports,
        public_stats: profileReq.data.public_stats,
        public_favorites: profileReq.data.public_favorites,
        gluten_free: profileReq.data.gluten_free,
        vegan: profileReq.data.vegan,
        nut_free: profileReq.data.nut_free,
        kosher: profileReq.data.kosher
      });
    }

    getProfile();
  }, []);


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCheckChange = (e) => {
    setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });
  };


  const handleUsernameUpdate = async () => {
    const updateReq = await axios({
      method: 'post',
      url: '/api/profile/username',
      data: {
        username,
      },
    }).catch(err => {
      if (err.response.status === 401) {
        window.location.href = '../';
      }
    });

    setProfile(updateReq.data);
  };

  const handleCheckboxUpdate = async () => {
    const updateReq = await axios({
      method: 'post',
      url: '/api/profile/settings',
      data: {
        username,
      },
    }).catch(err => {
      if (err.response.status === 401) {
        window.location.href = '../';
      }
    });

    setProfile(updateReq.data);
  };

  if (!profile) {
    return (
      <>
        <RichHeader />

        <TopBar currentPage={currentPage} />
        <Alerts />

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '15px'
        }}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" height='60px' />
          <br />
          <br />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" height='40px' />
          <Skeleton variant="text" width="100%" height='40px' />
          <Skeleton variant="text" width="100%" height='40px' />
          <br />
          <br />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" height='40px' />
          <Skeleton variant="text" width="100%" height='40px' />
          <Skeleton variant="text" width="100%" height='40px' />
          <Skeleton variant="text" width="100%" height='40px' />
          <br />
          <br />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" height='40px' />
          <Skeleton variant="text" width="100%" height='40px' />
        </div>

        <BottomNav currentPage={currentPage} />
      </>
    )
  }

  return (
    <>
      <RichHeader />

      <TopBar currentPage={currentPage} />
      <Alerts />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '15px'
      }}>
        <Typography variant="overline" gutterBottom>Username</Typography>
        <Divider />
        <br />
        <TextField label='Username' fullWidth value={username} onChange={handleUsernameChange} />
        {username !== profile.username && (<Button onClick={handleUsernameUpdate} variant="contained" color="primary" style={{ marginTop: '10px' }}>Update</Button>)}
        <br />
        <br />
        {/* Privacy */}
        <Typography variant="overline" gutterBottom>Privacy</Typography>
        <Divider />
        <br />
        <FormControl>
          <FormGroup>
            <FormControlLabel disabled control={<Checkbox onChange={handleCheckChange} checked={checkboxes.public_reports} name="public_reports" />} label="Public Reports" />
            <FormControlLabel disabled control={<Checkbox onChange={handleCheckChange} checked={checkboxes.public_stats} name="public_stats" />} label="Public Statistics" />
            <FormControlLabel disabled control={<Checkbox onChange={handleCheckChange} checked={checkboxes.public_favorites || false} name="public_favorites" />} label="Public Favorites" />
          </FormGroup>
        </FormControl>
        {(checkboxes.public_reports !== profile.public_reports || checkboxes.public_stats !== profile.public_stats || checkboxes.public_favorites !== profile.public_favorites) && (
          <>
            <br />
            <Button onClick={handleCheckboxUpdate} variant="contained" color="primary" style={{ marginTop: '10px' }}>Update</Button>
          </>
        )}
        <br />
        <br />
        {/* Dietary Restrictions */}
        <Typography variant="overline" gutterBottom>Dietary Restrictions</Typography>
        <Divider />
        <br />
        <FormControl>
          <FormGroup>
            <FormControlLabel disabled control={<Checkbox onChange={handleCheckChange} checked={checkboxes.gluten_free} name="gluten_free" />} label="Gluten-Free" />
            <FormControlLabel disabled control={<Checkbox onChange={handleCheckChange} checked={checkboxes.vegan} name="vegan" />} label="Vegan" />
            <FormControlLabel disabled control={<Checkbox onChange={handleCheckChange} checked={checkboxes.nut_free} name="nut_free" />} label="Nut-Free" />
            <FormControlLabel disabled control={<Checkbox onChange={handleCheckChange} checked={checkboxes.kosher} name="kosher" />} label="Kosher" />
          </FormGroup>
        </FormControl>
        {(checkboxes.gluten_free !== profile.gluten_free || checkboxes.vegan !== profile.vegan || checkboxes.nut_free !== profile.nut_free || checkboxes.kosher !== profile.kosher) && (
          <>
            <br />
            <Button onClick={handleCheckboxUpdate} variant="contained" color="primary" style={{ marginTop: '10px' }}>Update</Button>
          </>
        )}
        <br />
        <br />
        {/* Stats */}
        <Typography variant="overline" gutterBottom>Statistics</Typography>
        <Divider />
        <br />
        <Typography variant="h6">{profile.favorite_items.length} favorite snacks.</Typography>
        <Typography variant="h6">{profile.reports} snacks reported.</Typography>
        <br />
        <br />

      </div>

      <BottomNav currentPage={currentPage} />
    </>
  )
}
