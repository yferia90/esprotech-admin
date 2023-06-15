import { useState } from 'react';
import constants from '../constants/menu.constants';

const SidebarHook = () => {
    // Módulo de configuracines
    const [classCompany, setClassCompany] = useState(constants.BASE.COMPANY.CLASSNAME.default);
    const [classUser, setClassUser] = useState(constants.BASE.USER.CLASSNAME.default);
    // Móduo de CRM
    const [classClient, setClassClient] = useState(constants.CRM.CLIENT.CLASSNAME.default);
    const [classSupplier, setClassSupplier] = useState(constants.CRM.SUPPLIER.CLASSNAME.default);
    // Móduo de Inventario
    const [classCategory, setClassCategory] = useState(constants.STOCK.CATEGORY.CLASSNAME.default);
    const [classProduct, setClassProduct] = useState(constants.STOCK.PRODUCT.CLASSNAME.default);
    const [classStore, setClassStore] = useState(constants.STOCK.STORE.CLASSNAME.default);
    const [classMove, setClassMove] = useState(constants.STOCK.MOVE.CLASSNAME.default);

    return {
        classCompany, 
        setClassCompany,
        classUser, 
        setClassUser,
        classClient, 
        setClassClient,
        classSupplier, 
        setClassSupplier,
        classCategory, 
        setClassCategory,
        classProduct, 
        setClassProduct,
        classStore, 
        setClassStore,
        classMove,
        setClassMove
    }
}

export default SidebarHook;