import axios from 'axios';
import Env from '../../../../env';

const getCompanies = async ({ token, page, size }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/company?page=${page}&&size=${size}`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const getCompanyById = async ({ token, id }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/company/${id}`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const postCompany = async ({ token, payload }) => {
    const result = await axios.post(`${Env.REACT_APP_BACKEND}/company`, {
        ...payload
    }, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const putCompany = async ({ token, payload, id }) => {
    const result = await axios.put(`${Env.REACT_APP_BACKEND}/company/${id}`, {
        ...payload
    }, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

export {
    getCompanies,
    getCompanyById,
    postCompany,
    putCompany
}