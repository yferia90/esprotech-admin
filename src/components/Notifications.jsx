import { useState } from 'react';
import {
  RiNotification3Line,
} from "react-icons/ri";
import NotificationItem from './NotificationItem';

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

const Notifications = () => {
    const [numberOfNotifications, setNumberOfNotifications] = useState(5);

    return (
        <Menu
            menuButton={
                <MenuButton className="relative hover:bg-secondary-100 p-2 rounded-lg transition-colors">
                    <RiNotification3Line />
                    <span className="absolute -top-0.5 right-0 bg-primary py-0.5 px-[5px] box-content text-black rounded-full text-[8px] font-bold">
                        {numberOfNotifications}
                    </span>
                </MenuButton>
            }
            align="end"
            arrow
            transition
            arrowClassName="bg-secondary-100"
            menuClassName="bg-secondary-100 p-4"
        >
            <h1 className="text-gray-300 text-center font-medium">
                Notificaciones ({numberOfNotifications})
            </h1>
            <hr className="my-6 border-gray-500" />
            <NotificationItem title='Pedido de Muzzarela' date="21/10/2022" description="Nuevo pedido de Pizza Muzzarella"/>
            <NotificationItem title='Compra de calzado' date="21/10/2022" description="Nueva compra de calzados"/>
            <NotificationItem title='Stock mínimo' date="21/10/2022" description="Los zapatos de hombres llegaron a la existencia mínima"/>
            <hr className="my-6 border-gray-500" />
            <MenuItem className="p-0 hover:bg-transparent flex justify-center cursor-default">
                <div
                    className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer"
                >
                    Todas las notificaciones
                </div>
            </MenuItem>
        </Menu>
    )
}

export default Notifications;