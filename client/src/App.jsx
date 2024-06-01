import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Home from './pages/Home';
import Call from './pages/Call';
import '../src/styles/fonts/Pretendard-GOV/pretendard.css';
import Ringing from './pages/Ringing';
import Call2 from './pages/Call2';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Call' element={<Call />} />
        <Route path='/ringing' element={<Ringing />} />
        <Route path='/call2' element={<Call2 />} />
      </Routes>
    </div>
  );
}

export default App;
