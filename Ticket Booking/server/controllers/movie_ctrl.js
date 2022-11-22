const Movie = require('../models/movie_model.js')

MovieCollection = async (req, res) => {
Movie.aggregate([{
  $group: { "_id": "$_id","movie_name":{ "$first": "$movie_name"},"director":{ "$first": "$director"},"poster_image":{ "$first": "$poster_image"},"running_date":{ "$first": "$running_date"}} 
      }
     ],(err,data )=> {

      if (err) {
          return res.status(400).json({ message:"movie not found" })
        }
          else{
       return res.status(200).json({"data":data}) 
            }
        })
}

Booking_movie=async(req, res)=>{

const body = req.body
 
 
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to get record ',
        })
    }

 Movie.findOne({_id: body.id}, (err, movie) => {

      if (err) {
    return res.status(400).json({ message:'movie not fount  '})
        }else{

      return res.status(200).json({movie})
       
     }
     })

}

deletemovie = async (req, res) => {
   const body = req.body

 Movie.findOne({ _id: body.id }, (err, user) => {
    
     if (err) {

            return res.status(400).json({
                err,
                message: 'movie not found!',
            })
           }
  Movie.deleteOne({_id: body.id},(chg, remove) => {
       
           if (chg) {
               return res.status(400).json({chg, message:'Remove  unsuccessful'})
                 }
        else{
         return res.status(200).json({message: 'movie remove successful', data:user})
          }
     })
   })
}


seatcheck = async (req, res) => {

const body =req.body


  Movie.findOne({"_id": body.id},{"alloted_seats": {$elemMatch: {date:body.date}}},(err, seats) => {

   if(err){
    return res.status(400).json({ message:"data not found" });
     }
 if(seats.alloted_seats !=undefined){

return res .status(200).json({ seat:seats.alloted_seats[0]["seats"]});
 }else{
return res .status(200).json({ seat:[]});
 }

  }
    )
};


ticketbook = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  Movie.findOne({ _id: body.id }, (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "user not found!"
      });
    }

    Movie.findOne(
      { _id: body.id, "alloted_seats.date": body.date },
      (errmsg, update) => {
        if (errmsg) {
          return res.status(400).json({
            message: "user not found!"
          });
        }

        if (update != null) {
          Movie.updateOne(
            { _id: body.id, "alloted_seats.date": body.date },
            {
              $push: {
                "alloted_seats.$.seats": {
                  seat: body.seatnumber
                }
              }
            },
            (upt, reupdate) => {
              if (upt) {
                return res.status(400).json({ upt, message: "not update" });
              } else {
                return res.status(200).json({ message: "booking successful" });
              }
            }
          );
        } else {
          Movie.updateOne(
            { _id: body.id },
            {
              $push: {
                alloted_seats: {
                  date: body.date,
                  seats: [
                    {
                      seat:body.seatnumber
                    }
                  ]
                }
              }
            },
            (chg, booking) => {
              if (chg) {
                return res.status(400).json({ message: "not update" });
              } else {
                return res.status(200).json({ message: "booking successful" });
              }
            }
          );
        }
      }
    );
  });
};


module.exports = {
   MovieCollection,
   Booking_movie,
   deletemovie,
   seatcheck,
   ticketbook
}