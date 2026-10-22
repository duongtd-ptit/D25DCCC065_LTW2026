import { LETTERS } from '../data';
const AudienceChart = ({ data }) => (
    <div style={{ display: 'flex', gap: '15px', marginTop: '20px', height: '100px', alignItems: 'flex-end' }}>
        {data.map((percent, idx) => (
            <div key={idx} style={{ textAlign: 'center', width: '50px' }}>
                <div style={{ height: `${percent}%`, backgroundColor: '#2196f3', color: 'white', fontSize: '12px' }}>{percent}%</div>
                <div>{LETTERS[idx]}</div>
            </div>
        ))}
    </div>
);
export default AudienceChart;