import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home     from './pages/Home'
import Upload   from './pages/Upload'
import Chat     from './pages/Chat'
import Phishing from './pages/Phishing'
import Layout   from './components/Layout';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/"        element={<Home     />} />
          <Route path="/upload"  element={<Upload   />} />
          <Route path="/chat"    element={<Chat     />} />
          <Route path="/phishing"element={<Phishing/>} />
        </Routes>
      </Layout>
    </Router>
  )
}
