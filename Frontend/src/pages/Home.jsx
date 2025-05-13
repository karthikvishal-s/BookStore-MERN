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
      .get('https://book-store-backend-jet.vercel.app/books')
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
    <div className='bg-blue-200 min-h-screen'>
      <div className='flex justify-around items-center '>
        <h1 className='text-4xl  my-8 text-red-600 font-bold'>
          <center><u>Books List</u></center>
        </h1>

      </div><br></br><br></br>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : books && books.length > 0 ? (
        <div>
          <table className=' border border-gray-300 justify-between  items-center  mx-auto w-full max-w-5xl'>
            <thead>
              <tr>
                <th className='border px-2 py-2 text-2xl'>No</th>
                <th className='border px-4 py-2 text-2xl'>Title</th>
                <th className='border px-4 py-2 max-md:hidden text-2xl'>Author</th>
                <th className='border px-2 py-2 max-md:hidden text-2xl'>Publish Year</th>
                <th className='border px-4 py-2 text-2xl'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className='h-8 hover:bg-gray-100'>
                  <td className='border px-4 py-2'>{index + 1}</td>
                  <td className='border px-4 py-2'>{book.title}</td>
                  <td className='border px-4 py-2 max-md:hidden'>{book.author}</td>
                  <td className='border px-4 py-2 max-md:hidden text-center'>{book.publishYear}</td>
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
          </table><br></br><br></br><br></br></div>
      ) : (
        <div className="text-center py-4">No books found. Add some books to see them here.</div>
      )}<div className='flex justify-center my-4'>

        <Link to='/books/create' className='bg-blue-500 text-2xl text-white px-4 py-2 rounded-lg flex items-center hover:text-blue-200'>
          <MdOutlineAddBox className='align-center mr-2 text-3xl' />
          Create Book
        </Link></div>
    </div>
  );
};

export default Home;