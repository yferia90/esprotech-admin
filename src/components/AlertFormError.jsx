const AlertFormError = () => {
    return (
        <div className="flex bg-white shadow-lg rounded-lg">
            <div className="icon bg-red-600 flex justify-center items-center py-4 px-6 rounded-tr-3xl rounded-lg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 bg-white rounded-full text-red-600 p-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
            <div className="flex flex-col p-4 rounded-tr-lg rounded-br-lg">
                <h2 className="font-semibold text-red-600">Error</h2>
                <p className="text-gray-700">
                    Ha ocurrido un error al registrar la cuenta
                </p>
            </div>
        </div>
    )
}

export default AlertFormError;