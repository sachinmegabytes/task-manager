import { formateDateTime, titleCase, formatText } from '../../utilities/formatters';
import EditIcon from '../../assets/edit-icon.png'
import TrashIcon from '../../assets/trash-can.png'
import { useNavigate } from 'react-router-dom';
import {
  deleteTask,
  deleteTaskFailure,
  deleteTaskSuccess,
} from '../../redux/actions/taskActions';
import { taskService } from '../../apis/service';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const ViewTask = ({
  id,
  title,
  description,
  dueDate,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDeleteTask = async(id) => {
    dispatch(deleteTask());
    try {
      const response = await taskService.deleteTaskApi(id);
      dispatch(deleteTaskSuccess(response));
      toast.success(`${response.data.message}`);
    } catch (error) {
      dispatch(deleteTaskFailure(error.message));
    }
    navigate('/view-task', {state:{deletedId: id}});
  }

  return (
    <div className="bg-white relative w-[23.5%] h-[200px] p-4 shadow-lg  rounded-lg border border-gray-100 mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {formatText(titleCase(title), 20)}
      </h3>
      <p className="text-gray-600 text-md mb-2">
        {formatText(description, 100)}
      </p>
      <p className="text-sm text-gray-400 absolute bottom-4 left-3">
        <span className="font-semibold text-black">Created : </span>
        {formateDateTime(dueDate)}
      </p>
      <div className="absolute bottom-4 flex justify-center item-center right-5 gap-2">
        <img
          onClick={() => onDeleteTask(id)}
          className="w-6 h-6 cursor-pointer"
          alt="delete"
          src={TrashIcon}
        />
        <img
          onClick={() =>
            navigate('/task-form', {
              state: { taskId: id, title, description },
            })
          }
          className="w-7 cursor-pointer"
          alt="edit"
          src={EditIcon}
        />
      </div>
    </div>
  );
};

export default ViewTask