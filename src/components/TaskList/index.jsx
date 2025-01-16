import './TaskList.css';
import Task from './Task';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import http from '../../http';
import useErrorStore from '../../state/hooks/useErrorStore';

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorStore();

  const loadData = async () => {
    try {
      const response = await http.get('getAllTasks');
      setTasks(response.data.content);
    } catch (err) {
      setErrorMessage('Erro no servidor, tente novamente mais tarde!');
    }
  };

  useEffect(() => {
    clearErrorMessage();
    loadData();
    if (errorMessage) {
      const timer = setTimeout(() => {
        clearErrorMessage();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="container border border-2 rounded-3 mx-auto mt-5 responsive-width shadow bg-body-tertiary">
      <h1 className="text-center my-4">Lista de Tarefas</h1>
      {tasks && (
        <ul className="list-unstyled mt-4">
          {tasks.map((task) => (
            <li key={task.taskId} className="mt-2">
              <Task
                title={task.title}
                taskId={task.taskId}
                description={task.description}
                status={task.status}
                loadData={loadData}
              />
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        className="btn btn-primary m-5"
        onClick={() => navigate('/cadastrar')}
      >
        Cadastrar
      </button>
      {errorMessage && (
        <div style={{ color: 'red', margin: '25px' }}>{errorMessage}</div>
      )}
    </div>
  );
};

export default TaskList;
