import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../config/AxiosInstance";

export const useFetch = (url) => {
  const [datas, setDatas] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const fetchData = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: url,
      });
      console.log(response);
      setDatas(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return [datas, isLoading, error];
};
