import { PRIZES, MILESTONES, formatMoney } from '../data';
const MoneyLadder = ({ currentQ }) => (
    <ul style={{ listStyle: 'none', padding: 0 }}>
        {[...PRIZES].reverse().map((prize, idx) => {
            const step = 15 - idx;
            const isMilestone = MILESTONES.includes(step);
            const isCurrent = step === currentQ + 1;
            return (
                <li key={step} className={`${isMilestone ? 'milestone' : ''} ${isCurrent ? 'current-ladder' : ''}`} style={{ padding: '5px' }}>
                    {step}. {formatMoney(prize)}
                </li>
            );
        })}
    </ul>
);
export default MoneyLadder;