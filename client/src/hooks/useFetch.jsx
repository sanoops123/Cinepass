import { useEffect, useState } from "react";
import { AxiosInstance } from "../config/AxiosInstance";

export const useFetch = async() => {
    
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true)
try {
    const fetchData = await AxiosInstance
    ({
        method:"GET",
        url:"/movie/get-movies"
    })

    setData(fetchData.data.movieList)
    console.log(fetchData,("===fetchdata"));
    
} catch (error) {
    console.log(error);
    
}

useEffect(()=>{
 fetchData()
},[]) 
    
 return [data,isLoading]
}