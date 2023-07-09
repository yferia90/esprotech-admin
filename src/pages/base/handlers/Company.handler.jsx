import { getCompanies, getCompanyById, postCompany, putCompany } from '../api/Company.api';

const handlerListCompanies = async ({ token, page, size }) => {
    const companies = await getCompanies({ token, page, size });
    return companies?.companies;
}

const handlerGetCompanyById = async ({ token, id }) => {
    const company = await getCompanyById({ token, id });
    return {
        company: company?.company,
        usersCompany: company?.company?.users,
    }
}

const handlerPostCompany = async ({ token, payload }) => {
    const company = await postCompany({ token, payload });
    return Object.keys(company).length > 0 ? company?.company : null;
}

const handlerPutCompany = async ({ token, payload, id }) => {
    const company = await putCompany({ token, payload, id });
    return Object.keys(company).length > 0 ? company?.company : null;
}

const CompanyHandler = ({ token }) => ({
    handlerListCompanies: ({ page, size }) => handlerListCompanies({ token, page, size }),
    handlerGetCompanyById: ({ id }) => handlerGetCompanyById({ token, id}),
    handlerPostCompany: ({ payload }) => handlerPostCompany({ token, payload }),
    handlerPutCompany: ({ payload, id }) => handlerPutCompany({ token, payload, id }),
});

export default CompanyHandler;