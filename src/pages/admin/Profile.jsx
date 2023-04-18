import React, { useEffect } from "react";
import {
  RiEdit2Line,
  // RiShieldCheckLine,
  // RiErrorWarningLine,
} from "react-icons/ri";
// import { Link } from "react-router-dom";
// import { Switch } from "@headlessui/react";
import Select from '../../components/Select';
import UseDataUser from '../auth/hooks/useDataUser';
import ProfileHandler from './handlers/Profile.handler';
import SelectHandler from '../../components/handler/Select.handler';

const Profile = () => {
  const {
    userId,
    email,
    avatar,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    mobile,
    setMobile,
    numFijo,
    setNumFijo,
    postalCode, setPostalCode,
    street, setStreet,
    countryId, setCountry,
    stateId, setState,
    locationId, setLocation,
    description, setDescription,
    dataCountries, setDataCountries,
    token, dataStates, setDataStates,
    dataLocation, setDataLocation, setUser,
    municipalityId, setMunicipality,
    dataMunicipality, setDataMunicipality,
    addressId
  } = UseDataUser();

  const { handlerSubmiProfile, handlerSubmiAddress } = ProfileHandler({ setUser, token });

  const {
    getCountries,
    getStatesByCountry,
    getMunicipalityByState,
    getLocationByMunicipality
  } = SelectHandler({ token });

  useEffect(() => {
    document.title = 'Editar perfil';
    getCountries({ setDataCountries });
  }, []);

  const handlerSubmitDatosPersonales = () => {
    const formData = { firstName, lastName, mobile, numFijo };
    handlerSubmiProfile({ userId, formData });
  }

  const handlerSubmitDatosDireccion = () => {
    const formData = {
        postalCode,
        description,
        fullAddress: JSON.stringify({ street, countryId, stateId, municipalityId, locationId })
    };
    handlerSubmiAddress({ addressId, formData, userId });
  }

  return (
    <>
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">Datos personales</h1>
        <hr className="my-8 border-gray-500/30" />
        <form>
          <div className="flex items-center mb-8">
            <div className="w-1/4">
              <p>Avatar</p>
            </div>
            <div className="flex-1">
              <div className="relative mb-2">
                <img
                  src={avatar}
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <label
                  htmlFor="avatar"
                  className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24"
                >
                  <RiEdit2Line />
                </label>
                <input type="file" id="avatar" className="hidden" />
              </div>
              <p className="text-gray-500 text-sm">
                Se permiten imágenes de tipo: png, jpg, jpeg
              </p>
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
                  value={firstName}
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
                  value={lastName}
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
                  value={mobile}
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
                  name="numFijo"
                  value={numFijo}
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
      {/* Dirección  */}
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">Dirección</h1>
        <hr className="my-8 border-gray-500/30" />
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
                value={postalCode}
                onChange={(evt) => {
                  setPostalCode(evt.target.value);
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
                value={street}
                onChange={(evt) => {
                  setStreet(evt.target.value);
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
                initialValue={countryId}
                onChangeSelect={(value) => {
                  setCountry(value);
                  setState([]);
                  getStatesByCountry({ setDataStates, countryId: value });
                }}
                data={dataCountries} />
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
                value={stateId}
                onChangeSelect={(value) => {
                  setState(value);
                  setMunicipality([]);
                  getMunicipalityByState({ setDataMunicipality, stateId: value })
                }} data={dataStates} />
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
                value={municipalityId}
                onChangeSelect={(value) => {
                  setMunicipality(value);
                  setLocation([]);
                  getLocationByMunicipality({ setDataLocation, municipalityId: value });
                }}
                data={dataMunicipality} />
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
                value={locationId}
                onChangeSelect={(value) => {
                  setLocation(value);
                }} data={dataLocation} />
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
              value={description}
              onChange={(evt) => {
                setDescription(evt.target.value);
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
              evt.preventDefault();
              handlerSubmitDatosDireccion();
            }}
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">
            Guardar
          </button>
        </div>
      </div>
      {/* Correo y contraseña */}
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">Correo y contraseña</h1>
        <hr className="my-8 border-gray-500/30" />
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
            <div>
              <h5 className="text-gray-100 text-xl mb-1">Correo electrónico</h5>
              <p className="text-gray-500 text-sm">{email}</p>
            </div>
            <div>
              <button className="w-full md:w-auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors">
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
              <button className="w-full md:auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors">
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-8 items-center gap-y-4 bg-green-600/10 p-4 rounded-lg border border-dashed border-green-600">
          <div className="flex justify-center">
            <RiShieldCheckLine className="text-5xl text-green-600" />
          </div>
          <div className="md:col-span-6">
            <h5 className="text-gray-100 text-xl mb-2">Asegura tu cuenta</h5>
            <p className="text-gray-500">
              Two-factor authentication adds an extra layer of security to your
              account. To log in, in addition you'll need to provide a 6 digit
              code
            </p>
          </div>
          <div className="flex justify-center">
            <button className="bg-green-600/70 hover:bg-green-600 transition-colors py-2 px-4 rounded-lg text-gray-100">
              Activar
            </button>
          </div>
        </div> */}
      </div>
      {/* Connected accounts */}
      {/* <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">Conectar con cuentas</h1>
        <hr className="my-8 border-gray-500/30" />
        <div className="flex flex-col md:flex-row gap-4 items-center bg-green-600/10 p-4 rounded-lg border border-dashed border-green-600 mb-8">
          <div className="flex justify-center">
            <RiShieldCheckLine className="text-5xl text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500">
              Two-factor authentication adds an extra layer of security to your
              account. To log in, in you'll need to provide a 4 digit amazing
              code.{" "}
              <Link to="/" className="text-green-400">
                Learn More
              </Link>
            </p>
          </div>
        </div>
        <form className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
                className="w-8 h-8 object-cover"
              />
              <div className="flex flex-col gap-y-1">
                <h5 className="text-gray-100">Google</h5>
                <p className="text-gray-500 text-sm">
                  Plan properly your workflow
                </p>
              </div>
            </div>
            <div>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-primary" : "bg-secondary-900"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    enabled
                      ? "translate-x-6 bg-secondary-900"
                      : "translate-x-1 bg-gray-500"
                  } inline-block h-4 w-4 transform rounded-full transition`}
                />
              </Switch>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                className="w-8 h-8 object-cover"
              />
              <div className="flex flex-col gap-y-1">
                <h5 className="text-gray-100">GitHub</h5>
                <p className="text-gray-500 text-sm">
                  Keep eye on on your Repositories
                </p>
              </div>
            </div>
            <div>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-primary" : "bg-secondary-900"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    enabled
                      ? "translate-x-6 bg-secondary-900"
                      : "translate-x-1 bg-gray-500"
                  } inline-block h-4 w-4 transform rounded-full transition`}
                />
              </Switch>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
                className="w-8 h-8 object-cover"
              />
              <div className="flex flex-col gap-y-1">
                <h5 className="text-gray-100">Slack</h5>
                <p className="text-gray-500 text-sm">
                  Integrate Projects Discussions
                </p>
              </div>
            </div>
            <div>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-primary" : "bg-secondary-900"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    enabled
                      ? "translate-x-6 bg-secondary-900"
                      : "translate-x-1 bg-gray-500"
                  } inline-block h-4 w-4 transform rounded-full transition`}
                />
              </Switch>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
        </form>
      </div> */}
      {/* Email preferences */}
      {/* <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">
          Notificaciones por correo electrónico
        </h1>
        <hr className="my-8 border-gray-500/30" />
        <form className="mb-8">
          <div className="flex items-center gap-4">
            <input type="checkbox" className="accent-primary" id="id1" />
            <div className="flex flex-col gap-y-1">
              <label htmlFor="id1" className="text-gray-100">
                Successful Payments
              </label>
              <p className="text-gray-500 text-sm">
                Receive a notification for every successful payment.
              </p>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
          <div className="flex items-center gap-4">
            <input type="checkbox" className="accent-primary" id="id2" />
            <div className="flex flex-col gap-y-1">
              <label htmlFor="id2" className="text-gray-100">
                Payouts
              </label>
              <p className="text-gray-500 text-sm">
                Receive a notification for every initiated payout.
              </p>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
          <div className="flex items-center gap-4">
            <input type="checkbox" className="accent-primary" id="id3" />
            <div className="flex flex-col gap-y-1">
              <label htmlFor="id3" className="text-gray-100">
                Customer Payment Dispute
              </label>
              <p className="text-gray-500 text-sm">
                Receive a notification if a payment is disputed by a customer
                and for dispute purposes.
              </p>
            </div>
          </div>
        </form>
        <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-end">
          <button className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">
            Guardar
          </button>
        </div>
      </div> */}
      {/* Inactive account */}
      {/* <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">Desactivar cuenta</h1>
        <hr className="my-8 border-gray-500/30" />
        <div className="flex flex-col md:flex-row items-center gap-4 bg-yellow-600/10 p-4 rounded-lg border border-dashed border-yellow-600 mb-8">
          <div className="flex justify-center">
            <RiErrorWarningLine className="text-5xl text-yellow-600" />
          </div>
          <div className="flex-1">
            <h5 className="text-gray-100 text-xl mb-2">
              You Are Deactivating Your Account
            </h5>
            <p className="text-gray-500">
              For extra security, this requires you to confirm your email or
              phone number when you reset yousignr password.{" "}
              <Link className="text-blue-500">Learn more</Link>
            </p>
          </div>
        </div>
        <form className="flex items-center gap-4">
          <input type="checkbox" className="accent-primary" id="idInactive" />
          <label htmlFor="idInactive" className="text-gray-500">
            I confirm my account deactivation
          </label>
        </form>
        <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-end">
          <button className="bg-red-500/80 text-gray-100 py-2 px-4 rounded-lg hover:bg-red-500 transition-colors">
            Desactivate account
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Profile;
