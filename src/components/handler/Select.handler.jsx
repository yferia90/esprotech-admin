import {
    listCountry,
    listState,
    listMunicipality,
    listLocation
} from '../../utils/Api';

const getDataLocation = ({ municipalityId = null, setDataLocation, token }) => {
    listLocation({ url: 'locality', token, id: municipalityId }).then((result) => {
        const localities = result?.data?.data?.localities;
        const status = result?.data?.status;
        if (status === 200) {
            setDataLocation(localities);
        }
    })
}

const getDataMunicipality = ({ stateId = null, setDataMunicipality, token }) => {
    listMunicipality({ url: 'municipality', token, id: stateId }).then((result) => {
        const municipalities = result?.data?.data?.municipalities;
        const status = result?.data?.status;
        if (status === 200) {
            setDataMunicipality(municipalities);
        }
    })
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
        getCountries: ({ setDataCountries }) => getDataCountry({ setDataCountries, token }),
        getStatesByCountry: ({ setDataStates, countryId }) => getDataState({ countryId, setDataStates, token }),
        getMunicipalityByState: ({ setDataMunicipality, stateId }) => getDataMunicipality({ stateId, setDataMunicipality, token }),
        getLocationByMunicipality: ({ setDataLocation, municipalityId }) => getDataLocation({ municipalityId, setDataLocation, token }),
    }
}

export default SelectHandler;