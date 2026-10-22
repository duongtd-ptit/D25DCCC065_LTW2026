import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { calcPrize } from '../utils';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import MoneyLadder from '../components/MoneyLadder';

const Play = ({ questions, playerName }) => {
    const navigate = useNavigate();
    const [currentQ, setCurrentQ] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [status, setStatus] = useState('answering');
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    if (!playerName) return <Navigate to="/" replace />;

    useEffect(() => {
        if (status !== 'answering') return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) { clearInterval(timer); handleGameOver('Hết giờ!'); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [status, currentQ]);

    useEffect(() => {
        if (status === 'locked') {
            const t1 = setTimeout(() => setStatus('revealed'), 1000);
            return () => clearTimeout(t1);
        }
        if (status === 'revealed') {
            const t2 = setTimeout(() => {
                const isCorrect = selectedAnswer === questions[currentQ].answer;
                if (isCorrect) {
                    if (currentQ === 14) handleGameOver('Chúc mừng! Bạn đã trở thành triệu phú');
                    else { setCurrentQ(prev => prev + 1); setTimeLeft(30); setStatus('answering'); setSelectedAnswer(null); }
                } else handleGameOver('Rất tiếc, bạn đã trả lời sai');
            }, 2000);
            return () => clearTimeout(t2);
        }
    }, [status]);

    const handleGameOver = (reason) => {
        const prize = calcPrize(currentQ, reason);
        navigate('/result', { replace: true, state: { name: playerName, prize, correctCount: currentQ, reason } });
    };

    const handleSelect = (index) => {
        if (status !== 'answering') return;
        setSelectedAnswer(index);
        setStatus('locked');
    };

    return (
        <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{ flex: 2 }}>
                <Timer timeLeft={timeLeft} />
                <QuestionCard
                    question={questions[currentQ]} qNum={currentQ + 1} status={status}
                    selectedAnswer={selectedAnswer} onSelect={handleSelect}
                />
            </div>
            <div style={{ flex: 1 }}><MoneyLadder currentQ={currentQ} /></div>
        </div>
    );
};
export default Play;