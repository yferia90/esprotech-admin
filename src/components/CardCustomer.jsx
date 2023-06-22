import React from "react";
import { Link } from "react-router-dom";
import { RiTicketLine, RiMore2Fill, RiAddLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import AvatarCustomer from 'sale/img/customer.png';
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const CardCustomer = ({ ticket, avatar, name }) => {
  return (
    <div className="bg-secondary-100 p-8 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Menu
            menuButton={
              <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-900 p-2 rounded-lg transition-colors">
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
          </Menu>
        </div>
      </div>
      <div>
      	<div class="group flex items-center">
			  <img class="shrink-0 h-12 w-12 rounded-full" src={AvatarCustomer} alt="" />
			  <div class="ltr:ml-3 rtl:mr-3">
			    <p class="text-sm font-medium text-slate-300 group-hover:text-white">Rolando Perez Moreno</p>
			    <p class="text-sm font-medium text-slate-500 group-hover:text-slate-300">1128389314</p>
			  </div>
			</div>
      </div>
    </div>
  );
};

export default CardCustomer;
