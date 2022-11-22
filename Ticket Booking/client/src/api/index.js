import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
   
})



export const MovieCollection = () => api.get(`/MovieCollection`)

export const Booking_movie = payload => api.post(`/Booking_movie`, payload)

export const deletemovie = payload => api.post(`/deletemovie`, payload)

export const seatcheck = payload => api.post(`/seatcheck`, payload)

export const ticketbook = payload => api.post(`/ticketbook`, payload)

export const Createuser = payload => api.post(`/Createuser`, payload)


const apis = {
  MovieCollection,
  Booking_movie,
  deletemovie,
  seatcheck,
  ticketbook,
  Createuser
 }

export default apis