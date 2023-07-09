import React from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useNavigate } from "react-router-dom";
import {
    RiArrowRightSLine,
    RiArrowLeftSLine,
    RiHome2Line,
    RiCodeLine,
} from "react-icons/ri";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import useAppContext from "../../contexts/App.context";
import GroupHook from './hooks/Group.hook';
import ToastForm from '../../components/ToastForm';
import CustomModal from '../../components/CustomModal';

const Group = () => {
	const navigate = useNavigate();
    const { token } = useAppContext();
    const {
        groups, loading, messageError,
		messageSuccess, isError, isWarning, isSuccess,
		deleteById, showModal, titleModal, 
		handlerCancelForm, handlerSubmitForm, saving,
		handlerShowModal, code, name, setCode, setName,
        handlerEdit, page, rangePaginator, setPage,
        setIsLoadingGroups, totalPages, currentPage
    } = GroupHook({ token });

    const formGroup = () => {
    	return (
            <div className="rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="md:col-span-4">
                <hr className="border-gray-500/30 p-2" />
                <form className="mb-8">                    
                    <div className="relative mb-4">
                      <RiHome2Line className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type="text"
                        name="code"
                        value={code}
                        onChange={(evt) => {
                            setCode(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Código de la aplicación"
                      />
                    </div>
                    <div className="relative mb-4">
                      <RiCodeLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(evt) => {
                            setName(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Nombre de la aplicación"
                      />
                    </div>                    
                </form>
                <hr className="border-gray-500/30" />
            </div>
          </div>
        )
    }

    const ListView = () => {
        return (
            <>
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 p-4">
                    <h5>Código</h5>
                    <h5>Nombre</h5>
                    <h5>Aplicación</h5>
                </div>
                {loading && (
                    <div role="status" className="flex items-center justify-center">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    </div>
                )}
                {groups && groups.map((element, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
                        <div>
                            <span>{element.code}</span>
                        </div>
                        <div>
                            <span>{element.name}</span>
                        </div>
                        <div>
                            <span
                                className="py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                                {element?.applications?.name}
                            </span>
                        </div>
                    </div>
                ))}
                {
                    rangePaginator && rangePaginator.length > 0 && (
                        <div className="p-8 flex justify-center">
                            <nav className="flex items-center gap-2">
                                <button 
                                    onClick={() => {
                                        if(currentPage > 0){
                                            setPage(page - 1);
                                            setIsLoadingGroups(true);
                                        }
                                    }}
                                    className="p-2 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                                    <RiArrowLeftSLine />
                                </button>
                                {
                                    rangePaginator.map((item, index) => (
                                        <div key={index} className="flex items-center">                                        
                                            <button 
                                                onClick={() => {
                                                    if(item - 1 !== page){
                                                        setPage(item - 1);
                                                        setIsLoadingGroups(true);
                                                    }
                                                }}
                                                className={`py-2 px-4 rounded-lg transition-colors hover:text-gray-100 ${item - 1 === page ? 'bg-secondary-900' : ''}`}>
                                                {item}
                                            </button>
                                        </div>
                                    ))                                    
                                }
                                <button 
                                    onClick={() => {
                                        if(currentPage < (totalPages - 1)){
                                            setPage(page + 1);
                                            setIsLoadingGroups(true);
                                        }
                                    }}
                                    className="p-2 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                                    <RiArrowRightSLine />
                                </button>
                            </nav>
                        </div>
                    )
                }
            </>
        )
    }

    const renderToast = () => {
    	if(isError){
    		return <ToastForm title={messageError} type="error" />;
    	}else if(isWarning){
    		return <ToastForm title="Hay campos requeridos sin completar" type="warning" />
    	}else if(isSuccess){
    		return <ToastForm title={messageSuccess} type="success" />
    	}
    }

    return (
        <div>
           {renderToast()}
           	<CustomModal
                showModal={showModal}
                title={titleModal}
                bodyModal={formGroup}
                cancelModal={() => handlerCancelForm()}
                confirmModal={() => handlerSubmitForm()}
                saving={saving}
            />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10 bg-secondary-100 p-8 rounded-xl">
                <div>
                    <h1 className="font-bold text-gray-100 text-xl">Listado de grupos de permisos</h1>
                </div>
            </div>
            <div className="bg-secondary-100 p-8 rounded-xl">
            	{ ListView() }
            </div>
        </div>
    );
};

export default Group;
