import React, { useContext, createContext, useState, useEffect } from 'react';
import { updateFetchAxios } from '../utils/configAxios';
// Creando un contexto global para la APP
export const AppContext = createContext(null);

// Creando el provider
export const AppContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    const [titleNavBar, setTitleNavBar] = useState('Dashboard');
    const [user, setUser] = useState({});

    useEffect(() => {
        let userLocal = localStorage.getItem('user');
        userLocal = userLocal && userLocal.length > 0 ? JSON.parse(userLocal) : null;
        if (userLocal !== null) {
            setToken(userLocal?.token);
            const _userLocal = userLocal?.data[0];
            setCompanyId(_userLocal?.companies[0]?.id);
            setUser(_userLocal);
            updateFetchAxios();
        }
    }, []);

    const values = React.useMemo(() => (
        {
            token,
            companyId,
            setCompanyId,
            user,
            setUser,
            setToken,
            titleNavBar, 
            setTitleNavBar
        }
    ), [
        token,
        companyId,
        setCompanyId,
        user,
        setUser,
        setToken,
        titleNavBar,
        setTitleNavBar,
    ]);
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
    }
    return context;
};

export default useAppContext;