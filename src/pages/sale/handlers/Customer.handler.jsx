import Env from '../../../../env';
import { 
    getCustomerById,
    getCustomers, 
    uploadAvatar, 
    postCustomer,
    deleteCustomer,
    updateCustomer,
} from '../api/Customer.api';

const getUrl = ({ avatar }) => {
    const url = avatar ? `${Env.REACT_APP_BACKEND}files?path=${avatar}` : undefined;
    return url;
}

const handlerListCustomers = async ({ token, customer, page, size }) => {
    const customers = await getCustomers({ token, customer, page, size });
    return customers?.customers;
}

const uploadAvatarCustomer = async ({ token, formData }) => {
    const result = await uploadAvatar({ token, formData });
    return result;
}

const handlerSubmitCustomer = async ({ token, formData }) => {
    try {
        let result = await postCustomer({ formData, token });
        const status = result?.data?.status;
        if (status === 200) {
            const customer = result?.data?.data?.customer;
            return customer;
        }
        return null;
    } catch (err) {
        return null;
    }
}

const handlerDeleteCustomer = async ({ token, id }) => {
    try {
        let result = await deleteCustomer({ id, token });
        const status = result?.data?.status;
        if (status === 200) {
            return true;
        }else return false;
    } catch (err) {
        return false;
    }
}

const handlerGetCustomerById = async ({ token, id }) => {
    const customer = await getCustomerById({ token, id });
    return customer?.data?.customer;
}

const handlerUpdateCustomer = async ({ token, formData, id }) => {
    const customer = await updateCustomer({ token, formData, id });
    return customer?.data?.customer;
}

const CustomerHandler = ({ token }) => ({
    getUrl: ({ avatar }) => getUrl({ avatar }),
    handlerListCustomers: ({ customer, page, size }) => handlerListCustomers({ token, customer, page, size }),
    uploadAvatarCustomer: ({ formData }) => uploadAvatarCustomer({ token, formData }),
    handlerSubmitCustomer: ({ formData }) => handlerSubmitCustomer({ token, formData }),
    handlerDeleteCustomer: ({ id }) => handlerDeleteCustomer({ token, id }),
    handlerGetCustomerById: ({ id }) => handlerGetCustomerById({ token, id }),
    handlerUpdateCustomer: ({ formData, id }) => handlerUpdateCustomer({ token, formData, id }),

});

export default CustomerHandler;