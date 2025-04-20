import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Chat from './pages/Chat';
import Scanner from './pages/Scanner';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      {/* Routes wrapped with Layout providing a single navbar */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/scan" element={<Scanner />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
