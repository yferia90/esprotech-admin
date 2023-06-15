import axios from 'axios';
import Env from '../../../../env';

const getCompanies = async ({ token }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/company`, {
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

export {
    getCompanies,
    getCompanyById,
}