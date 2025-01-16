import React, { useEffect } from 'react';
import useStore from '../../../state/hooks/useStore';
import { useNavigate } from 'react-router-dom';
import useErrorStore from '../../../state/hooks/useErrorStore';
import http from '../../../http';

const TaskDetails = () => {
  const { task, setTask, resetTask } = useStore();
  const navigate = useNavigate();
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorStore();

  const goBack = () => {
    clearErrorMessage();
    resetTask();
    navigate('/');
  };

  const loadOneData = async (taskId) => {
    try {
      const response = await http.get(`getOneTask/${task.taskId}`);
      setTask({
        taskId: taskId,
        title: response.data.title,
        description: response.data.description,
        status: response.data.status,
      });
    } catch (err) {
      setErrorMessage('Tarefa não encontrada!');
    }
  };

  const statusText =
    task.status === 'NOT_STARTED'
      ? 'não iniciado'
      : task.status === 'IN_PROGRESS'
      ? 'em andamento'
      : task.status === 'COMPLETED'
      ? 'concluído'
      : '';

  useEffect(() => {
    loadOneData(task.taskId);
    if (errorMessage) {
      const timer = setTimeout(() => {
        clearErrorMessage();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [task.taskId]);

  return (
    <div className="container-fluid">
      <div className="d-flex flex-row-reverse">
        <button type="button" onClick={goBack} className="btn btn-danger m-5">
          Voltar
        </button>
      </div>
      <table className="table table-primary table-striped-columns">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{task.taskId}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{statusText}</td>
          </tr>
        </tbody>
      </table>
      {errorMessage && (
        <div style={{ color: 'red', margin: '25px' }}>{errorMessage}</div>
      )}
    </div>
  );
};

export default TaskDetails;
