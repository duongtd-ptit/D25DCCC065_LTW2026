import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [playerName, setPlayerName] = useState('');
    const navigate = useNavigate();

    const handleStart = (e) => {
        e.preventDefault();
        if (!playerName.trim()) {
            alert('Vui lòng nhập tên của bạn!');
            return;
        }
        // Chuyển hướng sang trang play và truyền tên người chơi
        navigate('/play', { state: { playerName } });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Chào mừng đến với Rung Chuông Vàng</h1>
            <form onSubmit={handleStart}>
                <input
                    type="text"
                    placeholder="Nhập tên của bạn..."
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    style={{ padding: '8px', fontSize: '16px' }}
                />
                <button type="submit" style={{ padding: '8px 16px', marginLeft: '10px' }}>
                    Bắt đầu chơi
                </button>
            </form>
        </div>
    );
}