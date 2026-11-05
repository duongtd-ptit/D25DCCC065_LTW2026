import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css'; // Tự CSS màu xanh dương và gạch chân cho class .active

export default function Layout() {
    return (
        <div>
            <nav>
                <NavLink to="/" end>Trang chủ</NavLink>
                <NavLink to="/questions">Ngân hàng câu hỏi</NavLink>
                <NavLink to="/history">Lịch sử</NavLink>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}