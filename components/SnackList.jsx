import React, { useEffect, useState } from 'react'
import { Skeleton, Card, Typography, ButtonGroup, Button, Divider } from '@mui/material'
import styles from '../styles/Home.module.css'
import { DoNotDisturbAltRounded, CheckCircleOutlineRounded } from '@mui/icons-material'

export default function SnackList({ snacks, canReport, voteFunction }) {

  const [width, setWidth] = useState(350);
  
  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth)
    }
  }, []);

  if (snacks) {
    return (<>
      {snacks.map(snack => (
        <Card key={snack.item_id} style={{ borderRadius: "8px", margin: '15px 0px', padding: '15px' }}>
          <div className={styles.snack}>
            <div className={styles.snackName}>
              <Typography onClick={() => window.location.href = `../snack/${snack.item_id}`} variant="h6" style={{ fontSize: `${snack.name.length > (width / 21) ? 22 / (snack.name.length / (width / 21)) : 22}px`, lineHeight: '32px', cursor: 'pointer' }}>{snack.name}</Typography>
            </div>
            {canReport &&
              <ButtonGroup variant="outlined" style={{ float: 'right', marginTop: '-34px' }}>
                <Button onClick={() => voteFunction(snack.item_id, false)}>
                  <DoNotDisturbAltRounded style={{ color: 'red' }} />
                </Button>
                <Button onClick={() => voteFunction(snack.item_id, true)}>
                  <CheckCircleOutlineRounded style={{ color: 'green' }} />
                </Button>
              </ButtonGroup>
            }
          </div>
        </Card>
      ))}
    </>)
  }

  return (<Skeleton key={0} variant="rect" width="100%" height="80px" style={{ borderRadius: "8px", margin: '15px 0px' }} />);
}