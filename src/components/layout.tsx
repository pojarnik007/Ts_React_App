import { Outlet } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import Navigation from './nav';

const Layout = () => {
  return (
    <>
      <Navigation />
      <main>
        <div>
          <Outlet/>
        </div>
      </main>
    </>
  );
};

export default Layout;
