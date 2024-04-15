import React, { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PrivateRoute = ({ component: Component, isAuthenticated, hasPermission,isLoading, ...rest }) => {
  const [toastShown, setToastShown] = useState(false);


  useEffect(() => {
    if(!isLoading){
      if (!isAuthenticated || !hasPermission) {
        if (!toastShown) {
          toast.error("You do not have permission to access this page.")
          setToastShown(true);
        }
      }
      else {
        setToastShown(false);
      }
      
    }
    
  }, [isAuthenticated, hasPermission,isLoading,toastShown]);


  const Protected = ({ Component, ...props }) => {
    
   


    if (isLoading) return <div>Loading...</div>;

    if(!isAuthenticated){
      console.log("isLoading: "+isLoading);
      console.log("isAuthenticated: "+isAuthenticated);
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;

  };


  // return (
  //   isAuthenticated && hasPermission ?
  //     <Component {...rest} /> : <Navigate to="/login" />
  // );
  return <Protected Component={Component} />
};

export default PrivateRoute;