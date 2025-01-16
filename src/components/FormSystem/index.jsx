import { Field, Form, Formik } from 'formik';
import Input from './Input';
import * as Yup from 'yup';
import useStore from '../../state/hooks/useStore';
import http from '../../http';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useErrorStore from '../../state/hooks/useErrorStore';

const FormSystem = () => {
  const { task, resetTask } = useStore();
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorStore();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    title: Yup.string().required('Campo obrigatório'),
    description: Yup.string().required('Campo obrigatório'),
  });

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        clearErrorMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const registerTask = (values) => {
    http
      .post('register', {
        title: values.title,
        description: values.description,
        status: values.status,
      })
      .then((resp) => {
        if (resp.status === 201) {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err.status);
        if (err.status === 500) {
          setErrorMessage('Não pode haver uma tarefa com o mesmo nome!');
        } else {
          setErrorMessage('Erro no servidor, tente novamente mais tarde!');
        }
      });
  };

  const update = (values) => {
    http
      .put('update', {
        taskId: task.taskId,
        title: values.title,
        description: values.description,
        status: values.status,
      })
      .then((resp) => {
        if (resp.status === 200) {
          resetTask();
          navigate('/');
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

  const goBack = () => {
    resetTask();
    navigate('/');
  };

  return (
    <div className="container border border-2 rounded-3 mx-auto mt-5 w-75 shadow bg-body-tertiary">
      <div className="d-flex flex-row-reverse">
        <button
          type="button"
          onClick={goBack}
          className="btn btn-danger mx-5 my-3"
        >
          Voltar
        </button>
      </div>
      <h1 className="mb-5 text-center mt-3">Cadastrar Tarefa</h1>
      <Formik
        initialValues={{
          title: task.title || '',
          description: task.description || '',
          status: task.status || 'NOT_STARTED',
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          if (task.taskId) {
            update(values);
          } else {
            registerTask(values);
          }
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Input name="title" type="text" label="Título" />
            <Input name="description" type="text" label="Descrição" />
            <Field as="select" name="status" className="form-select">
              <option value="NOT_STARTED">não iniciado</option>
              <option value="IN_PROGRESS">em andamento</option>
              <option value="COMPLETED">concluído</option>
            </Field>
            <div className="d-flex flex-row-reverse">
              <button type="submit" className="btn btn-primary m-5">
                Cadastrar
              </button>
            </div>
            {errorMessage && (
              <div style={{ color: 'red', margin: '25px' }}>{errorMessage}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormSystem;
