import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import FormSystem from './components/FormSystem';
import TaskDetails from './components/TaskList/TaskDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="cadastrar" element={<FormSystem />} />
        <Route path="detalhes" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
