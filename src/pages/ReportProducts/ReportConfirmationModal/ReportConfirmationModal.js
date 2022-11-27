import React from 'react';

const ReportConfirmationModal = ({ title, message, successButtonName, closeModal, modalData, successAction }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-gray-800">{title}</h3>
                    <p className="py-4 text-gray-800" >{message}</p>
                    <div className="modal-action">
                        <label
                            onClick={() => successAction(modalData)}
                            htmlFor="confirmation-modal"
                            className="btn btn-primary">{successButtonName}</label>
                        <button onClick={closeModal} className='btn btn-outline'>cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportConfirmationModal;