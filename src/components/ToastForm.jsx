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

    const types = {
        success: () => {
            toast.success(`${title}`, options);
        },
        error: () => {
            toast.error(`${title}`, options);
        },
        info: () => {
            toast.info(`${title}`, options);
        },
        warning: () => {
            toast.warning(`${title}`, options);
        }
    }

    const typesAction = (type) => {
      if (types.hasOwnProperty(type)) {
        types[type]();
      }
    }

    useEffect(() => {
        typesAction(type);
    }, [type]);

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