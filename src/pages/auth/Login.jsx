import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import LoginHook from './hooks/Login.hook';
import LoginHandler from './handler/login.handler';
import useAppContext from '../../contexts/App.context';
import AlertError from "../../components/AlertError";

const Login = () => {
  const { setToken, setUser, setCompanyId } = useAppContext();
  const { handlerSubmitLogin } = LoginHandler({ setToken, setUser, setCompanyId });
  const navigate = useNavigate();
  const {
    showPassword,
    setShowPassword,
    email,
    setEmail,
    password,
    setPassword,
    showAlertError,
    setShowAlertError
  } = LoginHook();

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleSubmitLogin = async (evt) => {
    evt.preventDefault();
    const result = await handlerSubmitLogin({ email, password });
    if (result) navigate('/admin');
    else {
     setShowAlertError(true);
     setTimeout(() => {
      setShowAlertError(false);
     },5000) ;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        {showAlertError && (
          <AlertError title='Ups, tenemos un problema!' description='Estas credenciales no coinciden con un usuario registrado' setShowAlertError={setShowAlertError} />
        )}
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
          Iniciar <span className="text-primary">sesión</span>
        </h1>
        <form className="mb-8">
          <div className="relative mb-4">
            <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
            <input
              type="email"
              className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
              placeholder="Correo electrónico"
              onChange={(event) => {
                const value = event.target.value;
                setEmail(value);
              }}
            />
          </div>
          <div className="relative mb-8">
            <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
            <input
              type={showPassword ? "text" : "password"}
              className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg"
              placeholder="Contraseña"
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
          <div>
            <button
              onClick={(evt) => handleSubmitLogin(evt)}
              type="submit"
              className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg"
            >
              Ingresar
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/olvide-password"
            className="hover:text-primary transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <span className="flex items-center gap-2">
            ¿No tienes cuenta?{" "}
            <Link
              to="#"
              className="text-primary hover:text-gray-100 transition-colors"
            >
              Registrate
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
