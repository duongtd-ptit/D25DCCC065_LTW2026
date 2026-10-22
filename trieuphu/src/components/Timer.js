const Timer = ({ timeLeft }) => <h2 className={timeLeft <= 10 ? 'timer-danger' : ''}>Còn {timeLeft} giây</h2>;
export default Timer;