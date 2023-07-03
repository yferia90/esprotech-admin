import axios from 'axios';
import Env from '../../../../env';

const getApplications = async ({ token }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/application`, {
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

export {
    getApplications,
    deleteApplication,
    postApplication
}