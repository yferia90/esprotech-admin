import { 
    getCurrencies,
} from '../api/Currency.api';

const handlerListCurrency = async ({ token, page, size }) => {
    const currencies = await getCurrencies({ token, page, size });
    return currencies?.currencies;
}

const GroupHandler = ({ token }) => ({
    handlerListCurrency: ({ page, size }) => handlerListCurrency({ token, page, size }),
});

export default GroupHandler;