

// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import { useAuth } from '../context/AuthContext'; 

// function Nav() {
//   const { login, logout } = useAuth();
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

//   const handleLogout = () => {
//     localStorage.setItem('isLoggedIn', 'false');
//     logout(); 
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#"
//             sx={{
//               mr: 2,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             Context
//           </Typography>

//           <Box sx={{ flexGrow: 1 }}>
//             {isLoggedIn ? (
//               <Button onClick={handleLogout} sx={{ mx: 1, color: 'inherit' }}>
//                 Logout
//               </Button>
//             ) : (
//               <>
//                 <Button onClick={() => console.log("Navigate to Home")} sx={{ mx: 1, color: 'inherit' }}>
//                   Home
//                 </Button>
//                 <Button onClick={() => console.log("Navigate to Login")} sx={{ mx: 1, color: 'inherit' }}>
//                   Login
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default Nav;



import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Nav() {
  const navigate = useNavigate();
  const {  logout } = useAuth();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    logout();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Context
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            {isLoggedIn ? (
              <Button onClick={handleLogout} sx={{ mx: 1, color: 'inherit' }}>
                Logout
              </Button>
            ) : (
              <>
                <Button onClick={() => navigate('/home')} sx={{ mx: 1, color: 'inherit' }}>
                  Home
                </Button>
                <Button onClick={() => navigate('/login')} sx={{ mx: 1, color: 'inherit' }}>
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
