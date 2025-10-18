import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../../store/slices/taskSlice';
import { useTheme } from '../../context/ThemeContext';
import { Edit, Trash2, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await dispatch(deleteTask(task._id));
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    await dispatch(updateTask({ 
      id: task._id, 
      taskData: { ...task, status: newStatus }
    }));
  };

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } p-5 rounded-xl shadow-md border-l-4 ${
      task.status === 'completed' ? 'border-green-500' : 'border-blue-500'
    } transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
      isDeleting ? 'opacity-50' : ''
    }`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={handleToggleStatus}
            className={`mt-1 transition-all duration-300 transform hover:scale-110 ${
              task.status === 'completed' ? 'text-green-500' : isDarkMode ? 'text-gray-400' : 'text-gray-300'
            }`}
          >
            <CheckCircle className={`w-6 h-6 ${task.status === 'completed' ? 'fill-current' : ''}`} />
          </button>
          <div className="flex-1">
            <h3 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            } ${task.status === 'completed' ? 'line-through opacity-60' : ''}`}>
              {task.title}
            </h3>
          </div>
        </div>
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
            task.status === 'completed'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
          }`}
        >
          {task.status === 'completed' ? '✅' : '⏳'}
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className={`${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        } mb-4 ml-9 ${task.status === 'completed' ? 'line-through opacity-60' : ''}`}>
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center text-sm ml-9">
        <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Calendar className="w-4 h-4" />
          <span>
            Created: {new Date(task.createdAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;