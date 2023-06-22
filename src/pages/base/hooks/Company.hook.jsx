import { useState, useEffect } from 'react';
import CompanyHandler from '../handlers/Company.handler';

const CompanyHook = ({ token }) => {
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const { handlerListCompanies } = CompanyHandler({ token });
    
    const searchListCompany = async () => {
        const companies = await handlerListCompanies();
        setCompanies(companies);
        setLoading(false);
    }

    useEffect(() => {
        document.title = 'Listado de negocios';
        searchListCompany();
    }, [])

    return {
        companies,
        loading,
        setCompanies
    }
}

export default CompanyHook;