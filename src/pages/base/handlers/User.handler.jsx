import { 
    getUsers, 
    getUserId,
    uploadAvatar
} from "../api/User.api";

const handlerListUsers = async ({ token }) => {
    const users = await getUsers({ token });
    const listUsers = users?.users;
    let _listUsers = [];
    listUsers.forEach(element => {
        const companies = element.companies.reduce((companies,company) =>  `${companies}, ${company?.name}`,"");
        const user = {
            id: element.id,
            fullName: `${element.firstName} ${element.lastName}`,
            email: element.email,
            companies: companies,
            active: element.active,
        }
        _listUsers.push(user);
    });    
    return _listUsers;
}

const handlerGetUserById = async ({ token, id }) => {
    const user = await getUserId({ token, id });
    return user?.user;
}

const uploadAvatarUser = async ({ token, formData }) => {
    const result = await uploadAvatar({ token, formData });
    return result;
}

const UserHandler = ({ token }) => ({
    handlerListUsers: () => handlerListUsers({ token }),
    handlerGetUserById: ({ id }) => handlerGetUserById({ token, id}),
    uploadAvatarUser: ({ formData }) => uploadAvatarUser({ token, formData})
});

export default UserHandler;