import axios from 'axios';
import Env from '../../../../env';

const getApplications = async ({ token, page, size }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/application?page=${page}&&size=${size}`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const getApplication = async ({ token, id }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/application/${id}`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const deleteApplication = async ({ token, id }) => {
    const result = await axios.delete(`${Env.REACT_APP_BACKEND}application/${id}`,{
        headers: {
            Authorization: token
        }
    });
    return result;
}

const postApplication = async ({ token, formData }) => {
    const result = await axios.post(`${Env.REACT_APP_BACKEND}application`,{
        ...formData
    },{
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const updateApplication = async ({ token, formData, id }) => {
    const result = await axios.put(`${Env.REACT_APP_BACKEND}application/${id}`,{
        ...formData
    },{
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}


export {
    getApplication,    
    getApplications,
    deleteApplication,
    postApplication,
    updateApplication
}