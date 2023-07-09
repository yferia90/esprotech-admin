import { useState, useEffect } from 'react';
import _ from "lodash";

import CompanyHandler from '../handlers/Company.handler';
import { range } from '../../../utils/utils';

const CompanyHook = ({ token }) => {
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);    
    const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
    // Estados del paginado
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rangePaginator, setRangePaginator] = useState([]);
    
    const { handlerListCompanies } = CompanyHandler({ token });

    const searchListCompany = async () => {
        const Allcompanies = await handlerListCompanies({ page, size });
        if(!_.isNil(Allcompanies)){
            setCompanies(Allcompanies?.companies);
            setCurrentPage(Allcompanies?.currentPage);
            setTotalItems(Allcompanies?.totalItems);
            setTotalPages(Allcompanies?.totalPages);
            setRangePaginator(range(1, Allcompanies?.totalPages));
            setIsLoadingCompanies(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        document.title = 'Listado de negocios';
        searchListCompany();
    }, []);

    useEffect(() => {
        if(isLoadingCompanies){
            searchListCompany();
        }
    },[isLoadingCompanies, page]);

    return {
        companies, loading, setCompanies,
        totalPages, page, setPage, rangePaginator,
        setIsLoadingCompanies, currentPage
    }
}

export default CompanyHook;