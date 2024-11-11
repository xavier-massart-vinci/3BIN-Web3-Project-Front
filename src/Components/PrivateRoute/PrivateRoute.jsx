import { Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  return token ? <Navigate to="/contact/0" /> : <Navigate to="/login" />;
};

export default PrivateRoute;
