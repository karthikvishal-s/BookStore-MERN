import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const DeleteBookModal = ({ id, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`https://book-store-backend-jet.vercel.app/books/${id}`)
      .then((response) => {
        setLoading(false);
        onSuccess();   // Refresh list after delete
        onClose();     // Close modal
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
        setLoading(false);
      });
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"
      ></div>

      {/* Modal */}
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-[400px]">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Are you sure you want to delete this book?
            </h3>
            <button
              onClick={handleDelete}
              className="w-full bg-red-600 text-white py-3 rounded mb-4 hover:bg-red-700 transition"
            >
              Yes, Delete it
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-300 text-black py-3 rounded hover:bg-gray-400 transition"
            >
              No, Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default DeleteBookModal;
