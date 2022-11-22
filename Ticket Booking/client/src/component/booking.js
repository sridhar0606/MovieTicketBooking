import React,{useState,useEffect}from 'react';
import Navbar from '../component/nav.js'
import Seats from '../component/seats.js'
import moment from 'moment'
import api from '../api/index.js'
import { useParams } from 'react-router-dom';

const Booking =(props)=>{
const[Movie,setMovie]=useState({})
const[View,setView]=useState(0)
const[Selectdate,setSelectdate]=useState("")
const params = useParams()

useEffect(()=>{
api.Booking_movie(params).then (res => {
//alert(JSON.stringify(res))

     if(res.status == 200 ){

        setMovie(res.data.movie)

          }else{

        //alert(res.data.message)
         }
      
    
          }) 

},[])


const selectbook=()=>{
 setView(1)
}
return(
<div>
    
<Navbar/>
<div class="container-fluid">
  {View == 0 ?(
<>
 <div class="card">
              <div class="card-body">
                 <div class="row">
                  <div class="col-md-5">
                    <img
                      style={{ borderRadius: "15px",height:"90%" ,width:"60%"}}
                      src={Movie.poster_image}
                      class="card-img-top"
                    />
                  </div>

                  <div class="col-md-7">
                    <center>
                      <h1>{Movie.movie_name}</h1>
                    </center>

                    <p> Date : {Movie.running_date}  </p>
                     <p> Director : {Movie.director} </p>
                       <p> Rating : 8/10 </p>
                    <button
                    onClick={()=>selectbook()}
                      type="button"
                      class="btn btn-primary btn-lg btn-block"
                      style={{
                        backgroundColor: "#f84464",
                        border: "1px solid #f84464",
                        marginTop: "100px"
                      }}
                    >
                      Book Ticket
                    </button>
                  </div>
                </div>
              </div>
}
               
 </div>

</>
  	):(

<>

<Seats  moviename={Movie.movie_name}image={Movie.poster_image}/>

</>
  	)}
  
 </div>    
</div>
    ) 
}
 
export default Booking;