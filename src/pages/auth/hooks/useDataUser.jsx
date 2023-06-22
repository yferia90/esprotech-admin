import { useState, useEffect } from 'react';
import { useAppContext } from '../../../contexts/App.context';

import ProfileHandler from '../../admin/handlers/Profile.handler';

const UseDataUser = () => {
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState();
    const [firstName, setFirstName] = useState('');
    const [mobile, setMobile] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [newMail, setNewMail] = useState('');
    const [repeatEmail, setRepeatEmail] = useState('');
    const [companies, setCompanies] = useState([]);
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');
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
    const [avatar, setAvatar] = useState('');
    const [filePreview, setFilePreview] = useState('');
    const [errorUploadFile, setErrorUploadFile] = useState(false);
    const [addPersonalData, setPersonalData] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [saving, setSaving] = useState(false);    
    const [changeEmail, setChangeEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [warningChangeEmailPassword, setWarningChangeEmailPassword] = useState(false);
    const [titleChangeEmailPassword, setTitleChangeEmailPassword] = useState('');
    const { user, token, setUser } = useAppContext();

    const { 
        handlerSubmiProfile, 
        uploadFileProfile, 
        handlerSubmiAddress,
        getUrl,
        changeUserEmail,
        changeUserPassword
    } = ProfileHandler({ setUser, setAddress, token });

    useEffect(() => {
        const { avatar, firstName, lastName, email, mobile, id, companies } = user;
        let address = user?.address || [];
        const fullName = `${firstName} ${lastName}`;
        setAddress(address);
        setUserId(id);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setFullName(fullName);
        setMobile(mobile);
        setAvatar(avatar);
        if(avatar)setFilePreview(getUrl({ avatar }));
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

    const handlerCancelForm = () => {
        setChangeEmail(false);
        setShowModal(false);
    }

    const handlerMessageError = () => {
        setErrorUploadFile(true);
        setTimeout(() => {
            setErrorUploadFile(false);
        }, 5000);
    }

    const handlerMessageSuccess = () => {
        setPersonalData(true);
        setTimeout(() => {
            setPersonalData(false);
        }, 5000);
    }

    const handlerFileChange = async (evt) => {
        if(evt!==null){
          const _file = evt.target.files[0];
          setFilePreview(URL.createObjectURL(_file));
          let formData = new FormData();
          formData.append('file', _file);
          const fileUpload = await uploadFileProfile({ formData });
          if(!fileUpload.error){
            setAvatar(fileUpload?.data?.path);
            return;
          }
          setMessageError("Ups, vuelva a intentarlo.");
          handlerMessageError();
        }
    }

    const handlerSubmitDatosPersonales = async () => {
        const formData = { avatar, firstName, lastName, mobile, numFijo };
        const result = await handlerSubmiProfile({ userId, formData });
        if(result){
            setMessageSuccess("Sus datos personaes fueron actualizados correctamente");
            handlerMessageSuccess();
        }else{
            setMessageError("Ups, ocurrió un problema guardando sus datos personales");
            handlerMessageError();
        }
    }

    const handlerSubmitDatosDireccion = async () => {
        const formData = {
            postalCode,
            description,
            fullAddress: JSON.stringify({ street, countryId, stateId, municipalityId, locationId })
        };
        const result = await handlerSubmiAddress({ userId, addressId, formData });
        if(result){
            setMessageSuccess("La dirección fue actualizada correctamente");
            handlerMessageSuccess();
        }else{
            setMessageError("Ups, ocurrió un problema actualizando la dirección");
            handlerMessageError();
        }
    }

    const messageValidaciones = () => {
        setWarningChangeEmailPassword(true);
        setTimeout(() => {
            setWarningChangeEmailPassword(false);
        },5000);
        
    }

    const clearFields = () => {
        setRepeatEmail('');
        setNewMail('');
        setPassword('');
        setNewPassword('');
    }

    const handlerSubmitForm = async () => {
        if(changeEmail) {
            if(newMail !== repeatEmail){
                messageValidaciones();
                setTitleChangeEmailPassword('El correo debe coincidir');
                return;
            }
            if(newMail==='' || repeatEmail===''){
                messageValidaciones();
                setTitleChangeEmailPassword('Los campos no pueden estar vacíos');
                return;
            }
        } else {
            if(password==='' || newPassword===''){
                messageValidaciones();
                setTitleChangeEmailPassword('Los campos no pueden estar vacíos');
                return;
            }
        }
        const result = (changeEmail 
            ? await changeUserEmail({ formData: { email: newMail }, userId, setUser }) 
            : await changeUserPassword({ formData: { oldPassword: password, newPassword } }));
        if(result){
            setShowModal(false);
            if(!changeEmail){
                setMessageSuccess("La contraseña fue actualizada correctamente");
            } else setMessageSuccess("El correo fue actualizado correctamente");
            setChangeEmail(false);
            handlerMessageSuccess();
            clearFields();
        }else{
            (changeEmail
                ? setMessageError("Ups, ocurrió un problema actualizando el correo")
                : setMessageError("Ups, ocurrió un problema actualizando la contraseña"))                
            handlerMessageError();
        }
    }

    return {
        userId, fullName, email, newMail, setNewMail, filePreview, 
        setFilePreview, firstName, setFirstName, lastName,
        setLastName, mobile, setMobile, numFijo,
        setNumFijo, postalCode, setPostalCode,
        street, setStreet, countryId, setCountry,
        stateId, setState,locationId, setLocation,
        description, setDescription, dataCountries, setDataCountries, token,
        dataStates, setDataStates,dataLocation, setDataLocation, setUser,
        municipalityId, setMunicipality,
        dataMunicipality, setDataMunicipality,
        TbUserId, setTbUserId, addressId, setAddressId, setShowModal,
        setAddress, companies, setCompanies,
        handlerSubmitDatosPersonales, setTitleModal,
        handlerFileChange, handlerSubmitDatosDireccion,
        errorUploadFile, messageError, messageSuccess,
        addPersonalData, showModal, titleModal, saving,
        handlerCancelForm, handlerSubmitForm, setChangeEmail, changeEmail,
        repeatEmail, setRepeatEmail, warningChangeEmailPassword,
        titleChangeEmailPassword, password, setPassword, 
        setNewPassword, newPassword, showPassword, setShowPassword,
        showNewPassword, setShowNewPassword
    }
}

export default UseDataUser;