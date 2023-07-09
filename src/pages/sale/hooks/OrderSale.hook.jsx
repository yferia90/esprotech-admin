import { useState, useEffect } from 'react';

const OrderSaleHook = ({ token }) => {
	    const [records, setRecords] = useState();
    	const [loading, setLoading] = useState(false);

	return {
		records,
		loading
	}
}

export default OrderSaleHook;