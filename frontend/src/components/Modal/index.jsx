import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

function Modal({
  showModal,
  handleCloseModal,
  handleStatusChange,
  selectedTransaction,
  newStatus,
  setNewStatus,
  remarks,
  setRemarks,
  file,
  setFile,
  savingChanges // state untuk menentukan apakah proses penyimpanan sedang berlangsung
}) {
  const [isFileRequired, setIsFileRequired] = useState(false);

  useEffect(() => {
    if (newStatus === "C") {
      setIsFileRequired(true);
    } else {
      setIsFileRequired(false);
    }
  }, [newStatus]);

  const handleSaveChanges = () => {
    if (isFileRequired && !file) {
      alert("File is required when status is Closed.");
      return;
    }
    handleStatusChange();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      e.target.value = null; // Clear the file input
      setFile(null); // Clear the file state
    } else {
      setFile(selectedFile);
    }
  };

  return (
    showModal && (
      <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
        {savingChanges && <CircularProgress color="inherit" />}
        <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full max-w-md">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Change Status
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Transaction ID: {selectedTransaction?.TT_TRXNO}
              </p>
              <select
                className="form-select mb-2"
                value={newStatus || selectedTransaction?.TT_STATUS}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="O">Open</option>
                <option value="P">Process</option>
                <option value="C">Closed</option>
              </select>
              <textarea
                className="form-textarea mt-2 block w-full"
                placeholder="Remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
              {newStatus === "C" && (
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={!newStatus || savingChanges || (newStatus === "C" && !file)}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                (!newStatus || savingChanges || (newStatus === "C" && !file)) && "opacity-50 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
