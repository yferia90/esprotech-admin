import { getCustomers } from '../api/Customer.api';

const handlerListCustomers = async ({ token }) => {
    const companies = await getCustomers({ token });
    return companies?.company;
}

const CustomerHandler = ({ token }) => ({
    handlerListCustomers: () => handlerListCustomers({ token }),
});

export default CustomerHandler;