import { formatMoney } from '../data';

const History = ({ history, setHistory }) => {
    const totalMoney = history.reduce((sum, item) => sum + item.prize, 0);
    const highest = history.length > 0 ? Math.max(...history.map(h => h.prize)) : 0;
    const sortedHistory = [...history].sort((a, b) => b.prize - a.prize);

    return (
        <div>
            <h2>Lịch sử các lượt chơi</h2>
            <p>Số lượt chơi: {history.length}</p><p>Tiền thưởng cao nhất: {formatMoney(highest)}</p><p>Tổng tiền thưởng: {formatMoney(totalMoney)}</p>
            <button onClick={() => setHistory([])}>Xóa lịch sử</button>
            {history.length === 0 ? <p>Chưa có lượt chơi nào.</p> : (
                <table border="1" cellPadding="5" style={{ marginTop: '15px', borderCollapse: 'collapse', width: '100%' }}>
                    <thead><tr><th>Người chơi</th><th>Số câu đúng</th><th>Tiền thưởng</th><th>Thời gian</th></tr></thead>
                    <tbody>
                        {sortedHistory.map(item => (
                            <tr key={item.id}><td>{item.name}</td><td>{item.correctCount}</td><td>{formatMoney(item.prize)}</td><td>{item.playedAt}</td></tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default History;