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
import OrderSaleHook from './hooks/OrderSale.hook';
import CreateOrderSVG from './svg/CreateOrder.svg';

const OrderSale = () => {
    const navigate = useNavigate();
    const { token } = useAppContext();
    const {
      records,
      loading
    } = OrderSaleHook({ token });

    const ListView = () => {
        return (
            <>
                { records && records.length > 0 && (
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 p-4">
                        <h5>Número</h5>
                        <h5>Código</h5>
                        <h5>Nombre</h5>
                        <h5>Status</h5>
                        <h5>Acción</h5>
                    </div>
                )}
                
                {loading && (
                    <div role="status" className="flex items-center justify-center">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    </div>
                )}
                {records ? records.map((element, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
                        <div>
                            <span>{index}</span>
                        </div>
                        <div>
                            <span>{element.code}</span>
                        </div>
                        <div>
                            <span
                            className="py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                                {element.name}
                            </span>
                        </div>
                        <div>
                            <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg">
                                {element.active === true ? 'ACTIVO' : 'INACTIVO'}
                            </span>
                        </div>                        
                        <div>
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
                                        // onClick={() => handlerEditApplication(element.id)}
                                        className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
                                    >
                                        Editar
                                    </div>
                                </MenuItem>
                                <MenuItem className="p-0 hover:bg-transparent">
                                    <div
                                        // onClick={() => deleteApplicationById(element.id)}
                                        className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
                                    >
                                        Eliminar
                                    </div>
                                </MenuItem>
                            </Menu>
                        </div>

                    </div>
                )) :  <CreateOrderSVG />}
                {
                    records && records.length > 0 && (
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10 bg-secondary-100 p-8 rounded-xl">
                <div>
                    <h1 className="font-bold text-gray-100 text-xl">Listado de ordenes de venta</h1>
                </div>
                <div className="flex items-center gap-4">                   
                    <button 
                        onClick={() => navigate('/admin/sale/create')}
                        className="bg-primary/90 text-black hover:bg-primary flex items-center gap-2 py-2 px-4 rounded-lg transition-colors">
                        Nueva orden
                    </button>
                </div>
            </div>
            <div className="bg-secondary-100 p-8 rounded-xl">
              { ListView() }
            </div>
        </div>
    );
};

export default OrderSale;
