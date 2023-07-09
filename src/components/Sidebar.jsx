import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RiDashboard2Line,
  RiBarChart2Line,
  RiEarthLine,
  RiCustomerService2Line,
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiMenu3Line,
  RiCloseLine,
  RiSettings2Fill,
  RiStockFill,
} from "react-icons/ri";
import LoginHook from '../pages/auth/hooks/Login.hook';
import SidebarHook from './hooks/Sidebar.hook';
import constants from './constants/menu.constants';

const Sidebar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuStock, setShowMenuStock] = useState(false);
  const [showMenuCRM, setShowMenuCRM] = useState(false);
  const [showMenuPurchase, setShowMenuPurchase] = useState(false);
  const [showMenuConfig, setShowMenuConfig] = useState(false);
  const { setCloseSession } = LoginHook();

  const { 
    classCompany, setClassCompany, classUser, 
    setClassUser, classClient, setClassClient, 
    classOrderSale, setClassOrderSale, classCategory, 
    setClassCategory, classProduct, setClassProduct,
    classStore, setClassStore, classMove, setClassMove,
    classExitMove, setClassExitMove,
    classSupplier, setClassSupplier,
    classOrderPurchase, setClassOrderPurchase,
    classApplication, setClassApplication,
    classGroup, setClassGroup, classCurrency, setClassCurrency
  } = SidebarHook();

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
                <RiDashboard2Line className="text-primary" /> Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowMenuCRM(!showMenuCRM)}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiEarthLine className="text-primary" /> Ventas
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${showMenuCRM && "rotate-90"
                    } transition-all`}
                />
              </button>
              <ul
                className={` ${showMenuCRM ? "h-[81px]" : "h-0"
                  } overflow-y-hidden transition-all`}
              >
                <li>
                  <div
                    onClick={() => {
                      setClassClient(constants.SALE.CLIENT.CLASSNAME.pointer);
                      navigate(`${constants.SALE.CLIENT.PATH}`);
                    }}
                    className={classClient}
                  >
                    {constants.SALE.CLIENT.NAME}
                  </div>
                </li>
                <li>
                <div
                    onClick={() => {
                      setClassOrderSale(constants.SALE.ORDER_SALE.CLASSNAME.pointer);
                      navigate(`${constants.SALE.ORDER_SALE.PATH}`);
                    }}
                    className={classOrderSale}
                  >
                    {constants.SALE.ORDER_SALE.NAME}
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <button
                onClick={() => setShowMenuPurchase(!showMenuPurchase)}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiEarthLine className="text-primary" /> Compra
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${showMenuPurchase && "rotate-90"
                    } transition-all`}
                />
              </button>
              <ul
                className={` ${showMenuPurchase ? "h-[81px]" : "h-0"
                  } overflow-y-hidden transition-all`}
              >
                <li>
                  <div
                    onClick={() => {
                      setClassSupplier(constants.PURCHASE.SUPPLIER.CLASSNAME.pointer);
                      navigate(`${constants.PURCHASE.SUPPLIER.PATH}`);
                    }}
                    className={classSupplier}
                  >
                    {constants.PURCHASE.SUPPLIER.NAME}
                  </div>
                </li>
                <li>
                <div
                    onClick={() => {
                      setClassOrderPurchase(constants.PURCHASE.ORDER_PURCHASE.CLASSNAME.pointer);
                      navigate(`${constants.PURCHASE.ORDER_PURCHASE.PATH}`);
                    }}
                    className={classOrderPurchase}
                  >
                    {constants.PURCHASE.ORDER_PURCHASE.NAME}
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <button
                onClick={() => setShowMenuStock(!showMenuStock)}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiStockFill className="text-primary" /> Inventario
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${showMenuStock && "rotate-90"
                    } transition-all`}
                />
              </button>
              <ul
                className={` ${showMenuStock ? "h-[205px]" : "h-0"
                  } overflow-y-hidden transition-all`}
              >
                <li>
                <div
                    onClick={() => {
                      setClassCategory(constants.STOCK.CATEGORY.CLASSNAME.pointer);
                      navigate(`${constants.STOCK.CATEGORY.PATH}`);
                    }}
                    className={classCategory}
                  >
                    {constants.STOCK.CATEGORY.NAME}
                  </div>
                </li>
                <li>
                <div
                    onClick={() => {
                      setClassProduct(constants.STOCK.PRODUCT.CLASSNAME.pointer);
                      navigate(`${constants.STOCK.PRODUCT.PATH}`);
                    }}
                    className={classProduct}
                  >
                    {constants.STOCK.PRODUCT.NAME}
                  </div>
                </li>
                <li>
                <div
                    onClick={() => {
                      setClassStore(constants.STOCK.STORE.CLASSNAME.pointer);
                      navigate(`${constants.STOCK.STORE.PATH}`);
                    }}
                    className={classStore}
                  >
                    {constants.STOCK.STORE.NAME}
                  </div>
                </li>
                <li>
                <div
                    onClick={() => {
                      setClassMove(constants.STOCK.INCOMING_MOVE.CLASSNAME.pointer);
                      navigate(`${constants.STOCK.INCOMING_MOVE.PATH}`);
                    }}
                    className={classMove}
                  >
                    {constants.STOCK.INCOMING_MOVE.NAME}
                  </div>
                </li>
                <li>
                <div
                    onClick={() => {
                      setClassExitMove(constants.STOCK.EXIT_MOVE.CLASSNAME.pointer);
                      navigate(`${constants.STOCK.EXIT_MOVE.PATH}`);
                    }}
                    className={classExitMove}
                  >
                    {constants.STOCK.EXIT_MOVE.NAME}
                  </div>
                </li>
              </ul>
            </li>
            {/* Inicio menu configuración */}
            <li>
              <button
                onClick={() => setShowMenuConfig(!showMenuConfig)}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiSettings2Fill className="text-primary" /> Configuración
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${showMenuConfig && "rotate-90"
                    } transition-all`}
                />
              </button>
              <ul
                className={` ${showMenuConfig ? "h-[200px]" : "h-0"
                  } overflow-y-hidden transition-all`}
              >
                <li>
                  <div
                    onClick={() => {
                      setClassCompany(constants.BASE.COMPANY.CLASSNAME.pointer);
                      navigate(`${constants.BASE.COMPANY.PATH}`);
                    }}
                    className={classCompany}
                  >
                    {constants.BASE.COMPANY.NAME}
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      setClassUser(constants.BASE.USER.CLASSNAME.pointer);
                      navigate(`${constants.BASE.USER.PATH}`);
                    }}
                    className={classUser}
                  >
                    {constants.BASE.USER.NAME}
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      setClassApplication(constants.BASE.APPLICATION.CLASSNAME.pointer);
                      navigate(`${constants.BASE.APPLICATION.PATH}`);
                    }}
                    className={classApplication}
                  >
                    {constants.BASE.APPLICATION.NAME}
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      setClassGroup(constants.BASE.GROUP.CLASSNAME.pointer);
                      navigate(`${constants.BASE.GROUP.PATH}`);
                    }}
                    className={classGroup}
                  >
                    {constants.BASE.GROUP.NAME}
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      setClassCurrency(constants.BASE.CURRENCY.CLASSNAME.pointer);
                      navigate(`${constants.BASE.CURRENCY.PATH}`);
                    }}
                    className={classCurrency}
                  >
                    {constants.BASE.CURRENCY.NAME}
                  </div>
                </li>
              </ul>
            </li>
            {/* Fin menú de configuración */}
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
