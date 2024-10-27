import React, { useEffect ,useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AxiosInstance } from '../../config/AxiosInstance';

export const MovieDetails = () => {
  const navigate =useNavigate()
  const [movie, setMovie] = useState(null); 
  const {id} = useParams()

console.log("id===",id);


const movieFetchingDetails= async()=>{
  try {
    const response = await AxiosInstance({
      method:"GET",
      url:`/movie//movie-byid/${id}`
    } )
    console.log(response,'===response');
    setMovie(response.data.movie)
    
  } catch (error) {
    
  }
}

useEffect(()=>{
  movieFetchingDetails()
},[id])

const bookings = ()=>{
  navigate(`/Movies/movie-details/${id}/bookings`)
}


  return (
<div className="flex ">
      {movie &&(
        <div className="w-4/12 max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">{movie.title}</h1>
           
            <p className="mt-3 text-sm text-gray-500">
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Duration:</strong> {movie.duration} mins
            </p>
          </div>
        </div>
        
      )}
      {movie &&
      <div className='w-10/12 ml-6'>
        <p className="text-gray-600 text-3xl mt-2">{movie.description}</p>
        <p><strong>Trailer</strong> {movie.trailerUrl}</p>
       <button onClick={() => bookings()} className= "bg-red-600 text-white hover:bg-red-800 px-4 py-2 rounded-md">Book Tickets</button>
        </div>
      }
      
</div>
          
  );
};
