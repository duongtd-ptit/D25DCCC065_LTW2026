import { LETTERS } from '../data';
const AnswerButton = ({ index, option, isHidden, status, isSelected, isCorrect, onClick }) => {
    let btnClass = '';
    if (status === 'locked' && isSelected) btnClass = 'locked-ans';
    if (status === 'revealed') {
        if (isCorrect) btnClass = 'correct-ans';
        else if (isSelected && !isCorrect) btnClass = 'wrong-ans';
    }
    return (
        <button
            onClick={() => onClick(index)} disabled={isHidden || status !== 'answering'} className={btnClass}
            style={{ width: '45%', textAlign: 'left', visibility: isHidden ? 'hidden' : 'visible' }}
        >
            {LETTERS[index]}. {option}
        </button>
    );
};

const QuestionCard = ({ question, qNum, status, selectedAnswer, hiddenOptions, onSelect }) => (
    <div>
        <h3>Câu {qNum}/15</h3><p style={{ fontWeight: 'bold' }}>{question.question}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {question.options.map((opt, idx) => (
                <AnswerButton
                    key={idx} index={idx} option={opt} isHidden={hiddenOptions?.includes(idx)}
                    status={status} isSelected={selectedAnswer === idx} isCorrect={question.answer === idx} onClick={onSelect}
                />
            ))}
        </div>
    </div>
);
export default QuestionCard;