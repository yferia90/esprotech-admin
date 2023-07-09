import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import SelectHandler from './handler/Select.handler';

import useAppContext from "../contexts/App.context";

const Selector = ({ path, title = 'Seleccione' }) => {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(path);

  const { token } = useAppContext();
  const { getAllData } = SelectHandler({ token });

  const searchAllData = async () => {
    const result = await getAllData({ url });
    setData(result);
  }

  useEffect(() => {
    setUrl(path);
  }, [path]);

  useEffect(() => {
    searchAllData();
  },[url])

  return (
    <div className="w-72 font-medium relative">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-secondary-900 p-2 flex items-center justify-between relative rounded ${
          !selected && "text-white"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : title}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-secondary-900 overflow-y-auto ${
          open ? "max-h-60 absolute z-10" : "max-h-0"
        } `}
      >
        <div className={`flex items-center ${inputValue === '' ? 'pl-1 pr-1 pt-2' : 'pl-1 pr-1 pt-2'} sticky top-0 bg-secondary-900`}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Buscar"
            className="text-secondary-900 p-2 mt-2 outline-none rounded"
          />
        </div>
        {data?.map((item) => (
          <li
            key={item?.name}
            className={`p-2 text-sm hover:text-white cursor-pointer
            ${
              item?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-secondary-100 text-white"
            }
            ${
              item?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (item?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(item?.name);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {item?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;