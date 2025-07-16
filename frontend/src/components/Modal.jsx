import React from 'react'
// import './Modal.css'
const Modal = ({isOpen, onClose, children}) => {
  return (
    <>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-gray-100 p-6 rounded-lg z-10 relative w-11/12 max-w-md mx-auto text-right">
                    <button className="text-gray-700 font-semibold hover:text-gray-900 focus:outline-none mr-2" onClick={onClose}>X</button>
                    {children}
                </div>


            </div>
    

        )}
    </>
  )
}

export default Modal