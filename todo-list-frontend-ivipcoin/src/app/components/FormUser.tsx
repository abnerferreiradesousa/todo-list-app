import { Alert, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { IFormUserProps } from '../types/ITask';

const FormUser = ({
  title,
  buttonText,
  handleUser,
  linkText,
  linkPath,
  errorMessage,
}: IFormUserProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    const isValidEmail = !email;
    if (isValidEmail) {
      setEmailError(true);
    }

    const isValidPassword = !password || password.length < 6;
    if (isValidPassword) {
      setPasswordError(true);
    }

    if (!isValidEmail && !isValidPassword) {
      handleUser(email, password);
    }
  };

  return (
    <Container>
      <Grid
        container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Grid
          borderRadius={2}
          bgcolor="#f5f5f5"
          paddingY={3}
          paddingX={5}
          width={380}
          height={450}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
        >
          {errorMessage && <Alert severity="info">{errorMessage}</Alert>}
          <Typography variant="h5" component="h1" textAlign="center">
            {title}
          </Typography>
          <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              autoComplete="off"
              helperText={emailError && "Email precisa estar em um formato válido!"}
              error={emailError}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              variant="outlined"
              autoComplete="off"
              type="password"
              helperText={passwordError && "Senha precisa conter no mínimo 6 caracteres!"}
              error={passwordError}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="outlined"
              size="large"
              style={{ backgroundColor: '#2196F3', color: '#fff' }}
            >
              {buttonText}
            </Button>
          </form>
          <Link underline="hover" href={linkPath}>
            {linkText}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormUser;
