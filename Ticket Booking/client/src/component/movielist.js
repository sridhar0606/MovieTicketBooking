import React,{useState,useEffect}from 'react';
import api from '../api/index.js'
import Navbar from '../component/nav.js'
import { withRouter } from "react-router";
import { useNavigate } from 'react-router-dom';
const MovieList=()=>{
const[Movies,setMovies]=useState([])
const navigate = useNavigate()

useEffect(()=>{

handlefunction();

},[])

const handlefunction=()=>{
   api.MovieCollection().then (res => {
      //alert(JSON.stringify(res))
    setMovies(res.data.data)
     }) 
}

const Remove=(id)=>{
  alert(id)
 const record ={
  id:id
 }
   api.deletemovie(record).then (res => {
    if(res.status == 200){
    alert("remove successful")
     handlefunction();
        }
    }) 
}

  return(
<div>
<Navbar/>

  <center><strong>Movie List</strong></center>

 <div class="container-fluid">
  <div class="row">
 <div class="col-md-12">


<table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">S No</th>
      <th scope="col">Poster Image</th>
      <th scope="col">Movie Name</th>
      <th scope="col">Director</th>
      <th scope="col">Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   {Movies.map((item, index) => {
        return (
    <tr>
      <th scope="row">{index+1}</th>
      <td> <img  style={{ width: "100px",height:"100px"}} src={item.poster_image}class="card-img-top" alt="..."/></td>
      <td>{item.movie_name}</td>
      <td>{item.director}</td>
      <td>{item.running_date}</td>
      <td><button type="button" onClick={()=>Remove(item._id)} class="btn btn-danger">Delete</button></td>
    </tr>
    ) } ) }
  </tbody>
</table>

  </div>
  </div>
  </div>



</div>


    ) 
}
 
export default MovieList; 