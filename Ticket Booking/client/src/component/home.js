import React,{useState,useEffect}from 'react';
import api from '../api/index.js'
import Navbar from '../component/nav.js'
import { withRouter } from "react-router";
import { useNavigate } from 'react-router-dom';
const Home=()=>{
const[Movies,setMovies]=useState([])
const navigate = useNavigate()

useEffect(()=>{

 api.MovieCollection().then (res => {
      alert(JSON.stringify(res))
    setMovies(res.data.data)
     }) 

},[])

const select =(id)=>{
alert(id)
navigate(`/booking/${id}`)
}



  return(
<div>
   {console.log("Movies",Movies)} 
<Navbar/>
<div class="container-fluid">
  <div class="row">
{Movies.map((movie,index)=>(

 <div class="col-md-3" style={{marginTop:"10px"}}>
 <a onClick={()=>select(movie._id)} style={{cursor:"pointer"}}>
<div class="card-deck">
  <div class="card">
  <center>
    <img  style={{ width: "300px",height:"300px"}} src={movie.poster_image} class="card-img-top" alt="..."/>
    </center>
    <div class="card-body">
     <center>
      <h5 class="card-title">{movie.movie_name}</h5>
      <strong> action/comedy </strong>
      </center>
     
    </div>
  </div>
  </div>
  </a>
</div>

  ))}



         
</div>
</div>
</div>
    ) 
}
 
export default Home; 