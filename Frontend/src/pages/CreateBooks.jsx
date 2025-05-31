import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:5555/books', {
        title,
        author,
        publishYear,
        link,
      })
      .then((response) => {
        console.log('Book created:', response.data);
        setLoading(false);
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error creating book:', error);
        setLoading(false);
      });
  };

  return (
    <div className=" flex min-h-screen bg-gradient-to-b from-black via-green-600 to-black px-4 py-8 flex flex-col justify-center items-center">
      <div className="  rounded-xl shadow-lg w-full max-w-md p-6 ">
      
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Create Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-semibold mb-2">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Author:</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Publish Year:</label>
              <input
                type="number"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Link:</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="px-4 py-2 bg-gray-300 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                {loading ? 'Creating...' : 'Create Book'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateBooks;
