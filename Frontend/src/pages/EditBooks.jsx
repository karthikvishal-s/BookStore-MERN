import React from 'react';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-store-api-two-psi.vercel.app/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (e) => {
    
    setLoading(true);
    axios
      .put(`https://book-store-api-two-psi.vercel.app/books/${id}`, {
        title,
        author,
        publishYear,
      })
      .then((response) => {
        console.log('Book created:', response.data);
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error creating book:', error);
        setLoading(false);
      });
  };

  return (
    <div className='p-4'>
      <BackButton destination='/' />
      <h1 className='text-3xl font-bold text-center'>Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleEdit} className='bg-yellow-200 p-4 rounded-lg shadow-md'>
          <div className='mb-4'>
            <label className='block text-lg font-semibold mb-2'>Title:</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border border-gray-300 p-2 w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-lg font-semibold mb-2'>Author:</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border border-gray-300 p-2 w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-lg font-semibold mb-2'>Publish Year:</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border border-gray-300 p-2 w-full'
              required
            />
          </div>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
            Edit Book
          </button>
        </form>
      )}
   .
    </div>
  )
}

export default EditBooks;
