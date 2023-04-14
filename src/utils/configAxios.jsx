import axios from 'axios';
import Env from '../../env';

// Set config defaults when creating the instance
const fetchAxios = axios.create({
    baseURL: `${Env.REACT_APP_BACKEND}`
});

const updateFetchAxios = () => {
    let user = localStorage.getItem('user');
    if(user !== undefined){
        user = JSON.parse(user);
        fetchAxios.defaults.headers.common['Authorization'] = user?.token;
    }
}

export {
    updateFetchAxios,
    fetchAxios,
}
