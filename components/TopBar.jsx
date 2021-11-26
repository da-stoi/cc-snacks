import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useMediaQuery } from '@mui/material'

export default function ButtonAppBar({ currentPage }) {

  const desktop = useMediaQuery('(min-width:600px)');

  return (
    <Box sx={{ flexGrow: 1 }} style={{ height: desktop ? "64px" : "56px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentPage}
          </Typography>
          {desktop ? (
            <>
              <Button href='../home' color="inherit">Home</Button>
              <Button href='../favorites' color="inherit">Favorites</Button>
              <Button href='../account' color="inherit">Account</Button>
            </>
          ) : <></>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}