import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Chat from "./pages/Chat";
import Phishing from "./pages/Phishing";
import MyFiles from "./pages/MyFiles";
import Mission from "./pages/Mission";
import Contact from "./pages/Contact";
import PostMortem from "./pages/PostMortemGenerator";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mission" element={<Mission />} />
          <Route path="upload" element={<Upload />} />
          <Route path="chat" element={<Chat />} />
          <Route path="phishing" element={<Phishing />} />
          <Route path="my-files" element={<MyFiles />} />
          <Route path="contact" element={<Contact />} />
          <Route path="post-mortem" element={<PostMortem />} />
        </Route>
      </Routes>
    </Router>
  );
}
