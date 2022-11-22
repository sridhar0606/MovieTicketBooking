import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import moment from "moment";
import api from '../api/index.js'
import { useNavigate } from 'react-router-dom';
export default function App(props) {
    const navigate = useNavigate()
  const [Showdate, setShowdate] = useState(6);
  const [Today, setToday] = useState(new Date().toLocaleDateString());
  const [color, setcolor] = useState(0);
  const [Tickets, setTickets] = useState(100);
  const [Booked, setBooked] = useState([]);
  const [selectseat, setselectseat] = useState("");
    const [name, setname] = useState("");
      const [mobile, setmobile] = useState("");
  const[Moviename,setMoviename]=useState(props.moviename)
  const[image,setimage]=useState(props.image)
  const params = useParams()

 useEffect(()=>{

handlegetmovie();

},[])


const  handlegetmovie=()=>{

  	const record={
 	  id:params.id,
      date:moment(new Date(Today)).format("MM/DD/YYYY")
 	}

api.seatcheck(record).then (res => {
//alert(JSON.stringify(res))
	if(res.status == 200){
   setBooked(res.data.seat)
	}else{
//alert(res.data.message)
	}
 }) 
    	
 }


  const select = (index) => {
    const cngdate = moment().add(index, "days").toDate();
    const ff = moment(new Date(cngdate)).format("MM/DD/YYYY");
    setcolor(index);
    setToday(ff);

    const record={
    id:params.id,
      date: moment(new Date(cngdate)).format("MM/DD/YYYY")
  }

api.seatcheck(record).then (res => {
//alert(JSON.stringify(res))
  if(res.status == 200){
   setBooked(res.data.seat)
  }else{
//alert(res.data.message)
  }
 }) 

  };


const selectpatientbed = (sltseat) => {
    alert("ww");
    if (selectseat !== sltseat) {
      const booking = Booked;
      const seat = {
        seat: sltseat
      };
      booking.push(seat);
      const singleseat = booking.filter(
        (chk) => Number(chk.seat) !== selectseat
      );
      setBooked(singleseat);
      setselectseat(sltseat);
    }
  };



const handlechange=(e,obj)=>{

if(obj == "name"){
setname(e.target.value)
}else{
setmobile(e.target.value)

}
}

 const  handleSubmit =(e)=>{
 e.preventDefault();

   const record={
      id:params.id,
      date:Today,
      seatnumber:selectseat
  }

api.ticketbook(record).then (res => {
  alert(JSON.stringify(res))
  if(res.status ==  200){

    usersave();
    }else{

      alert(res.data.message)
    }
}) 
  

  }

const usersave=()=>{

  const record = {
      username:name,
        mobile:mobile,
        moviename:Moviename,
        seat:selectseat
     }


 api.Createuser(record).then (res => {
 alert(res.data.message)
  navigate(`/`)
 })
}


  const handlerenderfunction = (value) => {
    const select = Booked;
    const checkbed = select.find((element) => element.seat == value);
    return checkbed !== undefined ? (
      checkbed.seat == selectseat ? (
        <button
          style={{
            padding: "1px 20px",
            borderWidth: "2px",
            margin: "5px",
            backgroundColor: "#f56214"
          }}
        >
          {" "}
          {value <= 9 ? "0" + value : value}{" "}
        </button>
      ) : (
        <button
          disabled="disabled"
          style={{
            padding: "1px 20px",
            borderWidth: "2px",
            margin: "5px",
            backgroundColor: "green",
            cursor: "not-allowed"
          }}
        >
          {" "}
          {value <= 9 ? "0" + value : value}{" "}
        </button>
      )
    ) : (
      <button
        style={{ padding: "1px 20px", borderWidth: "2px", margin: "5px" }}
        onClick={() => selectpatientbed(value)}
      >
        {" "}
        {value <= 9 ? "0" + value : value}{" "}
      </button>
    );
  };






  const handlefunction = (date) => {
    const cngdate = moment().add(date, "days").toDate();

    return (
      <>
        <p>{moment(new Date(cngdate)).format("MMM")} </p>
        <p>{moment(new Date(cngdate)).format("DD")}</p>
      </>
    );
  };

  new Date().toLocaleDateString();
  return (
  
      <div class="container">
       
        <div class="row">
          {[...Array(Showdate)].map((elementInArray, index) => (
            <>
              <div class="col-md-2">
                <a style={{ cursor: "pointer" }} onClick={() => select(index)}>
                  <div
                    class="card"
                    style={{ background: color === index ? "#ef3f5f" : "none" }}
                  >
                    <div class="card-body">
                      <div> {handlefunction(index)} </div>
                    </div>
                  </div>
                </a>
              </div>
            </>
          ))}
        </div>

          <p> Movie Name: {Moviename} </p>
        <p> show Date: {Today} </p>
        <p> show Time: 2.30.pm </p>
         <button style={{backgroundColor:"green"}}>booked</button>   <button  style={{backgroundColor:"#f56214"}}>select</button>   <button>empty</button>
        <div class="row">
          {[...Array(Tickets)].map((elementInArray, index) => (
            <>
              <div>{handlerenderfunction(index + 1)}</div>
            </>
          ))}
        </div>

     
{selectseat != "" ?(
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
 save booking
</button>
):("")}







<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
   <form onSubmit={(e)=>handleSubmit(e)}>
        <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" onChange={(e)=>handlechange(e,"name")}  aria-describedby="emailHelp" required/>
  
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Mobile  number</label>
    <input type="number" class="form-control" onChange={(e)=>handlechange(e,"mobile")} required />
  </div>
   <button type="submit" style={{float:"right"}} class="btn btn-primary">save</button>
     </form>
      </div>

       
        
      
    </div>
  </div>
</div>









    </div>
   
  );
}