import React from 'react';
import StudentItem from './StudentItem';
const StudentList = ({ students, onDelete }) => {
    if (students.length === 0) {
        return <p className="empty-msg">Không có sinh viên nào trong danh sách.</p>;
    }

    return (
        <ul className="student-list">
            {students.map((student) => (
                <StudentItem
                    key={student.id}
                    id={student.id}
                    name={student.name}
                    score={student.score}
                    studentClass={student.studentClass}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};

export default StudentList;
