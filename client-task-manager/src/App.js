import './App.css';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Signup from './pages/Auth/Signup';
import TaskForm from './pages/Task/TaskForm';
import Login from './pages/Auth/Login';
import ViewTask from './pages/Task/ViewTask';
import ListTask from './pages/Task/ListTask';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/task-form" element={<TaskForm />} />
        <Route path="/view-task" element={<ListTask />} />
      </Routes>
    </div>
  );
}

export default App;
