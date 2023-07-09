import { useState, useEffect } from 'react';
import _ from "lodash";

import ApplicationHandler from '../handlers/Application.handler';
import { range } from '../../../utils/utils';

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
	const [isFormEdit, setIsFormEdit] = useState(false);
	const [idEdit, setIdEdit] = useState(null);
	// Estados del paginado
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalItems, setTotalItems] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [rangePaginator, setRangePaginator] = useState([]);

	const { 
		handlerListApplications,
		handlerDeleteApplication,
		handlerPostApplication,
		handlerUpdateApplication,
		handlerGetApplicationById } = ApplicationHandler({ token });

	const searchListApplications = async () => {
		const allApplications = await handlerListApplications({ page, size });
		if(!_.isNil(allApplications)){
			setApplications(allApplications?.applications);
			setCurrentPage(allApplications?.currentPage);
			setTotalItems(allApplications?.totalItems);
			setTotalPages(allApplications?.totalPages);
			setRangePaginator(range(1, allApplications?.totalPages));
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
	},[isLoadingApplications, page]);


	const clearFields = () => {
		setCode('');
		setName('');
	}

	const handlerSuccess = () => {
		clearFields();
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

	const getAndSetDataApplication = async ({ id }) => {
        const application = await handlerGetApplicationById({ id });
        setName(application?.name || '');
        setCode(application?.code || '');
        setIdEdit(id);
    }

	const handlerEditApplication = (id) => {
		setIsFormEdit(true);
		setShowModal(true);
		setTitleModal('Editar aplicación');
		getAndSetDataApplication({ id });
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

	const handlerCancelForm = () => {
		setShowModal(false);
		clearFields();
	}

	const handlerSubmitForm = async () => {
		const formData = { code, name };
		const result = (idEdit === null 
			? await handlerPostApplication({ formData })
			: await handlerUpdateApplication({ formData, id: idEdit }));
		if(!_.isNil(result)){
			setShowModal(false);
			setIsLoadingApplications(true);
			setMessageSuccess(`La aplicación fue ${idEdit === null ? 'creada' : 'actualizada'} correctamente`);
			if(idEdit !== null) setIdEdit(null);
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
		code, name, setCode, setName, handlerEditApplication, totalPages,
		page, setPage, rangePaginator, setIsLoadingApplications, currentPage
	}
}

export default ApplicationHook;