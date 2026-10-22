import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
const Layout = () => (
    <div style={{ padding: '20px' }}>
        <NavBar />
        <hr />
        <Outlet />
    </div>
);
export default Layout;