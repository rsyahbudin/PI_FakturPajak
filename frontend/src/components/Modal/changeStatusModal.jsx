import React from "react";

const ChangeStatusModal = ({ isOpen, onClose, transaction, onStatusChange }) => {
  const [newStatus, setNewStatus] = React.useState("");
  const [remarks, setRemarks] = React.useState("");
  const [file, setFile] = React.useState(null);

  const handleStatusChange = () => {
    onStatusChange(newStatus, remarks, file);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full max-w-md">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Change Status
            </h3>
            <p className="text-sm text-gray-500 mb-2">Transaction ID: {transaction?.TT_TRXNO}</p>
            <select
              className="form-select mb-2"
              value={newStatus || transaction?.TT_STATUS}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Process">Process</option>
            </select>
            <textarea
              className="form-textarea mt-2 block w-full"
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
            {/* File upload input */}
            {newStatus === 'Closed' && (
              <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
          />
            )}
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={handleStatusChange}
            disabled={!newStatus}
            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
              !newStatus && "opacity-50 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatusModal;