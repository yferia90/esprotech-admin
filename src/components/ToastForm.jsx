import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastForm = ({ title, type }) => {
    const [options] = useState({
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })

    useEffect(() => {
        if(type === 'success') toast.success(`${title}`, options);
        else if(type === 'error') toast.error(`${title}`, options);
        else if(type === 'info') toast.info(`${title}`, options);
        else if(type === 'warning') toast.warning(`${title}`, options);
    });

    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        </>
    );
}

export default ToastForm;