import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiTicketLine, RiMore2Fill, RiAddLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import CustomerAvatar from './img/customer.png';

const CardCustomer = ({ data, color='bg-white', key, handlerDelete }) => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [avatar, setAvatar] = useState(CustomerAvatar);
  const [id, setId] = useState('');

  useEffect(() => {
      const name = `${data?.firstName} ${data?.lastName}`
      setFullName(name);
      setMobile(data?.mobile);
      setId(data?.id);
      if(data?.avatar){
        setAvatar(data?.avatar);
      }
  },[]);

  return (
    <div key={key} className={`p-8 rounded-xl ${color}`}>
      <div className="flex items-center justify-end mb-4">
        <div>
          <Menu
            menuButton={
              <MenuButton className="flex items-center gap-x-2 bg-secondary-900 p-2 rounded-lg transition-colors">
                <RiMore2Fill />
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
                onClick={() => {}}
                className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
              >
                Editar
              </div>
            </MenuItem>
            <MenuItem className="p-0 hover:bg-transparent">
              <div
                onClick={() => handlerDelete(id)}
                className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
              >
                Eliminar
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div>
      	<div className="group flex items-center">
			  <img className="shrink-0 h-12 w-12 rounded-full" src={avatar} alt="" />
			  <div className="ml-5">
			    <p className="text-sm font-medium text-secondary-900">{fullName}</p>
			    <p className="text-sm font-medium text-secondary-900">{mobile}</p>
			  </div>
			</div>
      </div>
    </div>
  );
};

export default CardCustomer;
