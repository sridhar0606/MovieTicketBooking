import React,{useState,useEffect}from 'react';
import api from '../api/index.js'
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate()

const select =()=>{

navigate(`/movielist`)
}

  return (
    <div>
<nav class="navbar navbar-dark bg-dark justify-content-between" >
  <a class="navbar-brand">Ticket Booking</a>
  <form class="form-inline">
    
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={()=>select()}>Movie List</button>
  </form>
</nav>
    </div>


  );
}
