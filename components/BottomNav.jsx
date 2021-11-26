import React from 'react'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import HomeIcon from '@mui/icons-material/HomeRounded'
import FavoriteIcon from '@mui/icons-material/FavoriteRounded'
import AccountCircleIcon from '@mui/icons-material/AccountCircleRounded'
import { useMediaQuery } from '@mui/material'

export default function BottomNav({ currentPage }) {

  let pageNumber = -1;
  switch (currentPage) {
    case 'Home':
      pageNumber = 0;
      break;
    case 'Favorites':
      pageNumber = 1;
      break;
    case 'Account':
      pageNumber = 2;
      break;
    default:
      pageNumber = -1;
  }

  const [value, setValue] = React.useState(pageNumber);
  const desktop = useMediaQuery('(min-width:600px)');

  if (desktop) {
    return (<></>);
  }

  return (
    <>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction href='/home' label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction href='/favorites' label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction href='/account' label="Account" icon={<AccountCircleIcon />} />
        </BottomNavigation>
      </Paper>
      <br />
      <br />
    </>
  )
}