const User = require('../models/user_model.js')


Createuser = async (req, res) => {
  const body = req.body;
 

  if (!body) {
  
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  User.findOne({ mobile: body.mobile }, (err, user) => {
  
    if (err) {
    	
      return res.status(400).json({
        success: false,
        error: "user not fount "
      });
    }

    if (user) {

      User.updateOne(
        { mobile: body.mobile },
        {
          $push: {
            Mytickets: {
              movie_name: body.moviename,
              seat: body.seat
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
    } else {
    
      var collection = {
        name: body.username,
        mobile: body.mobile,
        Mytickets: [
          {
            movie_name: body.moviename,
            seat: body.seat
          }
        ]
      };

      const user = new User(collection);

      if (err) {
     
        return res.status(400).json({ success: false, error: err });
      }

      user
        .save()
        .then(() => {
        
          return res.status(200).json({ message: "booking successful" });
        })
        .catch((error) => {
        
          return res.status(400).json({
            error,
            message: "booking un successful!"
          });
        });
    }
  });
};

module.exports = {
    Createuser
}