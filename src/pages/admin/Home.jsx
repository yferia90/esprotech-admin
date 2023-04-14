import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardTicket from "../../components/CardTicket";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useAppContext } from '../../contexts/App.context';

const Home = () => {
  const [fullName, setFullName] = useState();
  const { user } = useAppContext();

  useEffect(() => {
    const { firstName, lastName } = user;
    const fullName = `${firstName} ${lastName}`;
    setFullName(fullName);
  }, [user]);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl text-white">¡Bienvenido, {fullName}!</h1>
        <div className="flex items-center gap-2 text-3xl">
          <RiArrowLeftSLine className="hover:cursor-pointer hover:text-white transition-colors" />
          <RiArrowRightSLine className="hover:cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Card */}
        <CardTicket
          ticket="total"
          totalTickets="145,000"
          text="Pedidos totales"
        />
        <CardTicket
          ticket="pending"
          totalTickets="5,000"
          text="Pedidos pendientes"
        />
        <CardTicket
          ticket="inProcess"
          totalTickets="130,000"
          text="Pedidos en proceso"
        />
        <CardTicket
          ticket="close"
          totalTickets="10,000"
          text="Pedidos cerrados"
        />
      </div>
      <div>
        <h1 className="text-2xl text-white my-10">Pedidos recientes</h1>
      </div>
      <div className="bg-secondary-100 p-8 rounded-xl">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 p-4">
          <h5>ID</h5>
          <h5>Descripción</h5>
          <h5>Estatus</h5>
          <h5>Fecha</h5>
          <h5>Acciones</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
            <span>#25546</span>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Descripción</h5>
            <p>Pizza muzzarella</p>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Estatus</h5>
            <span className="py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
              Cerrado
            </span>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Fecha</h5>
            <span>14/04/2023</span>
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
                  onClick={() => { }}
                  className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
                >
                  Ver detalles
                </div>
              </MenuItem>
              {/* <MenuItem className="p-0 hover:bg-transparent">
                <Link
                  to="/perfil"
                  className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                >
                  Información
                </Link>
              </MenuItem> */}
            </Menu>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
            <span>#25547</span>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Descripción</h5>
            <p>Empanadas de carne suave</p>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Estatus</h5>
            <span className="py-1 px-2 bg-blue-500/10 text-blue-500 rounded-lg">
              Cerrado
            </span>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Fecha</h5>
            <span>14/04/2023</span>
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
                  onClick={() => { }}
                  className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
                >
                  Ver detalles
                </div>
              </MenuItem>
              {/* <MenuItem className="p-0 hover:bg-transparent">
                <Link
                  to="/perfil"
                  className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                >
                  Información
                </Link>
              </MenuItem> */}
            </Menu>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
            <span>#25548</span>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Descripción</h5>
            <p>Hamburguesa de carne y queso cheddar</p>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Estatus</h5>
            <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg">
              Cerrado
            </span>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Fecha</h5>
            <span>14/04/2023</span>
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
                  onClick={() => { }}
                  className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
                >
                  Ver detalles
                </div>
              </MenuItem>
              {/* <MenuItem className="p-0 hover:bg-transparent">
                <Link
                  to="/perfil"
                  className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                >
                  Información
                </Link>
              </MenuItem> */}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
