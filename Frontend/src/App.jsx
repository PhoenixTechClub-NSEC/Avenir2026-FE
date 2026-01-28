import React, { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router'
import Home from './components/Home'
import Team from './components/Team'
import Loader from './components/Loader'
import Custom_cursor from './components/Custom_cursor'
import EventPage from './components/EventPage'
import Cam_Rep from './components/Cam_Rep'


const App = () => {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // match loader video length

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <>
    <Custom_cursor/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/events" element={<EventPage />} />
      <Route path='/team' element={<Team/>}/>
      <Route path='/campus_rep' element={<Cam_Rep/>}/>
    </Routes>
      
    </>
  )
}

export default App
