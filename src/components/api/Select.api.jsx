import axios from 'axios';
import Env from '../../../env';

const getData = async ({ token, url }) => {
    const result = await axios.get(`${Env.REACT_APP_BACKEND}/${url}`, {
        headers: {
            Authorization: token
        }
    });
    return result?.data?.data;
}

export {
    getData
}