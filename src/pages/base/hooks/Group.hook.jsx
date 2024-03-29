import { useState, useEffect } from 'react';
import _ from "lodash";

import GroupHandler from '../handlers/Group.handler';
import { range } from '../../../utils/utils';

const GroupHook = ({ token }) => {
	// Carga inicial de la pantalla
	const [groups, setGroups] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isLoadingGroups, setIsLoadingGroups] = useState(false);
	// Mensajes al cliente
	const [isError, setIsError] = useState(false);
	const [isWarning, setIsWarning] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [messageError, setMessageError] = useState('');
	const [messageSuccess, setMessageSuccess] = useState('');
	// Estados de la modal de alta y edición del grupo
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState('');
	const [saving, setSaving] = useState(false);
	// Estados del formulario de grupo
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
		handlerListGroup,
		handlerDeleteGroup,
		handlerPostGroup,
		handlerUpdateGroup,
		handlerGetGroupById } = GroupHandler({ token });

	const searchListGroups = async () => {
		const allGroups = await handlerListGroup({ page, size });
		if(!_.isNil(allGroups)){
			setGroups(allGroups?.groups);
			setCurrentPage(allGroups?.currentPage);
			setTotalItems(allGroups?.totalItems);
			setTotalPages(allGroups?.totalPages);
			setRangePaginator(range(1, allGroups?.totalPages));			
			setIsLoadingGroups(false);
		}
		setLoading(false);
	}

	useEffect(() => {
		document.title = 'Listado de grupos de permisos';
        searchListGroups();
	},[]);

	useEffect(() => {
		if(isLoadingGroups){
			searchListGroups();
		}
	},[isLoadingGroups, page]);

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

	const getAndSetData = async ({ id }) => {
        const group = await handlerGetGroupById({ id });
        setName(group?.name || '');
        setCode(group?.code || '');
        setIdEdit(id);
    }

	const handlerEdit = (id) => {
		setIsFormEdit(true);
		setShowModal(true);
		setTitleModal('Editar permiso');
		getAndSetData({ id });
	}

	const deleteById = async (id) => {
		try{
			const status = await handlerDeleteGroup({ id });
			if (status === 200){
				setIsLoadingGroups(true) 
				setMessageSuccess('El permiso fue eliminado correctamente');
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
		setTitleModal('Adicionar permiso')
	}

	const handlerCancelForm = () => {
		setShowModal(false);
		clearFields();
	}

	const handlerSubmitForm = async () => {
		const formData = { code, name };
		const result = (idEdit === null 
			? await handlerPostGroup({ formData })
			: await handlerUpdateGroup({ formData, id: idEdit }));
		if(!_.isNil(result)){
			setShowModal(false);
			setIsLoadingGroups(true);
			setMessageSuccess(`El permiso fue ${idEdit === null ? 'creado' : 'actualizado'} correctamente`);
			if(idEdit !== null) setIdEdit(null);
			handlerSuccess();
		}else {
			setMessageError('Ups, algo salió mal. Inténtelo más tarde')
			handlerError();
		}
	}

	return {
		groups, loading, deleteById,
		isError, isWarning, isSuccess, messageError,
		messageSuccess, showModal, titleModal, handlerCancelForm, 
		handlerSubmitForm, saving, handlerShowModal, page, setPage, setIsLoadingGroups,
		code, name, setCode, setName, handlerEdit, totalPages, rangePaginator,
		currentPage
	}
}

export default GroupHook;