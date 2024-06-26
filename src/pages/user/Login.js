import React,{useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate , Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/home');
    }
  }, []); 

  const onSubmit = (data) => {
    const { email, password } = data;
    const user = login(email, password);
    
    if (!user) {
      setError('email', {
        message: 'Invalid email or password'
      });
      setError('password', {
        message: 'Invalid email or password'
      });
    } else {
      navigate('/home');
    }
  };
  

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i,
                message: 'Enter a valid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register('password', {
              required: 'Password is required'
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            autoComplete="current-password"
          />
           <Typography align="left">
            <Link to="/change-pass" style={{ textDecoration: 'none', color: 'inherit' }}>
              {"Forgot Password?"}
            </Link>
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0 16px' }}
          >
            Log In
          </Button>
          <Typography align="center">
            <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
              {"Don't have an account?"}
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
