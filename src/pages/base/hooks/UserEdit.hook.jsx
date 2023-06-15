import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserHandler from '../handlers/User.handler';

const UserEditHook = ({ token }) => {
    let { id } = useParams();
    const [user, setUser] = useState([]);
    const { handlerGetUserById } = UserHandler({ token });
    
    const searchGetUser = async () => {
        const userById  = await handlerGetUserById({ id });
        setUser(userById);
    }

    useEffect(() => {
        document.title = 'Editar usuario';
        searchGetUser();
    }, [])

    return {
        user,
    }
}

export default UserEditHook;