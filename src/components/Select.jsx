import { useEffect, useState } from 'react';

const Select = ({ onChangeSelect, data = [], initialValue = null }) => {
    const [initComponent, setInitComponent] = useState(true);
    const [defaultValue, setDefaultValue] = useState(initialValue);

    useEffect(() => {
        if (data.length > 0) {
            if (initComponent && initialValue !== null) {
                const element = data.filter(item => item.id === initialValue);
                setDefaultValue(element);
            } else {
                setDefaultValue({ value: 'select', label: 'Puede seleccionar...' });
            }
            setInitComponent(false);
        }
    }, [data]);

    return (
        <select
            onChange={(evt) => {
                const value = evt.target.value;
                onChangeSelect(value);
            }}
            className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none">
            {
                data && data.length > 0 && initialValue!== null && (
                    <option value={defaultValue.value}>{defaultValue.label}</option>
                )
            }
            {
                data && data.map((item, index) => (<option key={index} value={item.id}>{item.name}</option>))
            }
        </select>
    )
}

export default Select;