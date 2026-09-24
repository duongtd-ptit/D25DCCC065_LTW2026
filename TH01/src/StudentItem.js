import React from 'react';
const StudentItem = ({ id, name, score, studentClass, onDelete }) => {
    // Sử dụng const (ES6)
    const isPass = score >= 5;
    const statusText = isPass ? 'Đạt' : 'Trượt';
    const statusClass = isPass ? 'status pass' : 'status fail';

    return (
        <li>
            <div className="student-info">
                <div className="main-info">
                    <strong>{name}</strong>
                    <span className="class-badge">{studentClass}</span>
                </div>
                <div className="sub-info">
                    {`Điểm: ${score} `}
                    <span className={statusClass}>({statusText})</span>
                </div>
            </div>

            <button
                className="btn-delete"
                onClick={() => onDelete(id)}
            >
                Xóa
            </button>
        </li>
    );
};

export default StudentItem;
