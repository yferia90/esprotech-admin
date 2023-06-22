import axios from 'axios';
import Env from '../../../../env';

const getFile = async ({ token, path }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/files?path=${path}`,{
        headers: {
            Authorization: token
        }
    });
    return result?.data;
}

const uploadFile = async ({ token, formData }) => {
    const result = await axios.post(`${Env.REACT_APP_BACKEND}/files?id=profile`, formData,
    {
        headers: {
            Authorization: token
        }
    });
    return result?.data;
}

const changeEmail = async ({ token, formData, userId }) => {
    const result = await axios.put(`${Env.REACT_APP_BACKEND}/auth/change/email/${userId}`, {...formData},
    {
        headers: {
            Authorization: token
        }
    });
    return result?.data;
}

const changePassword = async ({ token, formData }) => {
    const result = await axios.post(`${Env.REACT_APP_BACKEND}/auth/change/password`, {...formData},
    {
        headers: {
            Authorization: token
        }
    });
    return result?.data;
}

export {
    getFile,
    uploadFile,
    changeEmail,
    changePassword
}