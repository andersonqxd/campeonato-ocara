import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipe/:id" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}