import { updatePerfilUser } from '../../../utils/Api';

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

const ProfileHandler = ({ setUser, token }) => ({
    handlerSubmiProfile: ({ formData, userId }) => handlerSubmiProfile({ formData, userId, setUser, token }),
});

export default ProfileHandler;