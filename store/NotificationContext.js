import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: ({ title, message, status }) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification && notification.status != 'pending') {
      const notificationTimer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(notificationTimer);
    }
  }, [notification]);

  const showNotification = ({ title, message, status }) => {
    setNotification({ title, message, status });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const ctxValue = {
    notification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={ctxValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
