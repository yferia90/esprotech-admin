import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiBarChart2Line,
  RiEarthLine,
  RiCustomerService2Line,
  RiCalendarTodoLine,
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiMenu3Line,
  RiCloseLine,
} from "react-icons/ri";
import LoginHook from '../pages/auth/hooks/Login.hook';

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuStock, setShowMenuStock] = useState(false);
  const [showMenuCRM, setShowMenuCRM] = useState(false);
  const { setCloseSession } = LoginHook();

  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-4 flex flex-col justify-between z-50 ${showMenu ? "left-0" : "-left-full"
          } transition-all`}
      >
        <div>
          <h1 className="text-center text-2xl font-bold text-white mb-10">
            Espro<span className="text-primary text-2xl">Tech</span>
          </h1>
          <ul>
            <li>
              <Link
                to="/admin"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiBarChart2Line className="text-primary" /> Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowMenuCRM(!showMenuCRM)}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiEarthLine className="text-primary" /> CRM
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${showMenuCRM && "rotate-90"
                    } transition-all`}
                />
              </button>
              <ul
                className={` ${showMenuCRM ? "h-[100px]" : "h-0"
                  } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="/admin"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Clientes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Proveedores
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <button
                onClick={() => setShowMenuStock(!showMenuStock)}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiEarthLine className="text-primary" /> Inventario
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${showMenuStock && "rotate-90"
                    } transition-all`}
                />
              </button>
              <ul
                className={` ${showMenuStock ? "h-[160px]" : "h-0"
                  } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="/admin"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Categorías
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Almacenes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Movimientos
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/admin/tickets"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiCustomerService2Line className="text-primary" /> Soporte
                técnico
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <div
            onClick={(evt) => {
              evt.preventDefault();
              setCloseSession(true);
            }}
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors cursor-pointer"
          >
            <RiLogoutCircleRLine className="text-primary" /> Cerrar sesión
          </div>
        </nav>
      </div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};

export default Sidebar;
