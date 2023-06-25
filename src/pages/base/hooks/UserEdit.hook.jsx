import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserHandler from '../handlers/User.handler';

const UserEditHook = ({ token }) => {
    let { id } = useParams();
    const [user, setUser] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [avatar, setAvatar] = useState('');
    const [filePreview, setFilePreview] = useState('');
    const [errorUploadFile, setErrorUploadFile] = useState(false);

    const [titleForm, setTitleForm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errorSubmit, setErrorAddForm] = useState(false);
    const [warningForm, setWarningForm] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [addForm, setAddForm] = useState(false);
    const [addModal, setAddModal] = useState(true);
    const [messageSuccess, setMessageSuccess] = useState('');


    const { handlerGetUserById, uploadAvatarUser } = UserHandler({ token });

    
    const searchGetUser = async () => {
        const userById  = await handlerGetUserById({ id });
        setUser(userById);
    }

    const clearFields = () => {
        setAvatar('');
    }

    const handlerCancelForm = () => {
        clearFields();
        setShowModal(false);
    }

    const handlerSubmitForm = () => {
        const formData = { firstName, lastName, email, password, mobile, avatar };
    }

    const handlerClickShowModal = ({ addDetail = false }) => {
        setTitleForm('Nuevo usuario');
        // if(addDetail) setIsAddDetail(true);
        setAddModal(true);        
        setShowModal(true);
    }

    const handlerMessageError = () => {
        setMessageError(true);
        setTimeout(() => {
            setMessageError(false);
        }, 5000);
    }

    const handlerFileChange = async (evt) => {
        if(evt!==null){
          const _file = evt.target.files[0];
          setFilePreview(URL.createObjectURL(_file));
          let formData = new FormData();
          formData.append('file', _file);
          const fileUpload = await uploadAvatarUser({ formData });
          if(!fileUpload.error){
            setAvatar(fileUpload?.data?.path);
            return;
          }
          setMessageError("Ups, vuelva a intentarlo.");
          handlerMessageError();
        }
    }

    useEffect(() => {
        document.title = 'Editar usuario';
        searchGetUser();
    }, [])

    return {
        user, titleForm, showModal, saving, handlerCancelForm,
        handlerSubmitForm, errorSubmit, warningForm, addForm,
        messageError, messageSuccess, handlerClickShowModal,
        firstName, setFirstName, lastName, setLastName, email, setEmail,
        password, setPassword, showPassword, setShowPassword,
        mobile, setMobile, avatar, filePreview, handlerFileChange,
        errorUploadFile
    }
}

export default UserEditHook;