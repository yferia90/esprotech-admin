import React from "react";
import { useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import {
    RiArrowRightSLine,
    RiArrowLeftSLine,
    RiFilter2Fill,
} from "react-icons/ri";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Select from '../../components/Select';
import useAppContext from "../../contexts/App.context";
import UserEditHook from './hooks/UserEdit.hook';

const EditUser = () => {
    const navigate = useNavigate();
    const { token } = useAppContext();
    const { user, company = [], users = [] } = UserEditHook({ token });

    return (
        <>
            {/* Detalles de la compañía */}
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
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-primary/90 text-black hover:bg-primary flex items-center gap-2 py-2 px-4 rounded-lg transition-colors">
                                Nuevo usuario
                            </button>
                        </div>
                    </Tab.List>
                </div>
                <Tab.Panels className="mt-8">
                    <Tab.Panel>
                        <div className="bg-secondary-100 p-8 rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
                            <div className="md:col-span-4">
                                <form>
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
                                                    // value={firstName}
                                                    name="firstName"
                                                    onChange={(evt) => {
                                                        // setFirstName(evt.target.value);
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
                                                    // value={lastName}
                                                    onChange={(evt) => {
                                                        // setLastName(evt.target.value);
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
                                                    // value={mobile}
                                                    onChange={(evt) => {
                                                        // setMobile(evt.target.value);
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
                                                    name="numFijo"
                                                    // value={numFijo}
                                                    onChange={(evt) => {
                                                        // setNumFijo(evt.target.value);
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
                                            //   evt.preventDefault();
                                            //   handlerSubmitDatosPersonales();
                                        }}
                                        className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="bg-secondary-100 p-8 rounded-lg grid grid-cols-1 xl:grid-cols-4 gap-8">
                            <div className="md:col-span-4">
                                <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            Código postal
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <input
                                                type="text"
                                                name="postalCode"
                                                // value={postalCode}
                                                onChange={(evt) => {
                                                    // setPostalCode(evt.target.value);
                                                }}
                                                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                                placeholder="Código postal"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            Calle <span className="text-red-500">*</span>
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <input
                                                type="text"
                                                name="street"
                                                // value={street}
                                                onChange={(evt) => {
                                                    // setStreet(evt.target.value);
                                                }}
                                                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                                placeholder="Calle"
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            País <span className="text-red-500">*</span>
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <Select
                                                // initialValue={countryId}
                                                onChangeSelect={(value) => {
                                                    // setCountry(value);
                                                    // setState([]);
                                                    // getStatesByCountry({ setDataStates, countryId: value });
                                                }}
                                            // data={dataCountries} 
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            Provincia <span className="text-red-500">*</span>
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <Select
                                                // value={stateId}
                                                onChangeSelect={(value) => {
                                                    // setState(value);
                                                    // setMunicipality([]);
                                                    // getMunicipalityByState({ setDataMunicipality, stateId: value })
                                                }}
                                            // data={dataStates} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
                                    <div className="w-full md:w-1/4">
                                        <p>
                                            Municipio
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <Select
                                                // value={municipalityId}
                                                onChangeSelect={(value) => {
                                                    // setMunicipality(value);
                                                    // setLocation([]);
                                                    // getLocationByMunicipality({ setDataLocation, municipalityId: value });
                                                }}
                                            // data={dataMunicipality} 
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/4 px-2">
                                        <p>
                                            Localidad
                                        </p>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-full">
                                            <Select
                                                // value={locationId}
                                                onChangeSelect={(value) => {
                                                    // setLocation(value);
                                                }}
                                            // data={dataLocation} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                                    <div className="w-full md:w-1/4">
                                        <p>
                                            Descripción
                                        </p>
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            // value={description}
                                            onChange={(evt) => {
                                                // setDescription(evt.target.value);
                                            }}
                                            className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                            placeholder="Deje una descripción"
                                        ></textarea>
                                    </div>
                                </div>
                                <hr className="my-8 border-gray-500/30" />
                                <div className="flex justify-end">
                                    <button
                                        onClick={(evt) => {
                                            // evt.preventDefault();
                                            // handlerSubmitDatosDireccion();
                                        }}
                                        className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </>
    );
};

export default EditUser;
