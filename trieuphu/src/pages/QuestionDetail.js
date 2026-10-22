import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const question = questions.find(q => q.id === Number(id));

    if (!question) return <div>Không tìm thấy câu hỏi</div>;

    return (
        <div>
            <h2>Câu hỏi số {question.id} ({LEVELS[question.level]})</h2>
            <p style={{ fontWeight: 'bold' }}>{question.question}</p>
            <ul>
                {question.options.map((opt, idx) => {
                    const isCorrect = idx === question.answer;
                    return (
                        <li key={idx} style={{ backgroundColor: isCorrect ? '#4caf50' : 'transparent', color: isCorrect ? 'white' : 'black', padding: '5px', margin: '5px 0' }}>
                            {LETTERS[idx]}. {opt} {isCorrect && "(Đáp án đúng)"}
                        </li>
                    );
                })}
            </ul>
            <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
    );
};
export default QuestionDetail;