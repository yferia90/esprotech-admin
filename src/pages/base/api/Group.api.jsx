import axios from 'axios';
import Env from '../../../../env';

const getGroups = async ({ token, page, size }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/group?page=${page}&&size=${size}`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const getGroup = async ({ token, id }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/group/${id}`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const deleteGroup = async ({ token, id }) => {
    const result = await axios.delete(`${Env.REACT_APP_BACKEND}group/${id}`,{
        headers: {
            Authorization: token
        }
    });
    return result;
}

const postGroup = async ({ token, formData }) => {
    const result = await axios.post(`${Env.REACT_APP_BACKEND}group`,{
        ...formData
    },{
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const updateGroup = async ({ token, formData, id }) => {
    const result = await axios.put(`${Env.REACT_APP_BACKEND}group/${id}`,{
        ...formData
    },{
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}


export {
    getGroups,
    getGroup,
    deleteGroup,
    postGroup,
    updateGroup
}