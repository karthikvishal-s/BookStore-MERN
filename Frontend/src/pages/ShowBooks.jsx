import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBooks = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://book-store-backend-jet.vercel.app/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex bg-gradient-to-b from-black via-sky-900 to-black px-4">
        <Spinner />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col  bg-gradient-to-b from-black via-sky-900 to-black px-4 text-white">
        <BackButton destination="/home" />
        <p className="mt-10 text-xl">Book not found.</p>
      </div>
    );
  }

  return (
    <div className=' min-h-screen bg-gradient-to-b from-black via-sky-900 to-black px-4 py-8 flex flex-col '>
      <div >
      <BackButton destination="/home" /></div>

      <div className="flex justify-center items-center">
      
      <div className="justify-center items-center  bg-opacity-100 backdrop-blur-lg rounded-xl shadow-lg max-w-xl w-full p-8 text-white mt-6">
        <h1 className="text-4xl font-bold mb-6 text-center">{book.title}</h1>
        <div className="space-y-4 text-lg">
          <p><span className="font-semibold">Author:</span> {book.author}</p>
          <p><span className="font-semibold">Publish Year:</span> {book.publishYear}</p>
          {book.link && (
            <p>
              <span className="font-semibold">Link:</span>{' '}
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-600 underline break-all"
              >
                {book.link}
              </a>
            </p>
          )}
          <p><span className="font-semibold">Created At:</span> {new Date(book.createdAt).toLocaleString()}</p>
          <p><span className="font-semibold">Updated At:</span> {new Date(book.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default ShowBooks;
