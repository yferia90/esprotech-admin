import { useEffect, useState } from 'react';
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

const Address = ({ 
	address, 
	handlerModalAddress, 
	modalUpdateAddress, 
	handlerDeleteAddress
}) => {
	const [data, setData] = useState([]);

	useEffect(() => {
        setData(address);
    }, [address]);


	return (
		<div className="md:col-span-4">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10 bg-secondary-100 p-8 rounded-xl">
                <div>
                    <h1 className="font-bold text-gray-100 text-xl">Listado de direcciones</h1>
                </div>
                <div className="flex items-center gap-4">                    
                    <button 
                        onClick={() => handlerModalAddress()}
                        className="bg-primary/90 text-black hover:bg-primary flex items-center gap-2 py-2 px-4 rounded-lg transition-colors">
                        Nueva dirección
                    </button>
                </div>
            </div>
            {data && data.map((item, index) => (
            	<div key={index} className="bg-secondary-100 p-8 rounded-xl mb-4">					
		              <div className="flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
		                <div>
		                  <h5 className="text-white text-xl mb-1">
		                  	{`${item?.street}, #${item?.nroHouse}, ${item?.state?.name}, ${item?.country?.name} `}
		                  </h5>
		                </div>
		                <div>
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
                                    	onClick={() => modalUpdateAddress(item.id)}
                                        className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
                                    >
                                        Editar
                                    </div>
                                </MenuItem>
                                <MenuItem className="p-0 hover:bg-transparent">
                                    <div
                                        onClick={() => handlerDeleteAddress(item.id)}
                                        className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1 cursor-pointer"
                                    >
                                        Eliminar
                                    </div>
                                </MenuItem>
                            </Menu>
                        </div>
		          </div>
		          	<hr className="border-gray-500/30" />
		          	<h5 className="text-white text-xl mb-1">
		                {`${item?.description}`}
		            </h5>
	    		</div>	    		
            ))}
		</div>
	)	
}

export default Address;