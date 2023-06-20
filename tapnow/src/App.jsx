
import './App.css'
import Analytics from './Pages/Analytics'
import Contact from './Pages/Contact'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Profileedit from './Pages/Profileedit'
import Register from './Pages/Register'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'


function App() {


  return (
    <>
 <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profileedit' element={<Profileedit />} />
          <Route path='/contacts' element={<Contact />} />
          <Route path='/analytics' element={<Analytics />} />





        </Routes>
        </BrowserRouter>
    
    </>
  )
}

export default App
