import axios from 'axios';
import Env from '../../../../env';

const getCurrencies = async ({ token, page, size }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/currency?page=${page}&&size=${size}`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

export {
    getCurrencies,
}