import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditBookModal = ({ id, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [link, setLink] = useState(''); // New state for link
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`https://book-store-backend-jet.vercel.app/books/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLink(res.data.link || ''); // Load existing link or empty string
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.put(`https://book-store-backend-jet.vercel.app/books/${id}`, { title, author, publishYear, link }) // send link
      .then(() => {
        setLoading(false);
        onSuccess(); // Refresh parent
        onClose();   // Close modal
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Book</h2>
        <form onSubmit={handleEdit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            placeholder="Title"
            required
          />
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            placeholder="Author"
            required
          />
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            placeholder="Year"
            required
          />
          {/* New Link input */}
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Book link (URL)"
            pattern="https?://.+"
            title="Please enter a valid URL starting with http:// or https://"
          />
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="px-3 py-2 bg-gray-300 rounded-full">Cancel</button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-full hover:bg-blue-700"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
