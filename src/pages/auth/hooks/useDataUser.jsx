import { useState, useEffect } from 'react';
import { useAppContext } from '../../../contexts/App.context';

const UseDataUser = () => {
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [mobile, setMobile] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [numFijo, setNumFijo] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [street, setStreet] = useState('');
    const [countryId, setCountry] = useState('');
    const [stateId, setState] = useState('');
    const [municipalityId, setMunicipality] = useState('');
    const [locationId, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [dataCountries, setDataCountries] = useState([]);
    const [dataStates, setDataStates] = useState([]);
    const [dataMunicipality, setDataMunicipality] = useState([]);
    const [dataLocation, setDataLocation] = useState([]);
    const [fullAddress, setFullAddress] = useState({});
    const [avatar, setAvatar] = useState('https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg');
    const { user, token, setUser } = useAppContext();

    useEffect(() => {
        const { firstName, lastName, email, mobile, id } = user;
        let { address } = user;
        let fullAddress = address?.fullAddress || '';
        fullAddress = fullAddress.length > 0 ? JSON.parse(fullAddress) : {};
        const postalCode = address?.postalCode || '';
        const description = address?.description || '';
        const street = fullAddress.street || '';
        const countryId = fullAddress.countryId || '';
        const stateId = fullAddress.stateId || '';
        const municipalityId = fullAddress.municipalityId || '';
        const locationId = fullAddress.locationId || '';
        const fullName = `${firstName} ${lastName}`;
        setUserId(id);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setFullName(fullName);
        setMobile(mobile);
        setPostalCode(postalCode);
        setDescription(description);
        setStreet(street);
        setFullAddress(fullAddress);
        setCountry(countryId);
        setState(stateId);
        setMunicipality(municipalityId);
        setLocation(locationId);
    }, [user]);

    return {
        userId,
        fullName,
        email,
        avatar,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        mobile,
        setMobile,
        numFijo,
        setNumFijo,
        postalCode, setPostalCode,
        street, setStreet,
        countryId, setCountry,
        stateId, setState,
        locationId, setLocation,
        description, setDescription,
        dataCountries, setDataCountries, token,
        dataStates, setDataStates,
        dataLocation, setDataLocation, setUser,
        municipalityId, setMunicipality,
        dataMunicipality, setDataMunicipality,
        fullAddress, setFullAddress
    }
}

export default UseDataUser;