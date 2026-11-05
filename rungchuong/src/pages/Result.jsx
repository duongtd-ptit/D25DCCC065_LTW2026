import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Result() {
    const location = useLocation();
    const { playerName, score, total } = location.state || { playerName: 'Khách', score: 0, total: 15 };

    useEffect(() => {
        if (playerName) {
            const history = JSON.parse(localStorage.getItem('rcv_history') || '[]');
            const newRecord = {
                id: Date.now(),
                name: playerName,
                score: score,
                date: new Date().toLocaleString()
            };
            localStorage.setItem('rcv_history', JSON.stringify([...history, newRecord]));
        }
    }, [playerName, score]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Trò chơi kết thúc!</h2>
            <h3>Người chơi: {playerName}</h3>
            <p>Bạn đã đạt được: <strong>{score} điểm</strong></p>

            <div style={{ marginTop: '20px', gap: '10px', display: 'flex', justifyContent: 'center' }}>
                <Link to="/"><button>Chơi lại</button></Link>
                <Link to="/history"><button>Xem lịch sử</button></Link>
            </div>
        </div>
    );
}