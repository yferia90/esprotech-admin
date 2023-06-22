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

export {
    getCustomers,
}