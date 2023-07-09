import React, { useEffect } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import {
  RiEdit2Line,
  RiEyeOffLine,
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiHome2Line,
  RiCodeLine,
  RiCoinLine,
  RiFilter2Fill,
  RiDeleteBin6Line,
  RiEditLine
} from "react-icons/ri";

import Selector from '../../components/Selector';
import DatePicker from '../../components/DatePicker';

import { generateReferenceNumber } from '../../utils/utils';

const FormOrderSale = () => {
  const lines = [];

	useEffect(() => {
    	document.title = 'Crear orden de venta';
  }, []);

  const OrderLineView = () => {
        return (
            <div className="bg-secondary-100 pl-8 pr-8 pb-8">                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between ">
                  <div>
                    <h1 className="font-bold text-gray-100 text-sm">Listado de lineas</h1>
                  </div>
                  <div className="flex items-center gap-4">                    
                      <button 
                          // onClick={() => handlerModalAddress()}
                          className="bg-primary/90 text-black hover:bg-primary flex items-center gap-2 py-2 px-4 rounded-lg transition-colors text-sm">
                          Nueva linea
                      </button>
                  </div>
                </div>
                <hr className="my-8 border-gray-500/30" />
                <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
                    <h5>Producto</h5>
                    <h5>Precio</h5>
                    <h5>Cantidad</h5>
                    <h5>Descuento</h5>
                    <h5>Subtotal</h5>
                    <h5>Acción</h5>
                </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
                      <div>
                          Pantalon de mujer
                      </div>
                      <div>
                          $15 000
                      </div>
                      <div>
                          1
                      </div>
                      <div>
                          <span
                            className="py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                              $ 100
                          </span>
                      </div>
                      <div>
                          <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg">
                              $14 900
                          </span>
                      </div>                        
                      <div>
                        <button className="border border-sky-700 p-2 rounded-lg">
                          <RiEditLine className="text-sky-700" />
                        </button>
                        <button className="border border-red-500 p-2 rounded-lg ml-2">
                          <RiDeleteBin6Line className="text-red-500" />
                        </button>
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
                      <div>
                          Pantalon de mujer
                      </div>
                      <div>
                          $15 000
                      </div>
                      <div>
                          1
                      </div>
                      <div>
                          <span
                            className="py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                              $ 100
                          </span>
                      </div>
                      <div>
                          <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg">
                              $14 900
                          </span>
                      </div>                        
                      <div>
                        <button className="border border-sky-700 p-2 rounded-lg">
                          <RiEditLine className="text-sky-700" />
                        </button>
                        <button className="border border-red-500 p-2 rounded-lg ml-2">
                          <RiDeleteBin6Line className="text-red-500" />
                        </button>
                      </div>
                  </div>
                  <div className="justify-end relative mb-4 mt-10 w-1/4 bg-secondary-900 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 font-medium">Descuento:</span>
                        <span>$0</span>
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-gray-400 font-medium">Total:</span>
                        <span>$201.03</span>
                      </div>                      
                  </div>
                  <div className="relative mb-4 mt-10">
                    <textarea
                      // value={description ? description : ''}
                      onChange={(evt) => {
                        // setDescription(evt.target.value);
                      }}
                      className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                      placeholder="Deje una cometario"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={(evt) => {
                        evt.preventDefault();
                        // handlerSubmitDatosPersonales();
                      }}
                      className="bg-[#ec7c6a] text-black py-2 px-4 rounded-lg transition-colors">
                      Guardar
                    </button>
                  </div>
            </div>
        )
    }

	return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10 bg-secondary-100 p-8 rounded-xl">
            <div>
                <h1 className="font-bold text-gray-100 text-xl">Crear orden de venta</h1>
            </div>
            <div className="flex items-center gap-4">
                <button                    
                    className="bg-primary/90 text-black hover:bg-primary flex items-center gap-2 py-2 px-4 rounded-lg transition-colors"
                    type="button"
                  >
                    Nueva orden
                </button>
            </div>
        </div>
        <>
          <div className="bg-secondary-100 grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="md:col-span-4">
                <div className="bg-secondary-100 p-8 rounded-xl">
                <form>
                  <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
                    <div className="w-full md:w-1/4 px-2">
                      <p>
                        Numero de pedido <span className="text-red-500">*</span>
                      </p>
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                      <div className="w-full">
                        <label>{`OV-${generateReferenceNumber()}`}</label>
                      </div>
                    </div>
                    <div className="w-full md:w-1/4 px-2">
                      <p>
                        Fecha de entrega
                      </p>
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                      <div>
                        <DatePicker />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
                    <div className="w-full md:w-1/4 px-2">
                      <p>
                        Cliente <span className="text-red-500">*</span>
                      </p>
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                      <Selector path='customer' title='Seleccione el cliente' />
                    </div>
                    <div className="w-full md:w-1/4 px-2">
                      <p>
                        Moneda
                      </p>
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                      <Selector path='currency' title='Seleccione la moneda' />
                    </div>
                  </div>                  
                </form>
              </div>                       
            </div>
        </div>
        {OrderLineView()}        
      </>
    </>
  );
}

export default FormOrderSale;