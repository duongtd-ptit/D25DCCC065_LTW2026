import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, LETTERS } from '../data';

export default function QuestionDetail({ questions }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const question = questions.find(q => q.id === Number(id));

    if (!question) return <div>Không tìm thấy câu hỏi</div>;

    return (
        <div>
            <h2>Câu hỏi số {question.id} – {question.topic} ({LEVELS[question.level]}, {POINTS[question.level]} điểm)</h2>
            <p><strong>{question.question}</strong></p>

            <ul>
                {question.options.map((opt, index) => {
                    const isCorrect = index === question.answer;
                    return (
                        <li key={index} style={{ backgroundColor: isCorrect ? 'lightgreen' : 'transparent' }}>
                            {LETTERS[index]}. {opt} {isCorrect && '(Đáp án đúng)'}
                        </li>
                    );
                })}
            </ul>

            <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
    );
}