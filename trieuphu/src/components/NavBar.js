import { NavLink } from 'react-router-dom';
const NavBar = () => {
    const getStyle = ({ isActive }) => isActive ? "nav-active" : "";
    return (
        <nav style={{ display: 'flex', gap: '15px', padding: '10px 0' }}>
            <NavLink to="/" end className={getStyle}>Trang chủ</NavLink>
            <NavLink to="/questions" className={getStyle}>Ngân hàng câu hỏi</NavLink>
            <NavLink to="/history" className={getStyle}>Lịch sử</NavLink>
        </nav>
    );
};
export default NavBar;