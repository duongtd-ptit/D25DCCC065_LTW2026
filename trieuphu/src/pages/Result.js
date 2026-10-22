import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;
    if (!state) return <Navigate to="/" replace />;
    return (
        <div>
            <h2>{state.reason}</h2><p>Người chơi: {state.name}</p>
            <p>Số câu trả lời đúng: {state.correctCount}</p><p>Tiền thưởng: {formatMoney(state.prize)}</p>
            <button onClick={() => navigate('/play')}>Chơi lại</button><button onClick={() => navigate('/')}>Về trang chủ</button>
        </div>
    );
};
export default Result;