import axios from 'axios';
import Env from '../../../../env';

const getUsers = async ({ token, page, size }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/user?page=${page}&&size=${size}`, {
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

const uploadAvatar = async ({ token, formData }) => {
    const result = await axios.post(`${Env.REACT_APP_BACKEND}/files?id=avatar`, formData,
    {
        headers: {
            Authorization: token
        }
    });
    return result?.data;
}

export {
    getUsers,
    getUserId,
    uploadAvatar
}