import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import BackButton from '../components/BackButton';
import EditBookModal from '../components/EditBookModal';
import DeleteBookModal from '../components/DeleteBookModal';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteBookId, setSelectedDeleteBookId] = useState(null);

  const [loaded, setLoaded] = useState(false);  // for animation trigger

  // Fetch all books
  const fetchBooks = () => {
    setLoading(true);
    axios
      .get('https://book-store-backend-jet.vercel.app/books')
      .then((response) => {
        const data = response.data.books || response.data.data || response.data;
        setBooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100); // delay to trigger animation
    return () => clearTimeout(timeout);
  }, []);

  const handleEditClick = (bookId) => {
    setSelectedBookId(bookId);
    setShowEditModal(true);
  };
  
  const handleDeleteClick = (bookId) => {
    setSelectedDeleteBookId(bookId);
    setShowDeleteModal(true);
  };

  return (
    <div className='relative inset-0 min-h-screen px-4 py-6'>
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <BackButton destination='/' />

      {/* Animated Collections Heading */}
      <h1
        className={`text-5xl text-white text-center font-bold mb-8 transition-all duration-[1000ms] delay-[400ms] ease-out transform ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        Collections
      </h1>

      {/* Search Bar */}
      <div
  className={`flex justify-center mb-10 transition-all duration-[1200ms] delay-[600ms] ease-out transform ${
    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}
>
  <input
    type='text'
    placeholder='Search'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className='w-full max-w-md px-4 py-2 rounded-lg border border-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-900 text-white bg-transparent placeholder-gray-400 hover:border-blue-500'
  />
</div>


      {/* Create Book Button */}
      <div
  className={`flex justify-end mb-6 mr-6 transition-all duration-[1200ms] delay-[700ms] ease-out transform ${
    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}
>
  <Link to='/books/create'>
    <img
      src='/plus-2.png'
      className='w-16 hover:scale-110 mb-10 mr-15 transition-transform cursor-pointer'
      alt='Add Book'
    />
  </Link>
</div>

      {/* Animated Book Cards Grid */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div
          className={`grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-all duration-[1600ms] delay-[800ms] ease-out transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {books
            .filter(book =>
              book.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((book) => (
              <div
                key={book._id}
                className='border border-gray-800 bg-opacity-1000 backdrop-blur-lg text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:scale-[1.02] duration-300 cursor-pointer'
                onClick={() => window.location.href = `/books/details/${book._id}`}
              >
                <h2 className='text-xl font-semibold mb-4 text-gray-300'>{book.title}</h2>
                <p className='text-sm  mb-1 text-gray-500'><span className='font-medium'>by</span> {book.author}</p>
                <p className='text-sm text-gray-500 mb-4'><span className='font-medium'></span> {book.publishYear}</p>
                <div className='flex justify-between mt-4'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(book._id);
                    }}
                    className='text-green-400 hover:text-green-600'
                  >
                    <AiOutlineEdit className='text-2xl' />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(book._id);
                    }}
                    className='text-red-400 hover:text-red-600'
                  >
                    <AiOutlineDelete className='text-2xl' />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditBookModal
          id={selectedBookId}
          onClose={() => setShowEditModal(false)}
          onSuccess={fetchBooks}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteBookModal
          id={selectedDeleteBookId}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={fetchBooks}
        />
      )}
    </div>
  );
};

export default Home;
