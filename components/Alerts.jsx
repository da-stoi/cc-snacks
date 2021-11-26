import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle, Skeleton } from '@mui/material'
import axios from 'axios'

export default function Alerts({ localAlerts }) {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (localAlerts) {
      setAlerts([...alerts, ...localAlerts]);
    }
  }, [localAlerts]);

  useEffect(() => {

    async function getAlerts() {

      // Fetch alerts from api
      const alertsReq = await axios({
        method: 'GET',
        url: '/api/alerts',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).catch(err => {

        if (err.response.status === 401) {
          window.location.href = '/';
        }

        return {
          data: {
            alerts: [
              {
                description: 'There was an error getting alerts.',
                type: 'error'
              }
            ]
          }
        }
      });

      const newAlerts = alertsReq.data.alerts;
      setAlerts([...alerts, ...newAlerts]);
    }

    getAlerts();
  }, []);

  if (!alerts) {
    return <></>
  }

  return (
    <>
      {alerts.length >= 1 && alerts.map((alert, i) => {
        return (
          <Alert key={i} severity={alert.type}>
            {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
            {alert.description}
          </Alert>
        );
      })}
    </>);
}