import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../../store/slices/taskSlice';
import { useTheme } from '../../context/ThemeContext';
import { X, Save, FileText } from 'lucide-react';

const TaskForm = ({ task, onClose }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'pending'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      try {
        if (task) {
          await dispatch(updateTask({ id: task._id, taskData: formData }));
        } else {
          await dispatch(createTask(formData));
        }
        onClose();
      } catch (error) {
        console.error('Error saving task:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 animate-slideUp`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <FileText className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {task ? 'Edit Task' : 'Create New Task'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`${
              isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
            } transition-colors`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}>
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.title ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              } transition-all duration-300`}
              placeholder="Enter task title"
              maxLength={100}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.title && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span>❌</span>
                  {errors.title}
                </p>
              )}
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-auto`}>
                {formData.title.length}/100
              </p>
            </div>
          </div>

          <div>
            <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-3 border ${
                errors.description ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              } transition-all duration-300 resize-none`}
              placeholder="Enter task description (optional)"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span>❌</span>
                  {errors.description}
                </p>
              )}
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-auto`}>
                {formData.description.length}/500
              </p>
            </div>
          </div>

          <div>
            <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}>
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            >
              <option value="pending">⏳ Pending</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg font-semibold flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{task ? 'Update' : 'Create'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              } py-3 rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2`}
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;