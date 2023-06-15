import axios from 'axios';
import Env from '../../../../env';

const getUsers = async ({ token }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/user`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const getUserId = async ({ token, id }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/user/${id}`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

export {
    getUsers,
    getUserId,
}