import { useState, useEffect } from 'react';
import _ from 'lodash';
import CustomerHandler from '../handlers/Customer.handler';

const CustomerAddEditHook = ({ token, companyId }) => {
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [mode, setMode] = useState('card');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [avatar, setAvatar] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const [errorUploadFile, setErrorUploadFile] = useState(false);
    const [isClient] = useState(true);
    const [editCustomer, setIdEditCustomer] = useState('');
    const [titleForm, setTitleForm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errorSubmit, setErrorAddForm] = useState(false);
    const [warningForm, setWarningForm] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [addForm, setAddForm] = useState(false);
    const [isCreateForm, setIsCreateForm] = useState(true);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [isUpdateCustomers, setIsUpdateCustomers] = useState(false);

    const { 
        getUrl,
        uploadAvatarCustomer, 
        handlerSubmitCustomer,
        handlerDeleteCustomer,
        handlerListCustomers,
        handlerGetCustomerById,
        handlerUpdateCustomer,
    } = CustomerHandler({ token });

    const searchListCustomer = async () => {
        const customers = await handlerListCustomers();
        const allCustomers = customers.map(item => {
            if(item?.avatar) {
                const customer = {...item, avatar: getUrl({ avatar: item?.avatar })};
                return customer;
            }
            return item;
        })
        setCustomers(allCustomers);
        setIsUpdateCustomers(false);
        setLoading(false);
    }

    useEffect(() => {
        document.title = 'Listado de clientes';
        searchListCustomer();
    }, []);

    useEffect(() => {
        if(isUpdateCustomers) searchListCustomer();
    }, [isUpdateCustomers]);


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

    const handlerDelete = async ({ id }) => {
        const result = await handlerDeleteCustomer({ id });
        if(result){
            // Se notifica al cliente que el registro fue eliminado
            setMessageSuccess("El cliente fue eliminado satisfactoriamente");
            setIsUpdateCustomers(true);
            handlerMessageSuccess();
        }else{
            setMessageError("Ups, ocurrió un error eliminando el cliente");
            handlerMessageError();
        }        
    }

    const getDataCustomer = async ({ id }) => {
        const customer = await handlerGetCustomerById({ id });
        if (_.isUndefined(customer) || _.isEmpty(customer)) {
            setMessageError("Ups, ocurrió un error, intente más tarde editar el cliente");
            handlerMessageError();
        } else {
            setFirstName(customer?.firstName || '');
            setLastName(customer?.lastName || '');
            setEmail(customer?.email || '');
            setMobile(customer?.mobile || '');
            setAvatar(customer?.avatar || '');
            const _preview =  customer?.avatar 
                ? getUrl({ avatar: customer?.avatar })
                : ''
            setFilePreview(_preview);
            setIdEditCustomer(id);
        }
    }

    const handlerEdit = async ({ id }) => {
        setTitleForm('Editar cliente');
        setShowModal(true);
        setIsCreateForm(false);
        getDataCustomer({ id });
    }

    const handlerSubmitForm = async () => {
        const formData = {
            firstName, lastName, 
            email, mobile, avatar, 
            isClient, companyId 
        };
        setSaving(true);
        const customer = (isCreateForm
            ? await handlerSubmitCustomer({ formData }) 
            : await handlerUpdateCustomer({ formData, id: editCustomer }));
        setSaving(false);
        setShowModal(false);
        if(!_.isNil(customer)){
            // Notificación al cliente de la operación success
            setMessageSuccess(`El cliente fue ${isCreateForm ? 'guardado' : 'actualizado'} satisfactoriamente`);
            handlerMessageSuccess();
            setIsUpdateCustomers(true);
        }else {
            // Notificación al cliente de la operación error
            setMessageError(`Ups, ocurrió un error ${isCreateForm ? 'guardando' : 'actualizando'} el cliente`);
            handlerMessageError();
        }
    }

    const handlerFileChange = async (evt) => {
      evt.preventDefault();
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

    const handlerClickShowModal = ({ addDetail = false }) => {
        setTitleForm('Nuevo cliente');
        setIsCreateForm(true);        
        setShowModal(true);
    }

    return {
        filePreview, setFilePreview, errorUploadFile, firstName, setFirstName,
        lastName, setLastName, email, setEmail, mobile, setMobile,
        avatar, setAvatar, titleForm, showModal, saving,
        handlerCancelForm, handlerSubmitForm, handlerClickShowModal,
        errorSubmit, warningForm, addForm, handlerFileChange, messageSuccess,
        messageError, handlerDelete, customers, loading, setCustomers,
        mode, setMode, handlerEdit
    }
}

export default CustomerAddEditHook;