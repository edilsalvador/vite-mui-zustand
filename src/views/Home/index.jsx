import MainLayout from 'src/layouts/Main';
import { Typography } from '@mui/material';
import { useUserStore, USER_STORE } from 'src/hooks/store/useUserStore';
import { useEffect } from 'react';

const Home = () => {
  const [address, setAddress] = useUserStore().getAndSet(USER_STORE.address);

  useEffect(() => {
    if (!address) {
      setAddress('123465');
    }
  }, [address]);

  return (
    <MainLayout title="Home">
      <Typography variant="h1">Address: {address}</Typography>
    </MainLayout>
  );
};

export default Home;
