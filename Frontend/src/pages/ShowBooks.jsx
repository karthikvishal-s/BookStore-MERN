import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import  Spinner from '../components/Spinner';

const ShowBooks = () => {
  const {id} = useParams();
  const [book,setBook] = useState({});
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-store-api-two-psi.vercel.app/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
        setLoading(false);
      });},[id])

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl font-bold text-center'>Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='bg-yellow-200 p-4 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-2'>Title: {book.title}</h2>
          <p className='text-lg mb-2'>Author: {book.author}</p>
          <p className='text-lg mb-2'>Publish Year: {book.publishYear}</p>
          <p className='text-lg mb-2'>Created At: {new Date(book.createdAt).toString()}</p>
          <p className='text-lg mb-2'>Updated At: {new Date(book.updatedAt).toString()}</p>
        </div>
      )}
    </div>
  )
}

export default ShowBooks;
