import { getUsers, getUserId } from "../api/User.api";

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
    console.log('Detalle del usuario!!!',user);
    return user?.user;
}

const UserHandler = ({ token }) => ({
    handlerListUsers: () => handlerListUsers({ token }),
    handlerGetUserById: ({ id }) => handlerGetUserById({ token, id})

});

export default UserHandler;