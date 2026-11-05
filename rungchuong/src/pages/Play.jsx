import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { POINTS, LETTERS } from '../data';

export default function Play({ questions }) {
    const location = useLocation();
    const navigate = useNavigate();
    const playerName = location.state?.playerName;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [score, setScore] = useState(0);

    // Nếu truy cập thẳng /play mà chưa có tên (không đi qua Home), đá về trang chủ
    if (!playerName) {
        return <Navigate to="/" replace />;
    }

    const currentQuestion = questions[currentIndex];

    useEffect(() => {
        if (timeLeft === 0) {
            endGame(score);
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const endGame = (finalScore) => {
        navigate('/result', {
            state: { playerName, score: finalScore, total: questions.length }
        });
    };

    const handleAnswer = (selectedIndex) => {
        if (selectedIndex === currentQuestion.answer) {
            const newScore = score + POINTS[currentQuestion.level];
            setScore(newScore);

            if (currentIndex + 1 < questions.length) {
                setCurrentIndex(prev => prev + 1);
                setTimeLeft(15); // Reset thời gian cho câu tiếp theo
            } else {
                endGame(newScore); // Chiến thắng (hết bộ câu hỏi)
            }
        } else {
            endGame(score); // Trả lời sai -> Thua cuộc
        }
    };

    if (!currentQuestion) return <div>Đang tải dữ liệu...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Người chơi: {playerName}</h3>
                <h3>Điểm: {score}</h3>
                <h3 style={{ color: 'red' }}>Thời gian: {timeLeft}s</h3>
            </div>

            <h2>Câu {currentIndex + 1}: {currentQuestion.question}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentQuestion.options.map((opt, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        style={{ padding: '10px', textAlign: 'left', cursor: 'pointer' }}
                    >
                        {LETTERS[index]}. {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}