import { useState, useEffect } from 'react';
import { useAppContext } from '../../../contexts/App.context';

const UseDataUser = () => {
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [mobile, setMobile] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [companies, setCompanies] = useState([]);
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
    const [address, setAddress] = useState({});
    const [addressId, setAddressId] = useState(null);
    const [TbUserId, setTbUserId] = useState(null);
    // Avatar del usuario
    const [avatar, setAvatar] = useState('https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg');
    const { user, token, setUser } = useAppContext();

    useEffect(() => {
        console.log("Modelo de usuario!!!!!!!!!",user);
        const { firstName, lastName, email, mobile, id, companies } = user;
        let address = user?.address || [];
        const fullName = `${firstName} ${lastName}`;
        setAddress(address);
        setUserId(id);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setFullName(fullName);
        setMobile(mobile);
        setCompanies(companies);
    }, [user]);

    useEffect(() => {
        let fullAddress = Object.keys(address).length > 0 ? address[0]?.fullAddress : {};
        const postalCode = address[0]?.postalCode || '';
        const tbUserId = address[0]?.TbUserId || null;
        const addreesId = address[0]?.id || null;
        const description = address[0]?.description || '';
        setPostalCode(postalCode);
        setDescription(description);
        setTbUserId(tbUserId);
        setAddressId(addreesId);

        if (fullAddress !== undefined && fullAddress.length > 0) {
            fullAddress = JSON.parse(fullAddress);
            const street = fullAddress?.street || '';
            const countryId = fullAddress?.countryId || '';
            const stateId = fullAddress?.stateId || '';
            const municipalityId = fullAddress?.municipalityId || '';
            const locationId = fullAddress?.locationId || '';
            setCountry(countryId);
            setState(stateId);
            setMunicipality(municipalityId);
            setLocation(locationId);
            setStreet(street);
        }
    }, [address]);

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
        TbUserId, setTbUserId,
        addressId, setAddressId,
        setAddress, companies, setCompanies
    }
}

export default UseDataUser;