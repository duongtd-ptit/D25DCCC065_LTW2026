import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOPICS, LEVELS } from '../data';

export default function Questions({ questions }) {
    const [topicFilter, setTopicFilter] = useState('Tất cả');
    const [searchQuery, setSearchQuery] = useState('');

    // Lọc dữ liệu kết hợp 2 điều kiện
    const filteredQuestions = questions.filter(q => {
        const matchTopic = topicFilter === 'Tất cả' || q.topic === topicFilter;
        const matchSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
        return matchTopic && matchSearch;
    });

    return (
        <div>
            <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
                <option value="Tất cả">Tất cả</option>
                {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <input
                type="text"
                placeholder="Tìm kiếm nội dung..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <p>Có {filteredQuestions.length} câu hỏi</p>

            <table border="1">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Chủ đề</th>
                        <th>Mức độ</th>
                        <th>Câu hỏi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredQuestions.map((q, index) => (
                        <tr key={q.id}>
                            <td>{index + 1}</td>
                            <td>{q.topic}</td>
                            <td>{LEVELS[q.level]}</td>
                            <td><Link to={`/questions/${q.id}`}>{q.question}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}