
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
           movie_name: { type: String, required: true },
           director: { type: String, required: true },
           poster_image: { type: String, required: true },
           total_seats:{ type: String, required: true },
           running_date:{ type: String, required: true },
           show_times:{type: Schema.Types.Mixed},
           cast:{type: Schema.Types.Mixed},
           alloted_seats: {type: Schema.Types.Mixed},
    },
      {collection: 'Movie'} 

)

module.exports = mongoose.model('Movie', Movie)