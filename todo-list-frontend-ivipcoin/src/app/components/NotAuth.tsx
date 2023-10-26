import { Grid, Link, Typography } from '@mui/material'
import React from 'react'

const NotAuth = () => {
  return (
    <Grid height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Typography>Não autenticado! Faça
        <Link href='/' underline='hover'> login </Link>
        ou
        <Link href='/CreateAccount' underline='hover' > registre-se</Link>.
      </Typography>
    </Grid>
  )
}

export default NotAuth