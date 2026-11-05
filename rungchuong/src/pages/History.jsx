import { useState, useEffect } from 'react';

export default function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Bài 3 yêu cầu dùng key ltw_rcv_history
        const data = JSON.parse(localStorage.getItem('ltw_rcv_history') || '[]');
        // Sắp xếp trên bản sao của mảng
        const sortedData = [...data].sort((a, b) => b.score - a.score);
        setHistory(sortedData);
    }, []);

    const clearHistory = () => {
        if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử?')) {
            localStorage.removeItem('ltw_rcv_history');
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
                    <table border="1" width="100%" style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th>Hạng</th>
                                <th>Người chơi</th>
                                <th>Điểm số</th>
                                <th>Số câu đúng</th>
                                <th>Danh hiệu</th>
                                <th>Thời gian chơi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((record, index) => (
                                <tr key={record.id}>
                                    <td>{index + 1}</td>
                                    <td>{record.name}</td>
                                    <td>{record.score}</td>
                                    <td>{record.correctCount}/15</td>
                                    <td style={{ fontWeight: 'bold' }}>{record.rank}</td>
                                    <td>{record.playedAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}