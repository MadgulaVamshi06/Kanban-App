
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register';
import Notes from '../Pages/Notes';
import Logout from '../Pages/Logout';


const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/notes' element={<Notes/>}/>
            <Route path='/logout' element={<Logout/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes ;
