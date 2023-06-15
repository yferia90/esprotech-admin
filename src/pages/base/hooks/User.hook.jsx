import { useState, useEffect } from 'react';
import UserHandler from '../handlers/User.handler';

const UserHook = ({ token }) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const { handlerListUsers } = UserHandler({ token });
    
    const searchListUsers = async () => {
        const users = await handlerListUsers();
        setUsers(users);
        setLoading(false);
    }

    useEffect(() => {
        document.title = 'Listado de usuarios';
        searchListUsers();
    }, [])

    return {
        users,
        loading
    }
}

export default UserHook;