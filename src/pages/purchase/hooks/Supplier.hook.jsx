import { useState, useEffect } from 'react';

const SupplierHook = ({ token }) => {
    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    
    // const searchListCompany = async () => {
    //     const companies = await handlerListCompanies();
    //     setCompanies(companies);
    //     setLoading(false);
    // }

    useEffect(() => {
        document.title = 'Listado de proveedores';
        // searchListCompany();
    }, [])

    return {
        suppliers,
        loading,
        setSuppliers
    }
}

export default SupplierHook;