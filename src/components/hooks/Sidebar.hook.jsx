import { useState } from 'react';
import constants from '../constants/menu.constants';

const SidebarHook = () => {
    // Módulo de configuracines
    const [classCompany, setClassCompany] = useState(constants.BASE.COMPANY.CLASSNAME.default);
    const [classUser, setClassUser] = useState(constants.BASE.USER.CLASSNAME.default);
    // Módulo de Ventas
    const [classClient, setClassClient] = useState(constants.SALE.CLIENT.CLASSNAME.default);
    const [classOrderSale, setClassOrderSale] = useState(constants.SALE.ORDER_SALE.CLASSNAME.default);
    // Módulo de Inventario
    const [classCategory, setClassCategory] = useState(constants.STOCK.CATEGORY.CLASSNAME.default);
    const [classProduct, setClassProduct] = useState(constants.STOCK.PRODUCT.CLASSNAME.default);
    const [classStore, setClassStore] = useState(constants.STOCK.STORE.CLASSNAME.default);
    const [classMove, setClassMove] = useState(constants.STOCK.INCOMING_MOVE.CLASSNAME.default);
    const [classExitMove, setClassExitMove] = useState(constants.STOCK.EXIT_MOVE.CLASSNAME.default);    
    // Módulo de compra
    const [classSupplier, setClassSupplier] = useState(constants.PURCHASE.SUPPLIER.CLASSNAME.default);
    const [classOrderPurchase, setClassOrderPurchase] = useState(constants.PURCHASE.ORDER_PURCHASE.CLASSNAME.default);
    

    return {
        classCompany,  setClassCompany,classUser, 
        setClassUser, classClient, setClassClient,
        classOrderSale,  setClassOrderSale, classCategory, 
        setClassCategory, classProduct, setClassProduct,
        classStore, setClassStore, classMove,
        setClassMove,classExitMove, setClassExitMove,
        classSupplier, setClassSupplier,
        classOrderPurchase, setClassOrderPurchase
    }
}

export default SidebarHook;