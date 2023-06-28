import React, { useEffect } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useNavigate } from "react-router-dom";
import {
    RiFilter2Fill,
    RiArrowRightSLine,
    RiArrowLeftSLine,
    RiEdit2Line,
    RiEyeOffLine,
    RiMailLine,
    RiCodeLine,
    RiHome2Line,
    RiCoinLine,
    RiLockLine,
    RiEyeLine,
    RiFileList2Line,
    RiSdCardLine
} from "react-icons/ri";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import 'react-toastify/dist/ReactToastify.css';
import useAppContext from "../../contexts/App.context";
import CustomerAddEditHook from './hooks/CustomerAddEdit.hook';
import CardCustomer from '../../components/CardCustomer';
import Tooltip from '../../components/Tooltip';
import ToastForm from '../../components/ToastForm';
import CustomModal from '../../components/CustomModal';

const Customer = () => {
    const navigate = useNavigate();
    const { token, companyId } = useAppContext();

    const {
        titleForm, showModal, saving,
        handlerCancelForm, handlerSubmitForm,
        errorSubmit, warningForm, addForm,
        messageError, messageSuccess,
        handlerClickShowModal, firstName, setFirstName,
        lastName, setLastName, email, setEmail,        
        mobile, setMobile, filePreview, handlerFileChange,
        handlerDelete, customers, loading, setCustomers,
        mode, setMode, handlerEdit
    } = CustomerAddEditHook({ token, companyId });

    const FormCustomer = () => {
        return (
            <div className="rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="md:col-span-4">
                <hr className="border-gray-500/30 p-2" />
                <form className="mb-8">
                    <div className="flex items-center mb-8">
                      <div className="relative mb-4">
                          {filePreview && (
                            <img
                                src={filePreview}
                                className="w-28 h-28 object-cover rounded-lg"
                              />
                          )}                          
                          <label
                            htmlFor="avatar"
                            className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24"
                          >
                            <RiEdit2Line />
                          </label>
                          <input                   
                            type="file"
                            name="file"
                            id="avatar"
                            className="hidden"
                            onChange={(evt) => handlerFileChange(evt)}
                            />
                        </div> 
                    </div>
                    <div className="relative mb-4">
                      <RiHome2Line className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(evt) => {
                            setFirstName(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Nombre del cliente"
                      />
                    </div>
                    <div className="relative mb-4">
                      <RiCodeLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(evt) => {
                            setLastName(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Apellidos"
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

    const CardView = () => {
        return (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {
                    customers && customers.map((element, index) => (
                        <CardCustomer 
                            color="bg-third" 
                            data={element}
                            customerKey={index} 
                            handlerEdit = {(id) => handlerEdit(id)}
                            handlerDelete={(id) => handlerDelete(id)}
                        />
                    ))
                }
            </div>
        );
    }

    const ListView = () => {
        return (
            <>
                { customers && customers.length > 0 && (
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
                        <h5>Nro</h5>
                        <h5>Código</h5>
                        <h5>Nombre</h5>
                        <h5>Estado</h5>
                        <h5>Email</h5>
                        <h5>Acciones</h5>
                    </div>
                )}
                {
                    customers && customers.map((element, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
                            <div>
                                <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
                                <span>{index}</span>
                            </div>
                            <div>
                                <h5 className="md:hidden text-white font-bold mb-2">CODIGO</h5>
                                <span>{element.code}</span>
                            </div>
                            <div>
                                <h5 className="md:hidden text-white font-bold mb-2">Descripción</h5>
                                <p>{element.name}</p>
                            </div>
                            <div>
                                <h5 className="md:hidden text-white font-bold mb-2">Estatus</h5>
                                <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg">
                                    {element.active === true ? 'ACTIVA' : 'INACTIVA'}
                                </span>
                            </div>
                            <div>
                                <h5 className="md:hidden text-white font-bold mb-2">Fecha</h5>
                                {element.email}
                            </div>
                            <div>
                                <h5 className="md:hidden text-white font-bold mb-2">Acciones</h5>
                                <Menu
                                    menuButton={
                                        <MenuButton className="flex items-center gap-x-2 bg-secondary-100 p-2 rounded-lg transition-colors">
                                            Acciones
                                        </MenuButton>
                                    }
                                    align="end"
                                    arrow
                                    arrowClassName="bg-secondary-100"
                                    transition
                                    menuClassName="bg-secondary-100 p-4"
                                >
                                    <MenuItem className="p-0 hover:bg-transparent">
                                        <div
                                            // onClick={() => navigate(`/admin/company/detail/${element.id}`)}
                                            className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
                                        >
                                            Ver detalles
                                        </div>
                                    </MenuItem>
                                    <MenuItem className="p-0 hover:bg-transparent">
                                        <div
                                            // onClick={() => handlerClickEditCompany({ id: element.id })}
                                            className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
                                        >
                                            Editar
                                        </div>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    ))
                }
                {
                    customers && customers.length > 0 && (
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
                    )
                }
            </>
        )
    }

    return (
        <div>
            {
                errorSubmit && (
                    <ToastForm title={messageError} type="error" />
                )
            }
            {
                warningForm && (
                    <ToastForm title="Hay campos requeridos sin completar" type="warning" />
                )
            }
            {
                addForm && (
                    <ToastForm title={messageSuccess} type="success" />
                )
            }
            <CustomModal
                showModal={showModal}
                title={titleForm}
                bodyModal={FormCustomer}
                cancelModal={() => handlerCancelForm()}
                confirmModal={() => handlerSubmitForm()}
                saving={saving}
            />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10 bg-secondary-100 p-8 rounded-xl">
                <div>
                    <h1 className="font-bold text-gray-100 text-xl">Listado de clientes</h1>
                </div>
                <div className="flex items-center gap-4">
                    {customers && customers.length > 0 && (
                        <Tooltip text="Vista en modo card">
                            <button
                                onClick={() => setMode('card')}
                                className="bg-secondary-100/50 hover:bg-secondary-100 flex items-center gap-2 rounded-lg hover:text-primary transition-colors">
                                    <RiSdCardLine className="w-8 h-8" />
                            </button>
                        </Tooltip>
                    )}
                    {customers && customers.length > 0 && (
                        <Tooltip text="Vista en modo listado">
                            <button 
                                onClick={() => setMode('list')}
                                className="bg-secondary-100/50 hover:bg-secondary-100 flex items-center gap-2 py-2 px-4 rounded-lg hover:text-primary transition-colors">
                                    <RiFileList2Line className="w-8 h-8" />
                            </button>
                        </Tooltip>
                    )}
                    <button
                        onClick={() => handlerClickShowModal({ addDetail: false})}
                        className="bg-primary/90 text-black hover:bg-primary flex items-center gap-2 py-2 px-4 rounded-lg transition-colors"
                        type="button"
                    >
                        Nuevo cliente
                    </button>
                </div>
            </div>
            <div className="bg-secondary-100 p-8 rounded-xl">
                {
                    mode === 'card' ? CardView() : ListView()
                }                
            </div>
        </div>
    );
};

export default Customer;
