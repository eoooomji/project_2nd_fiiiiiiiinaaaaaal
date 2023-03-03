import { Outlet } from 'react-router-dom';
import AdminHeader from './adminHeader';

const AdminLayout = () => {
  return (
    <div>
      <h3>AdminPage</h3>
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
