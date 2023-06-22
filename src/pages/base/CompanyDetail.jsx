import React, { useEffect } from "react";
import { Tab } from "@headlessui/react";
import {
    RiArrowRightSLine,
    RiArrowLeftSLine,
    RiFilter2Fill,
    RiEdit2Line,
    RiEyeOffLine,
    RiMailLine,
    RiCodeLine,
    RiHome2Line,
    RiCoinLine,
    RiLockLine,
    RiEyeLine
} from "react-icons/ri";

import CompanyAddEditHook from './hooks/CompanyAddEdit.hook';
import ToastForm from '../../components/ToastForm';
import CustomModal from '../../components/CustomModal';
import useAppContext from "../../contexts/App.context";

const CompanyDetail = () => {
    const { token } = useAppContext();

    const {
        name, setName, code, setCode,
        email, setEmail, mobile, setMobile,
        parent, setParent, handlerSubmitForm,
        errorAddCompany, addCompany, warningCompany,
        saving, handlerCancelForm,handlerClickAddCompany,
        titleForm, handlerClickEditCompany,
        messageSuccess, messageError, newCompany,
        company, users, searchGetCompany,
    } = CompanyAddEditHook({ token });

        useEffect(() => {
            document.title = 'Detalles del negocio';
            searchGetCompany();
        }, []);

        const FormCompany = () => {
        return (
            <div className="rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="md:col-span-4">
                <hr className="border-gray-500/30 p-2" />
                <form className="mb-8">                    
                    <div className="relative mb-4">
                      <RiHome2Line className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type="name"
                        name="name"
                        value={name}
                        onChange={(evt) => {
                            setName(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Nombre del negocio"
                      />
                    </div>
                    <div className="relative mb-4">
                      <RiCodeLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type="text"
                        name="code"
                        value={code}
                        onChange={(evt) => {
                            setCode(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Código"
                      />
                    </div>
                    <div className="relative mb-4">
                      <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(evt) => {
                            setEmail(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Correo electrónico"
                      />
                    </div>
                    <div className="relative mb-4">
                      <RiCoinLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type="text"
                        name="mobile"
                        value={mobile}
                        onChange={(evt) => {
                            setMobile(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Número de celular"
                      />
                    </div>
                </form>            
                <hr className="border-gray-500/30" />
            </div>
            </div>            
        )
    }

    return (
        <>
            {
                errorAddCompany && (
                    <ToastForm title={messageError} type="error" />
                )
            }
            {
                warningCompany && (
                    <ToastForm title="Hay campos requeridos sin completar" type="warning" />
                )
            }
            {
                addCompany && (
                    <ToastForm title={messageSuccess} type="success" />
                )
            }
            <CustomModal
                showModal={newCompany}
                title={titleForm}
                bodyModal={FormCompany}
                cancelModal={() => handlerCancelForm()}
                confirmModal={() => handlerSubmitForm()}
                saving={saving}
            />
            {/* Detalles de la compañía */}
            <Tab.Group>
                <div className="bg-secondary-100 p-8 rounded-bl-lg rounded-br-lg">
                    <Tab.List className="flex flex-col md:flex-row md:items-center md:justify-between gap-x-2 gap-y-6 bg-secondary-900/50 py-3 px-4 rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <Tab className="py-2 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors outline-none ui-selected:bg-secondary-900 ui-selected:text-gray-100">
                                Detalle de negocio
                            </Tab>
                            <Tab className="py-2 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors outline-none ui-selected:bg-secondary-900 ui-selected:text-gray-100">
                                Listado de usuarios
                            </Tab>
                        </div>
                        <div className="flex justify-center">
                            <button 
                                onClick={() => handlerClickEditCompany({ id: company.id, isDetail: true })}
                                className="flex items-center gap-2 py-2 px-4 rounded-lg hover:text-primary transition-colors">
                                Editar
                            </button>
                            <button 
                                onClick={() => handlerClickAddCompany({ addDetail: true })}
                                className="bg-primary/90 text-black hover:bg-primary flex items-center gap-2 py-2 px-4 rounded-lg transition-colors">
                                Nuevo negocio
                            </button>
                        </div>
                    </Tab.List>
                </div>
                <Tab.Panels className="mt-8">
                    <Tab.Panel>
                        <div className="bg-secondary-100 p-8 rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
                            <div className="md:col-span-4">
                                <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            <strong>Nombre:</strong>
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <strong><p className="text-white-500 text-sm">{company.name}</p></strong>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            <strong>Código:</strong>
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <strong><p className="text-white-500 text-sm">{company.code}</p></strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            <strong>Correo:</strong>
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <strong><p className="text-white-500 text-sm">{company.email}</p></strong>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            <strong>Compañía padre:</strong>
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <strong><p className="text-white-500 text-sm">{company.parent === null ? '...' : company.parent}</p></strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            <strong>Estado:</strong>
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <strong><p className="text-white-500 text-sm">{company.active ? 'ACTIVA' : 'INACTIVA'}</p></strong>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            <strong>Número telefónico:</strong>
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <strong><p className="text-white-500 text-sm">{company.mobile !== null ? company.mobile : '...'}</p></strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="bg-secondary-100 p-8 rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">                            
                            <div className="md:col-span-4">
                                {users && users.length > 0  && (
                                    <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 p-4">
                                        <h5>Nombre</h5>
                                        <h5>Email</h5>
                                        <h5>Estatus</h5>
                                        <h5>Rol</h5>
                                        <h5>Número telefónico</h5>
                                    </div>
                                )}                                
                                {users && users.map((element, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
                                        <div>
                                            <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
                                            <span>{`${element?.firstName} ${element?.lastName}`}</span>
                                        </div>
                                        <div>
                                            <h5 className="md:hidden text-white font-bold mb-2">Descripción</h5>
                                            <span>{element.email}</span>
                                        </div>
                                        <div>
                                            <h5 className="md:hidden text-white font-bold mb-2">Estatus</h5>
                                            <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg">
                                                {element.active === true ? 'ACTIVO' : 'INACTIVO'}
                                            </span>
                                        </div>
                                        <div>
                                            <h5 className="md:hidden text-white font-bold mb-2">Fecha</h5>
                                            <span>{element?.TbCompanyUser?.role}</span>
                                        </div>
                                        <div>
                                            <h5 className="md:hidden text-white font-bold mb-2">Fecha</h5>
                                            <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg">
                                                {element.mobile !== null ? element.mobile : '...'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {/* Pagination */}
                                {users && users.length > 0  && (
                                    <div className="p-8 flex justify-center">
                                        <nav className="flex items-center gap-2">
                                            <button className="p-2 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                                                <RiArrowLeftSLine />
                                            </button>
                                            <div className="flex items-center">
                                                <button className="py-2 px-4 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                                                    1
                                                </button>
                                            </div>
                                            <button className="p-2 hover:bg-secondary-900 rounded-lg transition-colors hover:text-gray-100">
                                                <RiArrowRightSLine />
                                            </button>
                                        </nav>
                                    </div>                                    
                                )}
                                {users && users.length === 0 && (
                                    <p className="text-lg text-center">El negocio no tiene usuarios asignados...</p>
                                )}
                            </div>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </>
    );
};

export default CompanyDetail;
