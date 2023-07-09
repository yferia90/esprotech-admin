import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';

import { range } from '../../../utils/utils';
import CustomerHandler from '../handlers/Customer.handler';
import CustomerConstant from '../constants/Customer.constant';

const CustomerHook = ({ token, companyId }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [mode, setMode] = useState('list');
    // Estados del los campos del formulario
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [avatar, setAvatar] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const [isClient, setIsClient] = useState(true);
    // Estados del formulario de la modal
    const [errorUploadFile, setErrorUploadFile] = useState(false);    
    const [editCustomer, setIdEditCustomer] = useState('');
    const [titleForm, setTitleForm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    // Control de mensajes al usuario
    const [errorSubmit, setErrorAddForm] = useState(false);
    const [warningForm, setWarningForm] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [addForm, setAddForm] = useState(false);
    const [isCreateForm, setIsCreateForm] = useState(true);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [isUpdateCustomers, setIsUpdateCustomers] = useState(false);
    // Estados del paginado
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rangePaginator, setRangePaginator] = useState([]);

    const { 
        getUrl,
        uploadAvatarCustomer, 
        handlerSubmitCustomer,
        handlerDeleteCustomer,
        handlerListCustomers,
        handlerGetCustomerById,
        handlerUpdateCustomer,
    } = CustomerHandler({ token });

    const isClientPath = () => {
        const client = CustomerConstant.BASE_PATH[location.pathname];
        return client;
    }

    const searchListCustomer = async () => {
        const allCustomers = await handlerListCustomers({ customer: isClientPath(), page, size });
        if(!_.isNil(allCustomers)){
            const newCustomers = allCustomers?.customers.map(item => {
                if(item?.avatar) {
                    const customer = {...item, avatar: getUrl({ avatar: item?.avatar })};
                    return customer;
                }
                return item;
            })
            setCustomers(newCustomers);
            setCurrentPage(allCustomers?.currentPage);
            setTotalItems(allCustomers?.totalItems);
            setTotalPages(allCustomers?.totalPages);
            setRangePaginator(range(1, allCustomers?.totalPages));
        }
        setIsUpdateCustomers(false);
        setLoading(false);
    }

    useEffect(() => {
        document.title = (isClientPath() 
            ? CustomerConstant.CUSTOMER.TITLE 
            : CustomerConstant.SUPPLIER.TITLE);
        setIsClient(isClientPath());
        setPage(0);
        setIsUpdateCustomers(true);
    }, [location]);

    useEffect(() => {
        if(isUpdateCustomers) searchListCustomer();
    }, [isUpdateCustomers, page]);


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
            setMessageSuccess(`El ${isClient ? 'cliente' : 'proveedor'} fue eliminado satisfactoriamente`);
            setIsUpdateCustomers(true);
            handlerMessageSuccess();
        }else{
            setMessageError(`Ups, ocurrió un error eliminando el ${isClient ? 'cliente' : 'proveedor'}`);
            handlerMessageError();
        }        
    }

    const getDataCustomer = async ({ id }) => {
        const customer = await handlerGetCustomerById({ id });
        if (_.isUndefined(customer) || _.isEmpty(customer)) {
            setMessageError("Ups, ocurrió un error, intente más tarde");
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
        setTitleForm(`Editar ${isClient ? 'cliente' : 'proveedor'}`);
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
            setMessageSuccess(`El ${isClient ? 'cliente' : 'proveedor'} fue ${isCreateForm ? 'guardado' : 'actualizado'} satisfactoriamente`);
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
        setTitleForm(`Nuevo ${isClient ? 'cliente' : 'proveedor'}`);
        setIsCreateForm(true);        
        setShowModal(true);
    }

    return {
        filePreview, setFilePreview, errorUploadFile, firstName, setFirstName,
        lastName, setLastName, email, setEmail, mobile, setMobile,
        avatar, setAvatar, titleForm, showModal, saving, setIsUpdateCustomers,
        handlerCancelForm, handlerSubmitForm, handlerClickShowModal,
        errorSubmit, warningForm, addForm, handlerFileChange, messageSuccess,
        messageError, handlerDelete, customers, loading, setCustomers,
        mode, setMode, handlerEdit, isClient, totalPages, rangePaginator,
        currentPage, page, setPage
    }
}

export default CustomerHook;