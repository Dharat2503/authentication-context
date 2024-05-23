
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';

const Signup = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { username, email, password } = data;
    const isSignedUp = signup(username, email, password);
    
    if (!isSignedUp) {
      setError('email', {
    
        message: 'Email already exists'
      });
    } else {
      navigate('/login');
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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ''}
            autoComplete="username"
          />
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
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0 16px' }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
