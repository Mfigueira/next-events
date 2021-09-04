import { useContext } from 'react';
import NotificationContext from '../../store/NotificationContext';
import Notification from '../UI/Notification';
import MainHeader from './MainHeader';

const Layout = ({ children }) => {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{children}</main>

      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
};

export default Layout;
