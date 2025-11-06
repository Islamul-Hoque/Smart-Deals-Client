import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading/Loading';

const PrivateRouter = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading) return <Loading/>
    if(user) return children;
    return <Navigate to='/login' state={{ from: location?.pathname }} />
};

export default PrivateRouter;