import { useState, useEffect } from 'react';
import _ from 'lodash';

import { useAppContext } from '../../../contexts/App.context';

import ProfileHandler from '../../admin/handlers/Profile.handler';

const UseDataUser = () => {
    const [userId, setUserId] = useState('');
    const [avatar, setAvatar] = useState('');
    const [filePreview, setFilePreview] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [landline, setNumFijo] = useState('');    
    const [email, setEmail] = useState('');
    const [newMail, setNewMail] = useState('');
    const [repeatEmail, setRepeatEmail] = useState('');
    const [companies, setCompanies] = useState([]);
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');


    const [postalCode, setPostalCode] = useState('');
    const [nroHouse, setNroHouse] = useState('');
    const [street, setStreet] = useState('');
    const [countryId, setCountry] = useState('');
    const [stateId, setState] = useState('');
    const [address, setAddress] = useState([]);
    const [addressId, setAddressId] = useState(null);
    const [description, setDescription] = useState('');
    const [addAddres, setAddAddress] = useState(true);
    const [searchAllAddress, setSearchAllAddress] = useState(false);

    const [dataCountries, setDataCountries] = useState([]);
    const [dataStates, setDataStates] = useState([]);
    const [TbUserId, setTbUserId] = useState(null);

    const [errorUploadFile, setErrorUploadFile] = useState(false);
    const [addPersonalData, setPersonalData] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [saving, setSaving] = useState(false);

    // Estados de la modal para insertar y actualizar direcciones
    const [showModalAddress, setShowModalAddress] = useState(false);
    const [titleFormAddress, setTitleFormAddress] = useState('');
    const [savingAddress, setSavingAddress] = useState(false);

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
        allAddressByUser,
        getUrl,
        changeUserEmail,
        changeUserPassword,
        deleteAddress
    } = ProfileHandler({ setUser, setAddress, token });

    useEffect(() => {
        const { avatar, firstName, lastName, email, mobile, landline, id, companies } = user;
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
        setNumFijo(landline);
        if(avatar)setFilePreview(getUrl({ avatar }));
        setCompanies(companies);
    }, [user]);


    const searchAllAddresByUser = async () => {
        const allAddress = await allAddressByUser({ userId });
        if(!_.isNil(allAddress)){
            console.log("All Address", allAddress);
            setAddress(allAddress);
            setSearchAllAddress(false);
        }
    }

    useEffect(() => {
        if(searchAllAddress){
            searchAllAddresByUser();
        }
    },[searchAllAddress]);

    const handlerCancelForm = () => {
        setChangeEmail(false);
        setShowModal(false);
    }

    const handlerModalAddress = () => {
        setTitleFormAddress('Nueva dirección');
        setShowModalAddress(true);
    }

    const clearFieldsAddress = () => {
        setPostalCode('');
        setStreet('');
        setCountry('');
        setState('');
        setDescription('');
        setNroHouse('');
    }

    const handlerCancelFormAddress = () => {
        setShowModalAddress(false);
        clearFieldsAddress();
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
        const formData = { avatar, firstName, lastName, mobile, landline };
        const result = await handlerSubmiProfile({ userId, formData });
        if(result){
            setSearchAllAddress(true);
            setMessageSuccess("Sus datos personales fueron actualizados correctamente");
            handlerMessageSuccess();
        }else{
            setMessageError("Ups, ocurrió un problema guardando sus datos personales");
            handlerMessageError();
        }
    }

    const findAndGetAddres = (id) => {
        const findAddress = address.filter(item => item.id === id);
        setPostalCode(findAddress[0]?.postalCode || '');
        setStreet(findAddress[0]?.street || '');
        setNroHouse(findAddress[0]?.nroHouse || '');
        setCountry(findAddress[0]?.countryId || '');
        setState(findAddress[0]?.stateId || '');
        setDescription(findAddress[0]?.description || ''); 
        setAddressId(findAddress[0]?.id || '')
    }

    const modalUpdateAddress = (id) => {
        setTitleFormAddress('Editar dirección');
        setShowModalAddress(true);
        findAndGetAddres(id);
    }

    const handlerSubmitDatosDireccion = async () => {
        try{
            const formData = {
                postalCode,
                nroHouse,
                street,
                description,
                countryId,
                stateId,
            };
            const result = await handlerSubmiAddress({ userId, addressId, formData });
            if (_.isUndefined(result) || _.isEmpty(result)) {
                setMessageError(`Ups, ocurrió un problema ${addressId === null ? 'creando' : 'actualizando'} la dirección`);
                handlerMessageError();
            }else{
                if(addressId === null){
                    setAddress(result);
                }else {
                    setAddressId(null);
                    setSearchAllAddress(true);
                }                
                handlerCancelFormAddress();
                setMessageSuccess(`La dirección fue ${addressId === null ? 'creada' : 'actualizada'} correctamente`);
                handlerMessageSuccess();
            }
        }catch(e) {
            console.log("ERROR!!!",e);
        }        
    }

    const handlerDeleteAddress = async (id) => {
        const result = await deleteAddress({ id });
        if (result) {
            setSearchAllAddress(true);
            setMessageSuccess(`La dirección fue eliminada correctamente`);
            handlerMessageSuccess();            
        }else {
            setMessageError(`Ups, ocurrió un problema eliminando la dirección`);
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
        setLastName, mobile, setMobile, landline,
        setNumFijo, postalCode, setPostalCode,
        street, setStreet, countryId, setCountry, nroHouse, setNroHouse,
        stateId, setState, description, setDescription, dataCountries,
        setDataCountries, token,dataStates, setDataStates, setUser,
        TbUserId, setTbUserId, addressId, setAddressId, setShowModal,
        setAddress, companies, setCompanies, address,
        handlerSubmitDatosPersonales, setTitleModal,
        handlerFileChange, handlerSubmitDatosDireccion,
        errorUploadFile, messageError, messageSuccess,
        addPersonalData, showModal, titleModal, saving,
        handlerCancelForm, handlerSubmitForm, setChangeEmail, changeEmail,
        repeatEmail, setRepeatEmail, warningChangeEmailPassword,
        titleChangeEmailPassword, password, setPassword, savingAddress,
        setNewPassword, newPassword, showPassword, setShowPassword,
        showNewPassword, setShowNewPassword, handlerCancelFormAddress,
        showModalAddress, setShowModalAddress, titleFormAddress, setTitleFormAddress,
        handlerModalAddress, handlerDeleteAddress, modalUpdateAddress
    }
}

export default UseDataUser;