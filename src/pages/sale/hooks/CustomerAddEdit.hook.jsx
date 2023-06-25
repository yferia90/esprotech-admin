import { useState, useEffect } from 'react';
import CustomerHandler from '../handlers/Customer.handler';

const CustomerAddEditHook = ({ token, companyId }) => {
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [mode, setMode] = useState('card');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [avatar, setAvatar] = useState('');
    const [filePreview, setFilePreview] = useState('');
    const [errorUploadFile, setErrorUploadFile] = useState(false);
    const [isClient] = useState(true);

    const [titleForm, setTitleForm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errorSubmit, setErrorAddForm] = useState(false);
    const [warningForm, setWarningForm] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [addForm, setAddForm] = useState(false);
    const [addModal, setAddModal] = useState(true);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [updateCustomers, setUpdateCustomers] = useState(false);

    const { 
        getUrl,
        uploadAvatarCustomer, 
        handlerSubmitCustomer,
        handlerDeleteCustomer,
        handlerListCustomers
    } = CustomerHandler({ token });

    const searchListCustomer = async () => {
        const customers = await handlerListCustomers();
        const avatarCustomers = customers.map(item => {
            if(item?.avatar) {
                const customer = {...item, avatar: getUrl({ avatar: item?.avatar })};
                return customer;
            }
            return item;
        })
        setCustomers(avatarCustomers);
        setUpdateCustomers(false);
        setLoading(false);
    }

    useEffect(() => {
        document.title = 'Listado de clientes';
        searchListCustomer();
    }, []);

    useEffect(() => {
        if(updateCustomers){            
            searchListCustomer();            
        }
    }, [updateCustomers]);


    const clearFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobile('');
        setAvatar('');
        setFilePreview('');
    }

    const handlerCancelForm = () => {
        clearFields();
        setShowModal(false);
    }

    const handlerMessageError = () => {
        setErrorAddForm(true);
        setTimeout(() => {
            setErrorAddForm(false);
        }, 5000);
    }

    const handlerMessageSuccess = () => {
        setAddForm(true);
        clearFields();        
        setShowModal(false);
        setTimeout(() => {
            setAddForm(false);
        }, 5000);
    }

    const handlerDelete = async (id) => {
        const result = await handlerDeleteCustomer({ id, customers });
        if(result){
            setUpdateCustomers(true);
            setMessageSuccess("El cliente fue eliminado satisfactoriamente");
            handlerMessageSuccess();
        }else{
            setMessageError("Ups, ocurrió un error eliminando el cliente");
            handlerMessageError();
        }
        
    }

    const handlerSubmitForm = async () => {        
        const formData = { firstName, lastName, email, mobile, avatar, isClient, companyId };
        const result = await handlerSubmitCustomer({ customers, setCustomers, formData });
        if(result){
            setMessageSuccess("El cliente fue guardado satisfactoriamente");
            handlerMessageSuccess();
        }else{
            setMessageError("Ups, ocurrió un error creando el cliente");
            handlerMessageError();
        }
    }

    const handlerFileChange = async (evt) => {
        if(evt!==null){
          const _file = evt.target.files[0];
          let formData = new FormData();
          formData.append('file', _file);
          const fileUpload = await uploadAvatarCustomer({ formData });          
          if(!fileUpload.error){
            setFilePreview(URL.createObjectURL(_file));
            setAvatar(fileUpload?.data?.path);
            return;
          }
          setMessageError("Ups, vuelva a intentarlo.");
          handlerMessageError();
        }
    }

    const handlerClickShowModal = ({ addDetail = false }) => {
        setTitleForm('Nuevo cliente');
        setAddModal(true);        
        setShowModal(true);
    }

    return {
        filePreview, setFilePreview, errorUploadFile, firstName, setFirstName,
        lastName, setLastName, email, setEmail, mobile, setMobile,
        avatar, setAvatar, titleForm, showModal, saving,
        handlerCancelForm, handlerSubmitForm, handlerClickShowModal,
        errorSubmit, warningForm, addForm, handlerFileChange, messageSuccess,
        messageError, handlerDelete, customers, loading, setCustomers,
        mode, setMode
    }
}

export default CustomerAddEditHook;