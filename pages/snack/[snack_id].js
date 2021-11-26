import BottomNav from '../../components/BottomNav'
import TopBar from '../../components/TopBar'
import RichHeader from '../../components/RichHeader'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import Alerts from '../../components/Alerts'
import { Skeleton, Typography, Card, Divider, Button } from '@mui/material'
import axios from 'axios'

export default function Snack({ snack_id }) {

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState('Snack');
  const [snack, setSnack] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {

    async function getSnack() {

      const snackReq = await axios({
        method: 'GET',
        url: `/api/snacks/${snack_id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(err => {

        switch (err.response.status) {
          case 401:
            router.push('/');
            return { data: {} };
          case 404:
            router.push('/404');
            return { data: {} };
          default:
            setAlerts([
              ...alerts,
              {
                description: 'There was an error getting the snack.',
                type: 'error'
              }
            ]);
            return { data: {} };
        }
      });

      setSnack(snackReq.data);
      setCurrentPage(`Snack - ${snackReq.data.name}`);

    }

    getSnack();
  }, []);

  const handleFavorite = async () => {

    setFavoriteLoading(true);
    const updateReq = await axios({
      method: 'POST',
      url: '/api/profile/favorite',
      data: {
        snack_id: snack.item_id,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).catch(err => {

      if (err.response.status === 401) {
        window.location.href = '/';
      }

      setAlerts([
        ...alerts,
        {
          description: 'There was an error favoriting the snack.',
          type: 'error'
        }
      ]);

      return { data: {} };
    });

    if (updateReq.status === 200) {
      setSnack({
        ...snack,
        favorite: !snack.favorite
      });
    }

    setFavoriteLoading(false);
  }

  return (
    <div>
      <RichHeader />

      <TopBar currentPage={currentPage} />
      <Alerts localAlerts={alerts} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '15px',
        textAlign: 'center'
      }}>
        {snack ? (
          <Card key={snack.id} style={{ borderRadius: "8px", margin: '15px 0px', padding: '15px' }}>
            <Typography variant="h4">{snack.name}</Typography>
            {(snack.gluten_free || snack.vegan || snack.nut_free || snack.kosher) && (<Divider />)}
            {snack.gluten_free && <Typography variant="overline">Gluten-free | </Typography>}
            {snack.vegan && <Typography variant="overline">Vegan | </Typography>}
            {snack.nut_free && <Typography variant="overline">Nut-free | </Typography>}
            {snack.kosher && <Typography variant="overline">Kosher | </Typography>}
            <br />
            {snack.image && (<img src={snack.image} alt={snack.name} style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', margin: '0 auto', textAlign: 'center' }} />)}
            <br />
            <Button disabled={favoriteLoading} onClick={handleFavorite} variant="contained" color="primary" style={{ margin: '15px 0px' }}>{snack.favorite ? 'Remove from Favorites' : 'Add to Favorites'}</Button>
          </Card>
        ) : <>
          <Skeleton variant='rect' width='100%' height='100px' style={{ borderRadius: '8px' }} />
        </>}
      </div>

      <BottomNav currentPage={currentPage} />
    </div>
  )
}

export async function getServerSideProps(ctx) {

  const { snack_id } = ctx.query;

  return {
    props: {
      snack_id
    }
  }
}