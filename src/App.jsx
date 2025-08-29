
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard.jsx'
import Events from './pages/Events'
import Expenses from './pages/Expensives'
import Reports from './pages/Reports'
import Sports from './pages/Sports'

const App = () => {
  return (
    <>
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/events" element={<Events />} />
           <Route path="/expenses" element={<Expenses />} />
           <Route path="/reports" element={<Reports />} />
           <Route path="/sports" element={<Sports />} />
         </Routes>
       </BrowserRouter>
    </>

  )
}

export default App;


