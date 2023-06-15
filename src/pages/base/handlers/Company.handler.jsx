import { getCompanies, getCompanyById } from '../api/Company.api';

const handlerListCompanies = async ({ token }) => {
    const companies = await getCompanies({ token });
    return companies?.company;
}

const handlerGetCompanyById = async ({ token, id }) => {
    const company = await getCompanyById({ token, id });
    return {
        company: company?.company,
        usersCompany: company?.company?.users,
    }
}

const CompanyHandler = ({ token }) => ({
    handlerListCompanies: () => handlerListCompanies({ token }),
    handlerGetCompanyById: ({ id }) => handlerGetCompanyById({ token, id})
});

export default CompanyHandler;