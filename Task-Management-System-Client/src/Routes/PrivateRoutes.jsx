import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    if(user){
        return children;
    }
    if (loading) {
        return  <span className="loading loading-spinner text-warning"></span>;
    }
    if(!user){
        return  <span className="loading loading-spinner text-warning"></span>;
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivateRoutes;