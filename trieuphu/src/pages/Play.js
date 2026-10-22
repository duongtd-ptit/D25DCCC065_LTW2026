import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { calcPrize } from '../utils';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import Lifelines from '../components/Lifelines';
import AudienceChart from '../components/AudienceChart';
import MoneyLadder from '../components/MoneyLadder';

const Play = ({ questions, playerName, setHistory }) => {
    const navigate = useNavigate();
    const [currentQ, setCurrentQ] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [status, setStatus] = useState('answering');
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [used5050, setUsed5050] = useState(false);
    const [usedAudience, setUsedAudience] = useState(false);
    const [hiddenOptions, setHiddenOptions] = useState([]);
    const [audienceData, setAudienceData] = useState(null);

    useEffect(() => {
        document.title = `Câu ${currentQ + 1}/15 – ${playerName}`;
        return () => { document.title = 'Ai là triệu phú'; };
    }, [currentQ, playerName]);

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
                    else {
                        setCurrentQ(prev => prev + 1); setTimeLeft(30); setStatus('answering');
                        setSelectedAnswer(null); setHiddenOptions([]); setAudienceData(null);
                    }
                } else handleGameOver('Rất tiếc, bạn đã trả lời sai');
            }, 2000);
            return () => clearTimeout(t2);
        }
    }, [status]);

    useEffect(() => {
        const handleKey = (e) => {
            if (status !== 'answering') return;
            const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
            const index = keyMap[e.key.toUpperCase()];
            if (index !== undefined && !hiddenOptions.includes(index)) handleSelect(index);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [status, hiddenOptions]);

    const handleSelect = (index) => {
        if (status !== 'answering' || hiddenOptions.includes(index)) return;
        setSelectedAnswer(index); setStatus('locked');
    };

    const handleGameOver = (reason) => {
        const prize = calcPrize(currentQ, reason);
        const newRecord = { id: Date.now(), name: playerName, prize, correctCount: currentQ, playedAt: new Date().toLocaleString("vi-VN") };
        setHistory(prev => [...prev, newRecord]);
        navigate('/result', { replace: true, state: { name: playerName, prize, correctCount: currentQ, reason } });
    };

    const handle5050 = () => {
        if (used5050) return;
        setUsed5050(true);
        const correctAns = questions[currentQ].answer;
        let wrongs = [0, 1, 2, 3].filter(i => i !== correctAns).sort(() => Math.random() - 0.5);
        setHiddenOptions([wrongs[0], wrongs[1]]);
    };

    const handleAudience = () => {
        if (usedAudience) return;
        setUsedAudience(true);
        const correctAns = questions[currentQ].answer;
        let data = [0, 0, 0, 0];
        const correctPercent = Math.floor(Math.random() * 31) + 40;
        data[correctAns] = correctPercent;
        let remaining = 100 - correctPercent;
        const availableWrongs = [0, 1, 2, 3].filter(i => i !== correctAns && !hiddenOptions.includes(i));
        availableWrongs.forEach((idx, i) => {
            if (i === availableWrongs.length - 1) data[idx] = remaining;
            else { const share = Math.floor(Math.random() * (remaining + 1)); data[idx] = share; remaining -= share; }
        });
        setAudienceData(data);
    };

    if (!playerName) return <Navigate to="/" replace />;

    return (
        <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{ flex: 2 }}>
                <Timer timeLeft={timeLeft} />
                <QuestionCard
                    question={questions[currentQ]} qNum={currentQ + 1} status={status}
                    selectedAnswer={selectedAnswer} hiddenOptions={hiddenOptions} onSelect={handleSelect}
                />
                <Lifelines used5050={used5050} on5050={handle5050} usedAudience={usedAudience} onAudience={handleAudience} onStop={() => handleGameOver('Bạn đã dừng cuộc chơi')} />
                {audienceData && <AudienceChart data={audienceData} />}
            </div>
            <div style={{ flex: 1 }}><MoneyLadder currentQ={currentQ} /></div>
        </div>
    );
};
export default Play;