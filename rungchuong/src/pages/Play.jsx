import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { POINTS, LETTERS, RANKS } from '../data'; // Hãy chắc chắn file data.js đã export RANKS

export default function Play({ questions }) {
    const location = useLocation();
    const navigate = useNavigate();
    const playerName = location.state?.playerName;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20); // Bài 3 yêu cầu 20s
    const [score, setScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);

    // State các quyền trợ giúp
    const [used5050, setUsed5050] = useState(false);
    const [usedTime, setUsedTime] = useState(false);
    const [usedBuoy, setUsedBuoy] = useState(false);
    const [buoyActive, setBuoyActive] = useState(false);
    const [hiddenOptions, setHiddenOptions] = useState([]);
    const [buoyedQuestions, setBuoyedQuestions] = useState([]); // Lưu index các câu đã dùng phao

    if (!playerName) return <Navigate to="/" replace />;
    const currentQuestion = questions[currentIndex];

    // Xử lý phím tắt 1, 2, 3, 4
    useEffect(() => {
        const handleKey = (e) => {
            const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
            const selected = keyMap[e.key];
            // Chỉ chọn nếu phím hợp lệ và đáp án đó không bị ẩn (bởi 50/50)
            if (selected !== undefined && !hiddenOptions.includes(selected)) {
                handleAnswer(selected);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [currentIndex, hiddenOptions]); // eslint-disable-line

    // Xử lý đếm ngược thời gian
    useEffect(() => {
        if (timeLeft <= 0) {
            if (buoyActive) {
                handleBuoySave(); // Phao cứu sinh cứu khi hết giờ
            } else {
                endGame(score, correctCount, 'Hết giờ!');
            }
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, buoyActive]); // eslint-disable-line

    // Hàm xử lý kết thúc game và lưu lịch sử
    const endGame = (finalScore, finalCorrect, reason) => {
        // Tìm danh hiệu
        const rankObj = RANKS.find(r => finalScore >= r.min) || RANKS[RANKS.length - 1];
        const rank = rankObj.title;

        // Lưu ngay vào localStorage
        const history = JSON.parse(localStorage.getItem('ltw_rcv_history') || '[]');
        const newRecord = {
            id: Date.now(),
            name: playerName,
            score: finalScore,
            rank: rank,
            correctCount: finalCorrect,
            playedAt: new Date().toLocaleString("vi-VN")
        };
        localStorage.setItem('ltw_rcv_history', JSON.stringify([...history, newRecord]));

        // Chuyển hướng sang trang kết quả
        navigate('/result', {
            replace: true,
            state: { playerName, score: finalScore, rank, correctCount: finalCorrect, reason }
        });
    };

    // Hàm xử lý nếu được phao cứu sinh cứu mạng
    const handleBuoySave = () => {
        setBuoyActive(false);
        setBuoyedQuestions(prev => [...prev, currentIndex]);
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setTimeLeft(20);
            setHiddenOptions([]);
        } else {
            endGame(score, correctCount, 'Bạn đã hoàn thành 15 câu');
        }
    };

    const handleAnswer = (selectedIndex) => {
        if (selectedIndex === currentQuestion.answer) {
            const newScore = score + POINTS[currentQuestion.level];
            const newCorrect = correctCount + 1;
            setScore(newScore);
            setCorrectCount(newCorrect);
            setBuoyActive(false); // Trả lời đúng thì phao tự mất tác dụng

            if (currentIndex + 1 < questions.length) {
                setCurrentIndex(prev => prev + 1);
                setTimeLeft(20);
                setHiddenOptions([]);
            } else {
                const reason = newCorrect === 15 ? 'Chúc mừng! Bạn đã rung chuông vàng' : 'Bạn đã hoàn thành 15 câu';
                endGame(newScore, newCorrect, reason);
            }
        } else {
            if (buoyActive) {
                handleBuoySave(); // Phao cứu sinh cứu khi chọn sai
            } else {
                endGame(score, correctCount, 'Bạn đã bị loại');
            }
        }
    };

    // --- Các hàm Trợ giúp ---
    const handle5050 = () => {
        if (used5050) return;
        setUsed5050(true);
        // Tìm các vị trí đáp án sai và bốc ngẫu nhiên 1 cái để ẩn
        const wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQuestion.answer);
        const randomWrong = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
        setHiddenOptions([randomWrong]);
    };

    const handleAddTime = () => {
        if (usedTime) return;
        setUsedTime(true);
        setTimeLeft(prev => prev + 15);
    };

    const handleUseBuoy = () => {
        if (usedBuoy) return;
        setUsedBuoy(true);
        setBuoyActive(true);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{playerName}</h3>
                <h3>Điểm: {score}</h3>
                <h3 style={{ color: timeLeft <= 5 ? 'red' : 'black' }}>Còn {timeLeft} giây</h3>
            </div>

            {/* Các nút Trợ giúp */}
            <div style={{ margin: '15px 0', display: 'flex', gap: '10px' }}>
                <button onClick={handle5050} disabled={used5050}>50/50 (Loại 1 đáp án)</button>
                <button onClick={handleAddTime} disabled={usedTime}>+15 Giây</button>
                <button onClick={handleUseBuoy} disabled={usedBuoy}>
                    {buoyActive ? 'Phao đang bật' : 'Phao cứu sinh'}
                </button>
            </div>

            {/* Bảng ScoreBoard hiển thị quá trình */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                {questions.map((_, i) => {
                    let bgColor = 'lightgray';
                    if (i < currentIndex) {
                        bgColor = buoyedQuestions.includes(i) ? 'orange' : 'lightgreen';
                    }
                    const border = i === currentIndex ? '3px solid black' : '1px solid gray';
                    return (
                        <div key={i} style={{ width: '25px', height: '25px', backgroundColor: bgColor, border, textAlign: 'center', lineHeight: '25px', fontSize: '12px' }}>
                            {i + 1}
                        </div>
                    )
                })}
            </div>

            <h2>Câu {currentIndex + 1}/15 - {currentQuestion.topic}: {currentQuestion.question}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {currentQuestion.options.map((opt, index) => {
                    const isHidden = hiddenOptions.includes(index);
                    return (
                        <button
                            key={index}
                            onClick={() => !isHidden && handleAnswer(index)}
                            style={{ padding: '20px', textAlign: 'left', visibility: isHidden ? 'hidden' : 'visible' }}
                        >
                            {LETTERS[index]}. {opt}
                        </button>
                    );
                })}
            </div>
            <p style={{ marginTop: '15px', fontStyle: 'italic', fontSize: '14px' }}>
                * Mẹo: Nhấn phím số 1, 2, 3, 4 trên bàn phím để chọn nhanh đáp án.
            </p>
        </div>
    );
}