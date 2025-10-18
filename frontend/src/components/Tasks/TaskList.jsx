import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../store/slices/taskSlice';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Navbar from '../Layout/Navbar';
import { useTheme } from '../../context/ThemeContext';
import { Plus, Filter, Search, Loader } from 'lucide-react';

const TaskList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                  My Tasks 📝
                </h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage and organize your daily tasks
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
              >
                <Plus className="w-5 h-5" />
                <span>New Task</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-md border-l-4 border-blue-500`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Tasks</p>
                    <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{stats.total}</p>
                  </div>
                  <div className="text-4xl">📊</div>
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-md border-l-4 border-yellow-500`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
                    <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{stats.pending}</p>
                  </div>
                  <div className="text-4xl">⏳</div>
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-md border-l-4 border-green-500`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
                    <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{stats.completed}</p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Filter className="w-4 h-4" />
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  filter === 'pending'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ⏳ Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  filter === 'completed'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ✅ Completed ({stats.completed})
              </button>
            </div>
          </div>

          {/* Tasks List */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader className={`w-12 h-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} animate-spin mb-4`} />
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-12 text-center`}>
              <div className="text-6xl mb-4">
                {searchTerm ? '🔍' : filter === 'completed' ? '🎉' : '📝'}
              </div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                {searchTerm ? 'No tasks found' : filter === 'completed' ? 'No completed tasks yet' : 'No tasks yet'}
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                {searchTerm ? 'Try a different search term' : 'Create your first task to get started!'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Task</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTasks.map((task, index) => (
                <div 
                  key={task._id} 
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TaskItem task={task} onEdit={handleEdit} />
                </div>
              ))}
            </div>
          )}

          {showForm && (
            <TaskForm task={editingTask} onClose={handleCloseForm} />
          )}
        </div>
      </div>
    </>
  );
};

export default TaskList;