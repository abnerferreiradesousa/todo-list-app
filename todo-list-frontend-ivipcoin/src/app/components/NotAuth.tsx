import React from 'react';
import { Grid, Link, Typography } from '@mui/material';

const NotAuth = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '97vh' }}
    >
      <Grid item>
        <Typography variant="h5" align="center">
          Você não está autenticado! Por favor, faça{' '}
          <Link href="/" color="primary" underline="hover">
            login
          </Link>{' '}
          ou{' '}
          <Link href="/CreateAccount" color="primary" underline="hover">
            registre-se
          </Link>
          .
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotAuth;
