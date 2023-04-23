import React, { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const Users = () => {
    return (
        <>
            <div>
                <h1 className="text-2xl text-white my-10">Listado de usuarios</h1>
            </div>
            <div className="bg-secondary-100 p-8 rounded-xl">
                <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 p-4">
                    <h5>Nombre completo</h5>
                    <h5>Número de teléfono</h5>
                    <h5>Correo</h5>
                    <h5>Rol</h5>
                    <h5>Acciones</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
                    <div>
                        <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
                        <span>Rolando Perez Perez</span>
                    </div>                    
                    <div>
                        <h5 className="md:hidden text-white font-bold mb-2">Estatus</h5>
                        <span className="py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                            1128389314
                        </span>
                    </div>
                    <div>
                        <h5 className="md:hidden text-white font-bold mb-2">Fecha</h5>
                        <span>rolando@gmail.com</span>
                    </div>
                    <div>
                        <h5 className="md:hidden text-white font-bold mb-2">Rol</h5>
                        <span>ADMIN</span>
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
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;