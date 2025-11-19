import { Outlet } from 'react-router-dom';
import Navigation from './nav';
import '../../styles.css'

const Layout = () => {
  return (
    <>
      <main>
        <div id = 'content'>
            <Outlet />
        </div>
      </main>
      <Navigation></Navigation>
    </>
  );
};

export default Layout;