
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
           name: { type: String, required: true },
           mobile:{ type: Number, required: true },
            Mytickets:{type: Schema.Types.Mixed},
    },
      {collection: 'User'} 

)

module.exports = mongoose.model('User', User)