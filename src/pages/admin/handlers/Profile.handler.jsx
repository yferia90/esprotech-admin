import Env from '../../../../env';
import { 
    updatePerfilUser,  
    createAddreesUser,
    updateAddreesUser,
    deleteAddressUser,
    allAddressUser
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

const handlerSubmiAddress = async ({ addressId, formData, token, userId }) => {
    try {
        let result = (addressId === null 
            ? await createAddreesUser({ formData, token, userId })
            : await updateAddreesUser({ formData, token, addressId }));
        const status = result?.data?.status;
        const address = addressId === null  
            ? result?.data?.data?.user?.address
            : result?.data?.data?.address;
        if (status === 200) {
            return address;
        }
        return null
    } catch (err) {
        return null;
    }
}

const deleteAddress = async ({ token, id }) => {
    try{
        const result = await deleteAddressUser({ token, id });
        const status = result?.data.status;
        if (status === 200) {
            return true;
        }
    }catch(e) {
        return false;
    }
}

const allAddressByUser = async ({ token, userId }) => {
    try{
        const result = await allAddressUser({ token, userId });
        const status = result?.data.status;
        if (status === 200) {
            const address = result?.data?.data?.address;
            return address;
        }
        return null;
    }catch(e) {
        return null;
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

const ProfileHandler = ({ setUser, token }) => ({
    getUrl: ({ avatar }) => getUrl({ avatar }),
    changeUserEmail: ({ formData, userId, setUser }) => changeUserEmail({ token, formData, userId, setUser }),
    changeUserPassword: ({ formData }) => changeUserPassword({ token, formData}),
    uploadFileProfile: ({ formData }) => uploadFileProfile({ token, formData }),
    handlerSubmiProfile: ({ formData, userId }) => handlerSubmiProfile({ formData, userId, setUser, token }),
    handlerSubmiAddress: ({ addressId, formData, userId }) => handlerSubmiAddress({ formData, token, userId, addressId }),
    deleteAddress: ({ id }) => deleteAddress({ token, id }),
    allAddressByUser: ({ userId }) => allAddressByUser({ token, userId }),
});

export default ProfileHandler;