import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ component: Component, isAuthenticated, hasPermission, ...rest }) => {
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !hasPermission) {
      if (!toastShown) {
        toast.error("You do not have permission to access this page.");
        setToastShown(true);
      }
    }
    else {
      setToastShown(false);
    }
  }, [isAuthenticated, hasPermission,toastShown]);

  return (
    isAuthenticated && hasPermission ?
      <Component {...rest} /> : <Navigate to="/login" replace state={{ error: "You do not have permission to access this page." }} />
  );
};

export default PrivateRoute;




