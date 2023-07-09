import {
    listCountry,
    listState,
    listMunicipality,
    listLocation
} from '../../utils/Api';

import { getData } from '../api/Select.api';
import { getDataTypeSelect } from '../utils/Select.util';

const getAllData = async ({ url, token }) => {
    try{
        let result = await getData({ url, token });
        result = await getDataTypeSelect(url, result);
        return result;
    }catch(err){
        console.log("ERROR",err);
    }
}

const getDataState = ({ countryId = null, setDataStates, token }) => {
    listState({ url: 'state', token, id: countryId }).then((result) => {
        const states = result?.data?.data?.states;
        const status = result?.data?.status;
        if (status === 200) {
            setDataStates(states);
        }
    });
}

const getDataCountry = ({ setDataCountries, token }) => {
    listCountry({ url: 'country', token })
        .then((result) => {
            const countries = result?.data?.data?.countries;
            const status = result?.data?.status;
            if (status === 200) {
                setDataCountries(countries);
            }
        });
}

const SelectHandler = ({ token }) => {
    return {
        getAllData: ({ url }) => getAllData({ token, url }),
        getCountries: ({ setDataCountries }) => getDataCountry({ setDataCountries, token }),
        getStatesByCountry: ({ setDataStates, countryId }) => getDataState({ countryId, setDataStates, token }),
    }
}

export default SelectHandler;