import { useState, useEffect } from 'react';

export default function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('rcv_history') || '[]');
        const sortedData = data.sort((a, b) => b.score - a.score);
        setHistory(sortedData);
    }, []);

    const clearHistory = () => {
        if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử?')) {
            localStorage.removeItem('rcv_history');
            setHistory([]);
        }
    };

    return (
        <div>
            <h2>Lịch sử thi đấu</h2>
            {history.length === 0 ? (
                <p>Chưa có dữ liệu thi đấu.</p>
            ) : (
                <>
                    <button onClick={clearHistory} style={{ marginBottom: '10px' }}>Xóa lịch sử</button>
                    <table border="1" width="100%" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>Hạng</th>
                                <th>Người chơi</th>
                                <th>Điểm số</th>
                                <th>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((record, index) => (
                                <tr key={record.id}>
                                    <td>{index + 1}</td>
                                    <td>{record.name}</td>
                                    <td>{record.score}</td>
                                    <td>{record.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}