import { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import InputField from '../../components/InputField';
import Logo from '../../assets/evive-logo.jpeg';
import {
  addTask,
  addTaskFailure,
  addTaskSuccess,
} from '../../redux/actions/taskActions';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { taskService } from '../../apis/service';
import { toast } from 'react-toastify';

const TaskForm = () => {
  const { state } = useLocation();
  const [title, setTitle] = useState(state?.title);
  const [description, setDescription] = useState(state?.description);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    dispatch(addTask());
    const task = {
      title: title,
      description: description,
    };
    try {
      if (state && state.taskId) {
        const response = await taskService.editTask({
          ...task,
          id: state.taskId,
        });
        if (response.success) {
          dispatch(addTaskSuccess(response.data));
          toast.success(`${response.data.message}`);
          resetForm();
          navigate('/view-task');
        }
        return;
      }
      const response = await taskService.addTaskApi(task);
      if (response.success) {
        dispatch(addTaskSuccess(response.data));
        toast.success(`${response.data.message}`);
        resetForm();
      }
    } catch (error) {
      dispatch(addTaskFailure(error.message));
    }
  };
  const resetForm = () => {
    setDescription('');
    setTitle('');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        title="Create Title"
        text="Fill the Form to Create Task"
        imageUrl={Logo}
      >
        <div className="flex justify-center items-center py-6">
          <Button
            type={'submit'}
            name={'viewTask'}
            text={'View Task'}
            onClick={(e) => navigate('/view-task')}
          />
        </div>
        <InputField
          type={'text'}
          isRequired
          label={'Enter Task Name'}
          labelName={'Name'}
          name={'taskName'}
          placeholder={'Name of Task'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          type={'text'}
          isRequired
          label={'Enter Description'}
          labelName={'Description'}
          name={'taskDescription'}
          placeholder={'Enter your Description'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-center items-center py-6">
          <Button
            type={'submit'}
            name={'createTask'}
            text={'Create Task'}
            onClick={(e) => onSubmitForm(e)}
          />
        </div>
      </Card>
    </div>
  );
};

export default TaskForm;
