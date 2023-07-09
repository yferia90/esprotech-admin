import React, { useEffect } from "react";
import { Tab } from "@headlessui/react";
import {
  RiEdit2Line,
  RiEyeOffLine,
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiHome2Line,
  RiCodeLine,
  RiCoinLine
} from "react-icons/ri";
import Select from '../../components/Select';
import UseDataUser from '../auth/hooks/useDataUser';
import ProfileHandler from './handlers/Profile.handler';
import SelectHandler from '../../components/handler/Select.handler';
import ToastForm from '../../components/ToastForm';
import CustomModal from '../../components/CustomModal';
import Address from './Address';

const Profile = () => {
  const {
    email, file, firstName, newMail, setNewMail, setFirstName,
    lastName, setLastName, mobile, setMobile,
    landline, setNumFijo,postalCode, setPostalCode,
    street, setStreet, countryId, setCountry,
    stateId, setState, setUser, address,
    description, setDescription, savingAddress,
    dataCountries, setDataCountries,
    token, dataStates, setDataStates, nroHouse, setNroHouse,
    addressId, setAddress, filePreview, setFilePreview, 
    handlerSubmitDatosPersonales, setTitleModal,
    handlerFileChange, handlerSubmitDatosDireccion,
    errorUploadFile, messageError, messageSuccess,
    addPersonalData, showModal, titleModal, saving,
    handlerCancelForm, handlerSubmitForm, setShowModal,
    setChangeEmail, changeEmail, repeatEmail, setRepeatEmail, 
    warningChangeEmailPassword, titleChangeEmailPassword, 
    password, setPassword, setNewPassword, newPassword,
    showPassword, setShowPassword, showNewPassword, 
    setShowNewPassword, handlerCancelFormAddress,
    showModalAddress, setShowModalAddress, titleFormAddress,
    handlerModalAddress, handlerDeleteAddress, modalUpdateAddress
  } = UseDataUser();

  const {
    getCountries, getStatesByCountry,
  } = SelectHandler({ token });

  useEffect(() => {
    document.title = 'Editar perfil';
    getCountries({ setDataCountries });
  }, []);

  const formChangeEmail = () => {
    return (
       <div className="rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="md:col-span-4">
            <hr className="border-gray-500/30 p-2" />
            <form className="mb-8">
            <div className="relative mb-4">
              <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                type="email"
                name="newMail"
                value={newMail ? newMail : ''}
                onChange={(evt) => {
                    setNewMail(evt.target.value);
                }}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                placeholder="Nuevo correo"
              />
            </div>
            <div className="relative mb-4">
              <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                type="email"
                name="repeatEmail"
                value={repeatEmail ? repeatEmail : ''}
                onChange={(evt) => {
                    setRepeatEmail(evt.target.value);
                }}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                placeholder="Repetir correo"
              />
            </div>
          </form>            
          <hr className="border-gray-500/30" />
        </div>
      </div>
    )
  }

  const formChangePassword = () => {
      return (
        <div className="rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="md:col-span-4">
              <hr className="border-gray-500/30 p-2" />
              <form className="mb-8">
              <div className="relative mb-8">
                <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password ? password : ''}
                  className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg"
                  placeholder="Contraseña actual"
                  onChange={(event) => {
                    const value = event.target.value;
                    setPassword(value);
                  }}
                />
                {showPassword ? (
                  <RiEyeOffLine
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                  />
                ) : (
                  <RiEyeLine
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                  />
                )}
              </div>              
              <div className="relative mb-8">
                <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword ? newPassword : ''}
                  className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg"
                  placeholder="Nueva contraseña"
                  onChange={(event) => {
                    const value = event.target.value;
                    setNewPassword(value);
                  }}
                />
                {showNewPassword ? (
                  <RiEyeOffLine
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                  />
                ) : (
                  <RiEyeLine
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                  />
                )}
              </div>
            </form>            
            <hr className="border-gray-500/30" />
          </div>
      </div>
    )
  }

  const formNewAddress = () => {
    return (
      <div className="rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="md:col-span-4">
                <hr className="border-gray-500/30 p-2" />
                <form className="mb-8">                    
                    <div className="relative mb-4">
                      <RiCodeLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <input
                        type="text"
                        name="postalCode"
                        value={postalCode ? postalCode : ''}
                        onChange={(evt) => {
                            setPostalCode(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Código postal"
                      />
                    </div>
                    <div className="relative mb-4">
                      <RiHome2Line className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />                      
                      <input
                        type="text"
                        name="street"
                        value={street ? street : ''}
                        onChange={(evt) => {
                            setStreet(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Calle"
                      />
                    </div>
                    <div className="relative mb-4">
                      <RiHome2Line className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />                      
                      <input
                        type="text"
                        name="nroHouse"
                        value={nroHouse ? nroHouse : ''}
                        onChange={(evt) => {
                            setNroHouse(evt.target.value);
                        }}
                        className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                        placeholder="Número de casa o departamento"
                      />
                    </div>
                    <div className="relative mb-4">
                      <RiCoinLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <Select
                        initialValue={countryId}
                        onChangeSelect={(value) => {
                          setCountry(value);
                          setState([]);
                          getStatesByCountry({ setDataStates, countryId: value });
                        }}
                        data={dataCountries} />
                    </div>
                    <div className="relative mb-4">
                      <RiCoinLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                      <Select
                        value={stateId}
                        onChangeSelect={(value) => {
                          setState(value);
                        }} data={dataStates} />
                    </div>
                    <div className="relative mb-4">
                    <textarea
                      value={description ? description : ''}
                      onChange={(evt) => {
                        setDescription(evt.target.value);
                      }}
                      className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                      placeholder="Deje una descripción"
                    ></textarea>
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
        addPersonalData && (
            <ToastForm title={messageSuccess} type="success" />
        )
      }
      {
        warningChangeEmailPassword && (
            <ToastForm title={titleChangeEmailPassword} type="warning" />
        )
      }
      {
        errorUploadFile && (
            <ToastForm title={messageError} type="error" />
        )
      }
      <CustomModal
        showModal={showModal}
        title={titleModal}
        bodyModal={changeEmail ? formChangeEmail : formChangePassword}
        cancelModal={() => handlerCancelForm()}
        confirmModal={() => handlerSubmitForm()}
        saving={saving} />
        {/*Modal para dar de alta una dirección nueva*/}
      <CustomModal
          showModal={showModalAddress}
          title={titleFormAddress}
          bodyModal={formNewAddress}
          cancelModal={() => handlerCancelFormAddress()}
          confirmModal={() => handlerSubmitDatosDireccion()}
          saving={savingAddress} />
      <Tab.Group>
          <div className="bg-secondary-100 p-8 rounded-bl-lg rounded-br-lg">
              <Tab.List className="flex flex-col md:flex-row md:items-center md:justify-between gap-x-2 gap-y-6 bg-secondary-900/50 py-3 px-4 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <Tab className="py-2 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors outline-none ui-selected:bg-secondary-900 ui-selected:text-gray-100">
                          Datos personales
                      </Tab>
                      <Tab className="py-2 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors outline-none ui-selected:bg-secondary-900 ui-selected:text-gray-100">
                          Direcciones
                      </Tab>
                      <Tab className="py-2 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors outline-none ui-selected:bg-secondary-900 ui-selected:text-gray-100">
                          Correo y contraseña
                      </Tab>
                  </div>                  
              </Tab.List>
          </div>
          <Tab.Panels className="mt-8">
              <Tab.Panel>
                  <div className="bg-secondary-100 p-8 rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
                      <div className="md:col-span-4">
                          <div className="bg-secondary-100 p-8 rounded-xl">
                          <form>
                            <div className="flex items-center mb-8">
                              <div className="w-1/4">
                                <p>Avatar</p>
                              </div>
                              <div className="flex-1">
                                <div className="relative mb-2">
                                {
                                  filePreview && (
                                    <img
                                      src={filePreview}
                                      className="w-28 h-28 object-cover rounded-lg"
                                    />
                                  )
                                }                                  
                                  <label
                                    htmlFor="avatar"
                                    className="absolute bg-white p-2 rounded-full hover:cursor-pointer -top-2 left-24"
                                  >
                                    <RiEdit2Line className="text-secondary-100" />
                                  </label>
                                  <span className="text-white ml-2">Subir foto</span>
                                  <input                   
                                    type="file"
                                    name="file"
                                    id="avatar"
                                    className="hidden"
                                    onChange={handlerFileChange}/>
                                </div>
                                {/*<p className="text-gray-500 text-sm">
                                  Se permiten imágenes de tipo: png, jpg, jpeg
                                </p>*/}
                              </div>
                            </div>


                            <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
                              <div className="w-full md:w-1/4 px-2">
                                <p>
                                  Nombre <span className="text-red-500">*</span>
                                </p>
                              </div>
                              <div className="flex-1 flex items-center gap-4">
                                <div className="w-full">
                                  <input
                                    type="text"
                                    value={firstName ? firstName : ''}
                                    name="firstName"
                                    onChange={(evt) => {
                                      setFirstName(evt.target.value);
                                    }}
                                    className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                    placeholder="Nombre(s)"
                                  />
                                </div>
                              </div>
                              <div className="w-full md:w-1/4 px-2">
                                <p>
                                  Apellidos <span className="text-red-500">*</span>
                                </p>
                              </div>
                              <div className="flex-1 flex items-center gap-4">
                                <div className="w-full">
                                  <input
                                    type="text"
                                    value={lastName ? lastName : ''}
                                    onChange={(evt) => {
                                      setLastName(evt.target.value);
                                    }}
                                    name="lastName"
                                    className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                    placeholder="Apellido(s)"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
                              <div className="w-full md:w-1/4 px-2">
                                <p>
                                  Número de celular <span className="text-red-500">*</span>
                                </p>
                              </div>
                              <div className="flex-1 flex items-center gap-4">
                                <div className="w-full">
                                  <input
                                    type="text"
                                    name="mobile"
                                    value={mobile ? mobile : ''}
                                    onChange={(evt) => {
                                      setMobile(evt.target.value);
                                    }}
                                    className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                    placeholder="Número de celular"
                                  />
                                </div>
                              </div>
                              <div className="w-full md:w-1/4 px-2">
                                <p>
                                  Teléfono Fijo
                                </p>
                              </div>
                              <div className="flex-1 flex items-center gap-4">
                                <div className="w-full">
                                  <input
                                    type="text"
                                    name="landline"
                                    value={landline ? landline : ''}
                                    onChange={(evt) => {
                                      setNumFijo(evt.target.value);
                                    }}
                                    className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                    placeholder="Número de teléfono fijo"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                          <hr className="my-8 border-gray-500/30" />
                          <div className="flex justify-end">
                            <button
                              onClick={(evt) => {
                                evt.preventDefault();
                                handlerSubmitDatosPersonales();
                              }}
                              className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">
                              Guardar
                            </button>
                          </div>
                        </div>                       
                      </div>
                  </div>
              </Tab.Panel>
              <Tab.Panel>
                <Address 
                  address={address} 
                  handlerModalAddress={handlerModalAddress}
                  modalUpdateAddress={modalUpdateAddress}
                  handlerDeleteAddress={handlerDeleteAddress} />
              </Tab.Panel>
              <Tab.Panel>
                  <div className="bg-secondary-100 p-8 rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
                      <div className="md:col-span-4">
                         {/* Correo y contraseña */}
                          <div className="bg-secondary-100 p-8 rounded-xl">
                              <div className="flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
                                <div>
                                  <h5 className="text-gray-100 text-xl mb-1">Correo electrónico</h5>
                                  <p className="text-gray-500 text-sm">{email}</p>
                                </div>
                                <div>
                                  <button 
                                    onClick={() => {
                                      setTitleModal('Cambiar correo');
                                      setChangeEmail(true);
                                      setShowModal(true);
                                    }}
                                    className="w-full md:w-auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors">
                                    Cambiar correo
                                  </button>
                                </div>
                              </div>
                              <hr className="my-8 border-gray-500/30 border-dashed" />
                              <div className="flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
                                <div>
                                  <h5 className="text-gray-100 text-xl mb-1">Contraseña</h5>
                                  <p className="text-gray-500 text-sm">****************</p>
                                </div>
                                <div>
                                  <button 
                                    onClick={() => {
                                        setTitleModal('Cambiar contraseña');
                                        setChangeEmail(false);
                                        setShowModal(true);
                                      }}
                                    className="w-full md:auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors">
                                    Cambiar contraseña
                                  </button>
                                </div>
                              </div>
                        </div>
                      </div>
                  </div>
              </Tab.Panel>
          </Tab.Panels>
      </Tab.Group>      
    </>
  );
};

export default Profile;
