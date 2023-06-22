const AlertError = ({ title, description, setShowAlertError }) => {
    return (
        <div className="bg-white-100 border border-red-400 text-white-700 px-4 py-3 rounded relative my-1" role="alert">
            <strong className="font-bold">{title}</strong> &nbsp;
            <span className="block sm:inline">{description}</span>
        </div>
    )
}

export default AlertError;