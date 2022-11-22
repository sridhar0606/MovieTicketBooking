import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './component/home.js';
import Booking from './component/booking.js';
import MovieList from './component/movielist.js';
function App() {
  return (
     <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking/:id" element={<Booking />} />
     <Route path="/movielist" element={<MovieList />} />
    </Routes>
  </BrowserRouter>
   </>
  );

}

export default App;