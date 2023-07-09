import { useState, useEffect } from 'react';
import _ from "lodash";

import CurrencyHandler from '../handlers/Currency.handler';
import { range } from '../../../utils/utils';

const CurrencyHook = ({ token }) => {
	// Carga inicial de la pantalla
	const [currencies, setCurrencies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	// Estados del paginado
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalItems, setTotalItems] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [rangePaginator, setRangePaginator] = useState([]);

	const { handlerListCurrency } = CurrencyHandler({ token });

	const searchListCurrencies = async () => {
		const allCurrencies = await handlerListCurrency({ page, size });
		if(!_.isNil(allCurrencies)){
			setCurrencies(allCurrencies?.currencies);
			setCurrentPage(allCurrencies?.currentPage);
			setTotalItems(allCurrencies?.totalItems);
			setTotalPages(allCurrencies?.totalPages);
			setRangePaginator(range(1, allCurrencies?.totalPages));			
		}
		setIsLoading(false);
		setLoading(false);
	}

	useEffect(() => {
		document.title = 'Listado de monedas';
        searchListCurrencies();
	},[]);

	useEffect(() => {
		if(isLoading){
			searchListCurrencies();
		}
	},[isLoading, page]);

	return {
		currencies, loading, page, setPage, setIsLoading,
		totalPages, rangePaginator, currentPage
	}
}

export default CurrencyHook;