import { Menu, MenuButton } from "@szhsin/react-menu";
import {
    RiArrowDownSLine,
    RiBuildingFill
} from "react-icons/ri";


const SelectCheckbox = ({ companies }) => {

    const handlerCheckCompany = (evt) => {
        const { name } = evt.target;
        const checked = evt.target.checked;
    }

    return (
        <Menu
            menuButton={
                <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors">
                    <RiBuildingFill />
                    <span>Compañías</span>
                    <RiArrowDownSLine />
                </MenuButton>
            }
            align="end"
            arrow
            arrowClassName="bg-secondary-100"
            transition
            menuClassName="bg-secondary-100 p-2"
        >
            <>
                {companies && companies.map((item, index) => (
                    <div key={index} className="w-64 mt-2 p-2 bg-secondary-100 shadow rounded">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="pl-4 flex items-center">
                                    <div className="bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative">
                                        <input
                                            onChange={(evt) => {
                                                handlerCheckCompany(evt);
                                            }}
                                            name={item.name}
                                            type="checkbox"
                                            className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                        <div className="check-icon hidden bg-primary text-white rounded-sm">
                                            <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M5 12l5 5l10 -10" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-sm leading-normal ml-2 text-white">{item.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
            <style>
                {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
            </style>
        </Menu>
    );
};

export default SelectCheckbox;