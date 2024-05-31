import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Home from './pages/Home';
import '../src/styles/fonts/Pretendard-GOV/pretendard.css';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
