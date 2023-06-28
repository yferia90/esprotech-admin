import axios from 'axios';
import Env from '../../../../env';

const getCustomers = async ({ token }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/customer`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

const getCustomerById = async ({ token, id }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/customer/${id}`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data;
}

const uploadAvatar = async ({ token, formData }) => {
    const result = await axios.post(`${Env.REACT_APP_BACKEND}/files?id=customers`, formData,
    {
        headers: {
            Authorization: token
        }
    });
    return result?.data;
}

const postCustomer = async ({ token, formData }) => {
    const result = await axios.post(`${Env.REACT_APP_BACKEND}/customer`, {
        ...formData
    },
    {
        headers: {
            Authorization: token
        }
    });
    return result;
}

const deleteCustomer = async ({ token, id }) => {
    const result = await axios.delete(`${Env.REACT_APP_BACKEND}/customer/${id}`,
    {
        headers: {
            Authorization: token
        }
    });
    return result;
}

const updateCustomer = async ({ token, formData, id }) => {
    const result = await axios.put(`${Env.REACT_APP_BACKEND}/customer/${id}`,{
        ...formData
    },
    {
        headers: {
            Authorization: token
        }
    });
    return result?.data;
}


export {
    getCustomerById,
    getCustomers,
    uploadAvatar,
    postCustomer,
    deleteCustomer,
    updateCustomer
}