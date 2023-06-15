import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyHandler from '../handlers/Company.handler';

const CompanyDetailHook = ({ token }) => {
    let { id } = useParams();
    const [company, setCompany] = useState([]);
    const [users, setUsers] = useState([]);
    const { handlerGetCompanyById } = CompanyHandler({ token });
    
    const searchGetCompany = async () => {
        const { company, usersCompany } = await handlerGetCompanyById({ id });
        console.log("usersCompany company",{ company, usersCompany });
        setCompany(company);
        setUsers(usersCompany);
    }

    useEffect(() => {
        document.title = 'Detalles del negocio';
        searchGetCompany();
    }, [])

    return {
        company,
        users
    }
}

export default CompanyDetailHook;