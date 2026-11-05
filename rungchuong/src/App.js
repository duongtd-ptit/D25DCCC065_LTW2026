import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
// Import các trang (sẽ tạo ở bước sau)
import Home from './pages/Home';
import Questions from './pages/Questions';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';
import Play from './pages/Play';
import Result from './pages/Result';
import History from './pages/History';
export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    axios.get('/data/questions.json', { signal: controller.signal })
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) return <div>Đang tải câu hỏi...</div>;
  if (error) return <div>Không tải được câu hỏi</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="play" element={<Play questions={questions} />} />
        <Route path="result" element={<Result />} />
        <Route path="history" element={<History />} />

        <Route path="questions" element={<Questions questions={questions} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}