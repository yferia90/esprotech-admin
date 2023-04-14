import { updateFetchAxios, fetchAxios } from '../../../utils/configAxios';

const handlerSubmitLogin = async ({ formData, setToken, setUser }) => {
    try {
        const result = await fetchAxios.post('auth/logIn', formData);
        const status = result?.data?.status;
        const token = result?.data?.data?.token;
        const user = result?.data?.data?.user;
        if(status === 200){
            setToken(token);
            setUser(user);
            localStorage.setItem('user',JSON.stringify(result.data));
            updateFetchAxios(token);
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
}

const LoginHandler = ({ setToken, setUser }) => ({
    handlerSubmitLogin: (formData) => handlerSubmitLogin({ formData, setToken, setUser }),
});

export default LoginHandler;