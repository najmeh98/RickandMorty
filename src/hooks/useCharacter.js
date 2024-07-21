import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacter(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchdata() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}=${query}`, { signal });
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        // fetch => err.name == "AbortError"
        // axios.isCancel()
        if (!axios.isCancel) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchdata();
    return () => {
      controller.abort();
    };
  }, [query]);

  return {
    isloading,
    characters,
    setCharacters,
    setIsLoading,
  };
}
