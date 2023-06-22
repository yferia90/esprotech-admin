import { useState, useEffect } from 'react';
import CustomerHandler from '../handlers/Customer.handler';

const CustomerHook = ({ token }) => {
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);

    const { handlerListCustomers } = CustomerHandler({ token });
    
    const searchListCustomer = async () => {
        const customers = await handlerListCustomers();
        console.log('Customers!!!',customers);
        setCustomers(customers);
        setLoading(false);
    }

    useEffect(() => {
        document.title = 'Listado de clientes';
        searchListCustomer();
    }, [])

    return {
        customers,
        loading,
        setCustomers
    }
}

export default CustomerHook;