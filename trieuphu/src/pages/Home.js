import { useNavigate } from 'react-router-dom';
const Home = ({ playerName, setPlayerName }) => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Ai là triệu phú</h1>
            <p>Luật chơi: 15 câu hỏi, mỗi câu 30s. Mốc an toàn: 5, 10, 15.</p>
            <input type="text" placeholder="Nhập tên người chơi" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            <button disabled={!playerName} onClick={() => navigate('/play')}>Bắt đầu</button>
        </div>
    );
};
export default Home;