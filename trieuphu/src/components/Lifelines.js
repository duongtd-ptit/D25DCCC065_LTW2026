const Lifelines = ({ used5050, on5050, usedAudience, onAudience, onStop }) => (
    <div style={{ marginTop: '20px' }}>
        <button disabled={used5050} onClick={on5050}>50:50</button>
        <button disabled={usedAudience} onClick={onAudience}>Hỏi khán giả</button>
        <button onClick={onStop} style={{ backgroundColor: '#ffeb3b' }}>Dừng cuộc chơi</button>
    </div>
);
export default Lifelines;