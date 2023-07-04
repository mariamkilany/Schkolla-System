import { useState } from "react";
import jwtInterceoptor from "../helpers/jwtInterceptor";

const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (method, url, body, action) => {
    setLoading(true);
    try {
      const res = await jwtInterceoptor[method](url, body);
      if (method === "get" || method === "post") {
        setData(res.data);
        return res.data;
      }
      setError(null);
      if (action) action();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return { fetchData, data, loading, error };
};
export default useAxios;
