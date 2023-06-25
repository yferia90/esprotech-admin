import Env from '../../../../env';
import { 
    getCustomers, 
    uploadAvatar, 
    postCustomer,
    deleteCustomer
} from '../api/Customer.api';

const getUrl = ({ avatar }) => {
    const url = avatar ? `${Env.REACT_APP_BACKEND}files?path=${avatar}` : undefined;
    return url;
}

const handlerListCustomers = async ({ token }) => {
    const customers = await getCustomers({ token });
    return customers?.customers;
}

const uploadAvatarCustomer = async ({ token, formData }) => {
    const result = await uploadAvatar({ token, formData });
    return result;
}

const handlerSubmitCustomer = async ({ customers, setCustomers, token, formData }) => {
    try {
        let result = await postCustomer({ formData, token });
        const status = result?.data?.status;
        let customer = result?.data?.data?.customer;
        if (status === 200) {
            customer = {...customer, avatar: getUrl({ avatar: customer?.avatar })};
            customers.unshift(customer);
            setCustomers(customers);
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

const handlerDeleteCustomer = async ({ token, id }) => {
    try {
        let result = await deleteCustomer({ id, token });
        const status = result?.data?.status;
        if (status === 200) {            
            return true;
        }else return [];
    } catch (err) {
        return [];
    }
}

const CustomerHandler = ({ token }) => ({
    getUrl: ({ avatar }) => getUrl({ avatar }),
    handlerListCustomers: () => handlerListCustomers({ token }),
    uploadAvatarCustomer: ({ formData }) => uploadAvatarCustomer({ token, formData }),
    handlerSubmitCustomer: ({ customers, setCustomers, formData }) => handlerSubmitCustomer({ customers, setCustomers, token, formData }),
    handlerDeleteCustomer: ({ id }) => handlerDeleteCustomer({ token, id }),

});

export default CustomerHandler;