import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'https://smart-deals-api-server-weld.vercel.app',
})

const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        // Request interceptor
        const requestInterceptor = instance.interceptors.request.use((config)=> {
        if(user?.accessToken){
            // console.log("AxiosSecure token:", user?.accessToken);
            config.headers.authorization = `Bearer ${user.accessToken}`
        }
        return config
        })

        // Response interceptor
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res
        }, err => {
            const status = err?.response?.status
                if(status === 401 || status === 403){
                    // console.log('Log out the user for bad request');
                    signOutUser()
                        .then(()=>{
                            navigate('/register')
                        })
                }
                // console.log('Error inside the interceptor:',err);
        })

        return ()=> {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor)
        }
    },[user?.accessToken, signOutUser, navigate])
    return instance
};

export default useAxiosSecure;