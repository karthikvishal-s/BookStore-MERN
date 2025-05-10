import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        // Check response structure and access books correctly
        if (response.data.books) {
          setBooks(response.data.books);
        } else if (response.data.data) {
          setBooks(response.data.data);
        } else {
          setBooks(Array.isArray(response.data) ? response.data : []);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>
          Books List
        </h1>
        <Link to='/books/create' className='bg-blue-500 text-white px-4 py-2 rounded flex items-center'>
          <MdOutlineAddBox className='mr-2' />
          Create Book
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : books && books.length > 0 ? (
        <table className='min-w-full border border-gray-300'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>No</th>
              <th className='border px-4 py-2'>Title</th>
              <th className='border px-4 py-2 max-md:hidden'>Author</th>
              <th className='border px-4 py-2 max-md:hidden'>Publish Year</th>
              <th className='border px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className='h-8'>
                <td className='border px-4 py-2'>{index + 1}</td>
                <td className='border px-4 py-2'>{book.title}</td>
                <td className='border px-4 py-2 max-md:hidden'>{book.author}</td>
                <td className='border px-4 py-2 max-md:hidden'>{book.publishYear}</td>
                <td className='border px-4 py-2'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/books/details/${book._id}`} className='text-blue-500 hover:text-blue-800'>
                      <BsInfoCircle className='text-2xl' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`} className='text-green-500 hover:text-green-800'>
                      <AiOutlineEdit className='text-2xl' />
                    </Link>
                    <Link to={`/books/delete/${book._id}`} className='text-red-500 hover:text-red-800'>
                      <AiOutlineDelete className='text-2xl' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4">No books found. Add some books to see them here.</div>
      )}
    </div>
  );
};

export default Home;