import {
  Box,
  Card,
  Container,
  Button,
  FormControl,
  Typography,
  InputLabel,
  Input,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  IconButton,
  TextField
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { AUTH_TOKEN, USER_INFO, pb } from 'src/utils/api/auth';
import { IAuthDataResponse } from 'src/models/api/auth.interface';
import {
  IDataLoginStatus,
  useDataLoginInfo
} from 'src/stores/useDataLoginInfo';

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function LoginPage() {
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);
  const [updateLoginData] = useDataLoginInfo((state: IDataLoginStatus) => [
    state.updateLoginData
  ]);

  const navigate = useNavigate();

  // ** State
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    showPassword: false
  });

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();

      const authData = (await pb.admins.authWithPassword(
        values.username,
        values.password
      )) as IAuthDataResponse;

      if (authData) {
        localStorage.setItem(USER_INFO, JSON.stringify(authData.admin));
        localStorage.setItem(AUTH_TOKEN, authData.token);

        updateLoginData({
          data: authData.admin,
          token: authData.token
        });

        navigate('/management/category');

        update({
          message: 'Welcome to admin page',
          severity: 'success',
          open: true
        });
      } else {
        update({
          message: 'Username or Password is invalid',
          severity: 'error',
          open: true
        });
      }
    } catch (error) {
      update({
        message: error.message,
        severity: 'error',
        open: true
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
                Welcome to Admin Page
              </Typography>
              <form noValidate autoComplete="off" onSubmit={handleLogin}>
                <TextField
                  autoFocus
                  fullWidth
                  id="username"
                  label="Username"
                  sx={{ marginBottom: 4 }}
                  value={values.username}
                  onChange={handleChange('username')}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="auth-login-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    label="Password"
                    value={values.password}
                    id="auth-login-password"
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box
                  sx={{
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember Me"
                  />
                  <Link to="/">Forgot Password?</Link>
                </Box>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{ marginBottom: 7 }}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default LoginPage;
