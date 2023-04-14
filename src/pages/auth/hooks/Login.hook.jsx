import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginHook = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [closeSession, setCloseSession] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (closeSession) {
            localStorage.clear();
            return navigate('/');
        }
    }, [closeSession]);

    return {
        showPassword,
        setShowPassword,
        email,
        setEmail,
        password,
        setPassword,
        setCloseSession
    }
}

export default LoginHook;