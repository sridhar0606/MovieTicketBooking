const express = require('express')

const MovieCtrl = require('../controllers/movie_ctrl')

const router = express.Router()

router.get('/MovieCollection',MovieCtrl.MovieCollection)
router.post('/Booking_movie',MovieCtrl.Booking_movie)
router.post('/deletemovie', MovieCtrl.deletemovie)
router.post('/seatcheck', MovieCtrl.seatcheck)
router.post('/ticketbook', MovieCtrl.ticketbook)

module.exports = router