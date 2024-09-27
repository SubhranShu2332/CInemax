import { useContext } from 'react';
import { AdminContext } from '../AdminContext';
import { Navigate } from 'react-router-dom';

const AdminScreening = () => {
  const { isAdminLoggedIn } = useContext(AdminContext);

  // If the admin is not logged in, redirect to login page
  if (!isAdminLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If logged in, show admin dashboard
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin functionalities */}
    </div>
  );
};

export default AdminScreening;
