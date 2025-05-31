import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import ShowBooks from './pages/ShowBooks'
import EditBooks from './pages/EditBooks'
import DeleteBooks from './pages/DeleteBooks'
import CreateBooks from './pages/CreateBooks'
import Welcome from './pages/Welcome'
import About from './pages/About'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/about' element={<About/>}></Route>
      <Route path='/home' element={<Home />} />
      <Route path='/books/create' element={<CreateBooks />} />
      <Route path='/books/details/:id' element={<ShowBooks />} />
      <Route path='/books/edit/:id' element={<EditBooks />} />
      <Route path='/books/delete/:id' element={<DeleteBooks />} />
    </Routes>
  )
}

export default App
