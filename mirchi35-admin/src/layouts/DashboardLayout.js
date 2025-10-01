import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Sidebar from '../components/navigation/Sidebar';
import TopBar from '../components/navigation/TopBar';

const DashboardLayout = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <TopBar />
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;