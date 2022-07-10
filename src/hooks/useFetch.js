import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (endPoint) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(endPoint);
    setData(response.data);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return data;
};

export default useFetch;
