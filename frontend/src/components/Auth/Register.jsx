import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../store/slices/authSlice';
import { Eye, EyeOff, UserPlus, User, Lock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const userData = {
        username: formData.username,
        password: formData.password
      };
      dispatch(register(userData));
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-white to-blue-50'} transition-colors duration-300`}>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:shadow-3xl`}>
        <div className="text-center mb-8">
          <div className={`w-20 h-20 ${isDarkMode ? 'bg-gradient-to-br from-purple-500 to-pink-600' : 'bg-gradient-to-br from-purple-600 to-pink-600'} rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse`}>
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Create Account
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Join us and start managing tasks</p>
        </div>

        {isError && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4 flex items-center gap-2 animate-shake">
            <span>⚠️</span>
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}>
              Username
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border ${
                  errors.username ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                } transition-all duration-300`}
                placeholder="Choose a username"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>❌</span>
                {errors.username}
              </p>
            )}
          </div>

          <div className="relative">
            <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 border ${
                  errors.password ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                } transition-all duration-300`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>❌</span>
                {errors.password}
              </p>
            )}
          </div>

          <div className="relative">
            <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 border ${
                  errors.confirmPassword ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                } transition-all duration-300`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>❌</span>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg font-semibold flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                <span>Register</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;