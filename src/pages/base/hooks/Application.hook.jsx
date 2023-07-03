import { useState, useEffect } from 'react';
import _ from "lodash";

import ApplicationHandler from '../handlers/Application.handler';

const ApplicationHook = ({ token }) => {
	// Carga inicial de la pantalla
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isLoadingApplications, setIsLoadingApplications] = useState(false);
	// Mensajes al cliente
	const [isError, setIsError] = useState(false);
	const [isWarning, setIsWarning] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [messageError, setMessageError] = useState('');
	const [messageSuccess, setMessageSuccess] = useState('');
	// Estados de la modal de alta y edición de aplicaciones
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState('');
	const [saving, setSaving] = useState(false);
	// Estados del formulario de aplicaciones
	const [code, setCode] = useState('');
	const [name, setName] = useState('');

	const { 
		handlerListApplications,
		handlerDeleteApplication,
		handlerPostApplication } = ApplicationHandler({ token });

	const searchListApplications = async () => {
		const allApplications = await handlerListApplications();
		if(!_.isNil(allApplications)){
			setApplications(allApplications);
			setLoading(false);
			setIsLoadingApplications(false);
		}
	}

	useEffect(() => {
		document.title = 'Listado de aplicaciones';
        searchListApplications();
	},[]);

	useEffect(() => {
		if(isLoadingApplications){
			searchListApplications();
		}
	},[isLoadingApplications]);

	const handlerSuccess = () => {
		setIsSuccess(true)
		setTimeout(() => {
			setIsSuccess(false);
		},5000);
	}

	const handlerError = () => {
		setIsError(true);
		setTimeout(() =>{
			setIsError(false);
		},5000);	
	}

	const deleteApplicationById = async (id) => {
		try{
			const status = await handlerDeleteApplication({ id });
			if (status === 200){
				setIsLoadingApplications(true);
				setMessageSuccess('La aplicación fue eliminada correctamente');
				handlerSuccess();
			}else {
				setMessageError('Ups, algo salió mal. Inténtelo más tarde')
				handlerError();
			}
		}catch(e){
			setMessageError('Ups, algo salió mal. Inténtelo más tarde')
			handlerError();
		}
	}

	const handlerShowModal = () => {
		setShowModal(true);
		setTitleModal('Adicionar aplicación')
	}

	const clearFields = () => {
		setCode('');
		setName('');
	}

	const handlerCancelForm = () => {
		setShowModal(false);
		clearFields();
	}

	const handlerSubmitForm = async () => {
		const formData = { code, name };
		const result = await handlerPostApplication({ formData });
		if(!_.isNil(result)){
			setShowModal(false);
			setIsLoadingApplications(true);
			setMessageSuccess('La aplicación fue creada correctamente');
			handlerSuccess();
		}else {
			setMessageError('Ups, algo salió mal. Inténtelo más tarde')
			handlerError();
		}
	}

	return {
		applications, loading, deleteApplicationById,
		isError, isWarning, isSuccess, messageError,
		messageSuccess, showModal, titleModal, handlerCancelForm,
		handlerSubmitForm, saving, handlerShowModal,
		code, name, setCode, setName
	}
}

export default ApplicationHook;