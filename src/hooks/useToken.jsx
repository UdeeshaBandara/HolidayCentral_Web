import React, {useState} from 'react'


const useToken = () => {
    const getToken = () => {
        return sessionStorage.getItem('token');

    }

    const [token, setToken] = useState(getToken())
    const saveToken = userToken => {
        sessionStorage.setItem('token',userToken);
        setToken(userToken);
    }
    return {
        setToken: saveToken,
        token
    }
}

export default useToken;
