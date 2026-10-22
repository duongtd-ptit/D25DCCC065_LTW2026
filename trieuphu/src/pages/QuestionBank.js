import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

const QuestionBank = ({ questions }) => {
    const [levelFilter, setLevelFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredQuestions = questions.filter(q => {
        const matchLevel = levelFilter === 'All' || q.level === Number(levelFilter);
        const matchSearch = q.question.toLowerCase().includes(search.toLowerCase());
        return matchLevel && matchSearch;
    });

    return (
        <div>
            <h2>Ngân hàng câu hỏi</h2>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} style={{ marginRight: '10px' }}>
                <option value="All">Tất cả</option>
                <option value="1">Dễ</option>
                <option value="2">Trung bình</option>
                <option value="3">Khó</option>
            </select>
            <input type="text" placeholder="Tìm kiếm câu hỏi..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <p>Có {filteredQuestions.length} câu hỏi</p>
            <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead><tr><th>STT</th><th>Mức độ</th><th>Câu hỏi</th></tr></thead>
                <tbody>
                    {filteredQuestions.map((q, idx) => (
                        <tr key={q.id}>
                            <td>{idx + 1}</td><td>{LEVELS[q.level]}</td>
                            <td><Link to={`/questions/${q.id}`}>{q.question}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default QuestionBank;