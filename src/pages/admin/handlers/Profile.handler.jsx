import { updatePerfilUser, updateAddreesUser, createAddreesUser } from '../../../utils/Api';

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
        let result;
        if(addressId !== null){
            result = await updateAddreesUser({ formData, token, addressId });
        }else {
            result = await createAddreesUser({ formData, token, userId });
        }
        const newAddress = [];
        const status = result?.data?.status;
        const address = result?.data?.data?.address;
        if (status === 200) {
            newAddress.push(address);
            setAddress(newAddress);
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
}

const ProfileHandler = ({ setUser, setAddress, token }) => ({
    handlerSubmiProfile: ({ formData, userId }) => handlerSubmiProfile({ formData, userId, setUser, token }),
    handlerSubmiAddress: ({ addressId, formData, userId }) => handlerSubmiAddress({ addressId, formData, token, userId, setAddress }),
});

export default ProfileHandler;