import './App.css';
import Login from './pages/Auth/Login';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Signup from './pages/Auth/Signup';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
