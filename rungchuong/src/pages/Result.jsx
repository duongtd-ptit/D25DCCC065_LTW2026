import { useLocation, Link, Navigate } from 'react-router-dom';

export default function Result() {
    const location = useLocation();

    // Tránh việc F5 (Tải lại trang) bị lỗi màn hình trắng
    if (!location.state) return <Navigate to="/" replace />;

    const { playerName, score, rank, correctCount, reason } = location.state;

    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h2 style={{ color: 'blue' }}>{reason}</h2>
            <h3>Người chơi: {playerName}</h3>
            <p>Số câu trả lời đúng: <strong>{correctCount}/15</strong></p>
            <p>Điểm: <strong>{score}</strong></p>
            <p>Danh hiệu: <strong style={{ color: 'red' }}>{rank}</strong></p>

            <div style={{ marginTop: '20px', gap: '10px', display: 'flex', justifyContent: 'center' }}>
                {/* Truyền lại tên người chơi để không phải nhập lại */}
                <Link to="/play" state={{ playerName }}><button>Chơi lại</button></Link>
                <Link to="/history"><button>Xem lịch sử</button></Link>
                <Link to="/"><button>Về trang chủ</button></Link>
            </div>
        </div>
    );
}