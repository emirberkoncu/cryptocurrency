import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoList from './Components/CryptoList';
import CryptoDetail from './Components/CryptoDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CryptoList />} />
          <Route path="/crypto/:id" element={<CryptoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
