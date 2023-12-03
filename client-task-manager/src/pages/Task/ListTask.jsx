import { useState, useEffect } from 'react';
import { deleteTaskSuccess, getTasks } from '../../redux/actions/taskActions';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { taskService } from '../../apis/service';
import ViewTask from './ViewTask';
import Button from '../../components/Button';

const ListTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [taskList, setTaskList] = useState([]);

  const { state } = useLocation();

  // This effect will run at initial render and every time when task is deleted
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.deletedId]);

  // Fetch API call
  const fetchTasks = async () => {
    dispatch(getTasks());
    const response = await taskService.getTasksApi();
    setTaskList(response?.data?.tasks);
    dispatch(deleteTaskSuccess(response));
    navigate('/view-task');
  };
  return (
    <div>
      <div className="flex justify-center items-center py-6">
        <Button
          type={'submit'}
          name={'createTask'}
          text={'Create Task'}
          onClick={(e) => navigate('/task-form')}
        />
      </div>
      {taskList?.length > 0 ? (
        taskList?.map((task) => (
          <ViewTask
            id={task?.id}
            key={task?.id}
            title={task?.title}
            description={task?.description}
            dueDate={task?.created_at}
          />
        ))
      ) : (
        <div className="flex justify-center items-center py-6">
          <p>No Tasks Created yet</p>
        </div>
      )}
    </div>
  );
};

export default ListTask;
