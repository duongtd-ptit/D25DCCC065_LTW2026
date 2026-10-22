import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const Home = ({ playerName, setPlayerName, history }) => {
    const navigate = useNavigate();
    const highestRecord = history?.length > 0 ? [...history].sort((a, b) => b.prize - a.prize)[0] : null;

    return (
        <div>
            <h1>Ai là triệu phú</h1>
            <p>Luật chơi: 15 câu hỏi, mỗi câu 30s. Mốc an toàn: 5, 10, 15.</p>
            {highestRecord && <p>Kỷ lục: {formatMoney(highestRecord.prize)} – {highestRecord.name}</p>}
            <input type="text" placeholder="Nhập tên người chơi" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            <button disabled={!playerName} onClick={() => navigate('/play')}>Bắt đầu</button>
        </div>
    );
};
export default Home;