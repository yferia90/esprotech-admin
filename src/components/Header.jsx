import { Link } from "react-router-dom";
import {
  RiArrowDownSLine,
  RiSettings3Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import LoginHook from '../pages/auth/hooks/Login.hook';
import Notifications from './Notifications';
import SelectCheckbox from './SelectCheckbox';
import UseDataUser from '../pages/auth/hooks/useDataUser';

const Header = () => {
  const { setCloseSession } = LoginHook();
  const {
    fullName,
    email,
    filePreview,
    companies
  } = UseDataUser();

  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-end">
      <nav className="flex items-center gap-2">
        {/* Componente selector de compañía */}
        {companies && companies.length > 0 && (
          <SelectCheckbox data={companies} />
        )}
        {/* Componente notificaciones */}
        <Notifications />
        <Menu
          menuButton={
            <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors">
              <img
                src={filePreview}
                className="w-6 h-6 object-cover rounded-full"
              />
              <span>{fullName}</span>
              <RiArrowDownSLine />
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
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <img
                src={filePreview}
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span className="text-sm">{fullName}</span>
                <span className="text-xs text-gray-500">{email}</span>
              </div>
            </div>
          </MenuItem>
          <hr className="my-4 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/admin/profile"
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <RiSettings3Line /> Mi perfil
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <div
              onClick={(evt) => {
                evt.preventDefault();
                setCloseSession(true);
              }}
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <RiLogoutCircleRLine /> Cerrar sesión
            </div>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
