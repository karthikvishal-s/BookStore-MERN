import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox } from 'react-icons/md';
import BackButton from '../components/BackButton';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [totalPublishYear, setTotalPublishYear] = useState(0); // <-- New state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all books
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        if (response.data.books) {
          setBooks(response.data.books);
          console.log(response.data.books);
        } else if (response.data.data) {
          setBooks(response.data.data);
          console.log(response.data.data);
        } else {
          setBooks(Array.isArray(response.data) ? response.data : []);
          console.log(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Fetch total publishYear sum
  useEffect(() => {
    axios
      .get('http://localhost:5555/books/sum/publishYear')
      .then((response) => {
        setTotalPublishYear(response.data.totalPublishYear || 0);
      })
      .catch((error) => {
        console.error('Error fetching total publish year:', error);
      });
  }, []);

  return (
    <div className='relative inset-0 min-h-screen'>
      <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
  </div>
      <div className='flex  items-center '>
      <BackButton destination={'/'} />
      
        <h1 className='text-5xl my-8 text-white'>
          <div className='items-center ml-100'>
          <h1 className='text-center'>Books list</h1>
          </div>
          
        </h1>
      </div>
      <div className='flex justify-end mr-20'>
        <Link to='/books/create' >
          <img src='/plus.png' className='w-20 '></img>
        </Link>
      </div>
      <br /><br />
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : books && books.length > 0 ? (
        <div>
          <table className='border-gray-300 items-center mx-auto w-full max-w-5xl text-white '>
            <thead>
              <tr>
                <th className='border-r px-2 py-2 text-2xl '>No</th>
                <th className='border-r px-4 py-2 text-2xl'>Title</th>
                <th className='border-r px-4 py-2 max-md:hidden text-2xl'>Author</th>
                <th className=' px-2 py-2 max-md:hidden text-2xl'>Publish Year</th>
                <th className=' px-4 py-2 text-2xl'></th>
              </tr>
            </thead>
            <tbody>
  {books.map((book, index) => (
    <tr
      key={book._id}
      onClick={() => window.location.href = `/books/details/${book._id}`}
      className='h-8 cursor-pointer hover:bg-gray-700 transition-all duration-200 '
    >
      <td className='border-t border-r px-4 py-2 text-center '>{index + 1}</td>
      <td className='border-t border-r px-4 py-2 text-center'>{book.title}</td>
      <td className='border-t  border-r px-4 py-2 max-md:hidden text-center'>{book.author}</td>
      <td className='border-t  px-4 py-2 max-md:hidden text-center'>{book.publishYear}</td>
      <td className=' px-4 py-2'>
      <td className='px-4 py-2'>
  <div className='flex justify-center gap-x-4'>
    <Link
      to={`/books/edit/${book._id}`}
      className='text-green-500 hover:text-green-800'
      onClick={(e) => e.stopPropagation()} // Stop event bubbling
    >
      <AiOutlineEdit className='text-2xl' />
    </Link>
    <Link
      to={`/books/delete/${book._id}`}
      className='text-red-500 hover:text-red-800'
      onClick={(e) => e.stopPropagation()} // Stop event bubbling
    >
      <AiOutlineDelete className='text-2xl' />
    </Link>
  </div>
</td>

      </td>
    </tr>
  ))}
</tbody>

            
          </table>
          <br /><br /><br />
        </div>
      ) : (
        <div className="text-center py-4">No books found. Add some books to see them here.</div>
      )}

      
    </div>
  );
};

export default Home;
