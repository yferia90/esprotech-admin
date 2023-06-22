export default function Modal({ showModal, title, saving = false, bodyModal, cancelModal, confirmModal }) {
    return (
        <>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            // onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg-modal p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex">                                    
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-gray-800 mb-2">
                                            {title}
                                        </h4>
                                        {bodyModal()}
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                        <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border"
                                                onClick={() => cancelModal()}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                className={
                                                    `w-full mt-2 p-2.5 
                                                    flex-1 bg-primary 
                                                    text-black hover:bg-primary 
                                                    rounded-md outline-none ${saving ? "disabled opacity-25 " : ""}`}
                                                onClick={() => confirmModal()}
                                            >
                                                Guardar
                                            </button>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}