

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box, Alert } from '@mui/material';

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [openSecondDialog, setOpenSecondDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleChangePassword = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);

    if (user) {
      setOpen(false);
      setOpenSecondDialog(true);
      setError('');
    } else {
      setError('Please enter a valid email address.');
    }
  };

  const handleCloseSecondDialog = () => {
    setOpenSecondDialog(false);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  const handleSubmitNewPassword = () => {
    if (newPassword === confirmPassword) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(user => 
        user.email === email ? { ...user, password: newPassword } : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      handleCloseSecondDialog();
      navigate('/login'); 
    } else {
      setPasswordError('Passwords do not match.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your password, please enter your valid email address.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange}
          />
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Second Dialog */}
      <Dialog open={openSecondDialog} onClose={handleCloseSecondDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="new-password"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <TextField
            margin="dense"
            id="confirm-password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {passwordError && <Alert severity="error">{passwordError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSecondDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitNewPassword} 
            color="primary" 
            disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ChangePassword;
