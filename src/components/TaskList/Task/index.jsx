import 'bootstrap-icons/font/bootstrap-icons.css';
import './Task.css';
import http from '../../../http';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../state/hooks/useStore';
import useErrorStore from '../../../state/hooks/useErrorStore';

const Task = ({ title, taskId, description, status, loadData }) => {
  const navigate = useNavigate();
  const { setTask } = useStore();
  const { setErrorMessage } = useErrorStore();

  const deleteTask = () => {
    http
      .delete(`deleteTask/${taskId}`)
      .then((resp) => {
        if (resp.status === 200) {
          loadData();
        }
      })
      .catch((err) => {
        if (err.status === 500) {
          setErrorMessage('Tarefa não encontrada!');
        } else {
          setErrorMessage('Erro no servidor, tente novamente mais tarde!');
        }
      });
  };

  const updateTask = () => {
    setTask({
      taskId: taskId,
      title: title,
      description: description,
      status: status,
    });
    navigate('/cadastrar');
  };

  const taskDetails = () => {
    setTask({
      taskId: taskId,
    });
    navigate('/detalhes');
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between">
        <button onClick={taskDetails} className="btn btn-outline-primary">
          <strong>Título:</strong> {title}
        </button>
        <div className="d-flex">
          <div>
            <button
              type="button"
              onClick={deleteTask}
              className="btn btn-danger ms-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={updateTask}
              className="btn btn-primary ms-2"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
