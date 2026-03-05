import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Crop from './components/Crop';
import Navbar from './components/Nabvar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crop" element={<Crop />} />
        <Route path="/crop/:id" element={<Crop />} />
      </Routes>
    </>
  );
}
export default App;
