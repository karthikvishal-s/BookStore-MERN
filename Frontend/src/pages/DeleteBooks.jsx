import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';


const DeleteBooks = () => {

  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((response) => {
        console.log('Book deleted:', response.data);
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
        setLoading(false);
      });
  };

  return (
    <div className='p-4'>
      <BackButton/>
     
      {loading ? <Spinner></Spinner>:" "}
      <div className='flex flex-col items-center border-2 border-sky-600 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDelete}>
          Yes,Delete it
        </button>
      </div>
          </div>
  )
}

export default DeleteBooks;
