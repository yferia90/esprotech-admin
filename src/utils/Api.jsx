import axios from 'axios';
import Env from '../../env';

const updatePerfilUser = async ({ formData, userId, token }) => {
    const result = await axios.put(`${Env.REACT_APP_BACKEND}auth/profile/${userId}`, { ...formData }, {
        headers: {
            Authorization: token
        }
    });
    return result;
}

const updateAddreesUser = async ({ formData, token, addressId }) => {
    const result = await axios.put(`${Env.REACT_APP_BACKEND}address/${addressId}`, { ...formData }, {
        headers: {
            Authorization: token
        }
    });
    return result;
}

const createAddreesUser = async ({ formData, token, userId }) => {
    const result = await axios.post(`${Env.REACT_APP_BACKEND}address`, { ...formData, TbUserId: userId }, {
        headers: {
            Authorization: token
        }
    });
    return result;
}


const listCountry = async ({ url, token }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}${url}`, {
        headers: {
            Authorization: token
        }
    });
    return result;
}

const listState = async ({ url, id, token }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}${url}?countryId=${id}`, {
        headers: {
            Authorization: token
        }
    });
    return result;
}

const listMunicipality = async ({ url, id, token }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}${url}?stateId=${id}`, {
        headers: {
            Authorization: token
        }
    });
    return result;
}

const listLocation = async ({ url, id, token }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}${url}?municipalityId=${id}`, {
        headers: {
            Authorization: token
        }
    });
    return result;
}

export {
    updatePerfilUser,
    updateAddreesUser,
    createAddreesUser,
    listCountry,
    listState,
    listMunicipality,
    listLocation
}