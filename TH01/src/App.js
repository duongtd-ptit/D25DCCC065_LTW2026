import React, { useState } from "react";
import StudentList from './StudentList';
import './App.css';

const App = () => {
  // 1. Dữ liệu đầu vào
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Thuỳ Dương', score: 9.0, studentClass: 'D25CQCC05' },
    { id: 2, name: 'Trần Đăng Dương', score: 8.0, studentClass: 'D25CQCC05' },
    { id: 3, name: 'Trần Hà Nhân', score: 1, studentClass: 'D25CQCC01' },
  ]);

  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // 2. Hàm thêm sinh viên
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!name.trim() || !score.trim() || !studentClass.trim()) {
      setError('Vui lòng nhập đủ thông tin!');
      return;
    }

    const numScore = parseFloat(score);
    if (numScore < 0 || numScore > 10) {
      setError('Điểm không hợp lệ, vui lòng thử lại!');
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name,
      score: numScore,
      studentClass: studentClass,
    };

    setStudents([...students, newStudent]);
    setName('');
    setScore('');
    setStudentClass('');
    setError('');
  };

  // 3. Xoá sinh viên
  const handleDelete = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  };

  // 4. Lọc giỏi || trượt
  const getFilteredStudents = () => {
    if (filterType === 'Giỏi') return students.filter(s => s.score >= 8);
    if (filterType === 'Trượt') return students.filter(s => s.score < 5);
    return students;
  };

  const displayStudents = getFilteredStudents();

  // 5. Bảng dữ liệu
  const totalStudents = students.length;
  const totalScore = students.reduce((acc, curr) => acc + curr.score, 0);
  const averageScore = totalStudents > 0 ? (totalScore / totalStudents).toFixed(2) : 0;

  return (
    <div className="app-wrapper">
      <div className="container">
        <h1 className="title">QUẢN LÝ ĐIỂM SINH VIÊN</h1>
        <form onSubmit={handleAddStudent} className="add-form">
          <div className="input-group">
            <input type="text" placeholder="Họ tên" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Lớp" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} />
            <input type="number" placeholder="Điểm số" step={0.1} value={score} onChange={(e) => setScore(e.target.value)} />
            <button type="submit">Thêm</button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>

        <div className="controls-section">
          <div className="stats">
            <span>Tổng SV: <strong>{totalStudents}</strong></span>
            <span>Điểm TB lớp: <strong>{averageScore}</strong></span>
          </div>
          <div className="filters">
            <button className={filterType === 'ALL' ? 'active' : ''} onClick={() => setFilterType('ALL')}>Tất cả</button>

            <button className={filterType === 'Giỏi' ? 'active' : ''} onClick={() => setFilterType('Giỏi')}>
              Giỏi (&gt;=8)
            </button>
            <button className={filterType === 'Trượt' ? 'active' : ''} onClick={() => setFilterType('Trượt')}>
              Trượt (&lt;5)
            </button>
          </div>
        </div>

        <StudentList students={displayStudents} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
