import Env from '../../../../env';
import { 
    updatePerfilUser,  
    createAddreesUser,
    updateAddreesUser 
} from '../../../utils/Api';
import {
    getFile, 
    uploadFile,
    changeEmail, 
    changePassword    
} from '../api/Profile.api';

const getUrl = ({ avatar }) => {
    const url = `${Env.REACT_APP_BACKEND}/files?path=${avatar}`;
    return url;
}

const uploadFileProfile = async ({ token, formData }) => {
    const result = await uploadFile({ token, formData });
    return result;
}

const handlerSubmiProfile = async ({ formData, userId, setUser, token }) => {
    try {
        const result = await updatePerfilUser({ formData, userId, token });
        const status = result?.data?.status;
        const user = result?.data?.data?.user;
        if (status === 200) {
            setUser(user);
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
}

const handlerSubmiAddress = async ({ addressId, formData, token, userId, setAddress }) => {
    try {
        let result = (addressId === null 
            ? await createAddreesUser({ formData, token, userId })
            : await updateAddreesUser({ formData, token, addressId }));
        const newAddress = [];
        const status = result?.data?.status;
        const address = result?.data?.data?.address;
        if (status === 200) {
            newAddress.push(address);
            setAddress(newAddress);
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

const changeUserEmail = async ({ token, formData, userId, setUser }) => {
    try {
        const result = await changeEmail({ formData, userId, token });
        const status = result?.status;
        const user = result?.data?.user;
        if (status === 200) {
            setUser(user);
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

const changeUserPassword = async ({ token, formData }) => {
    try {
        const result = await changePassword({ formData, token });
        const status = result?.status;
        if (status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

const ProfileHandler = ({ setUser, setAddress, token }) => ({
    getUrl: ({ avatar }) => getUrl({ avatar }),
    changeUserEmail: ({ formData, userId, setUser }) => changeUserEmail({ token, formData, userId, setUser }),
    changeUserPassword: ({ formData }) => changeUserPassword({ token, formData}),
    uploadFileProfile: ({ formData }) => uploadFileProfile({ token, formData }),
    handlerSubmiProfile: ({ formData, userId }) => handlerSubmiProfile({ formData, userId, setUser, token }),
    handlerSubmiAddress: ({ addressId, formData, userId }) => handlerSubmiAddress({ formData, token, userId, addressId, setAddress }),
});

export default ProfileHandler;