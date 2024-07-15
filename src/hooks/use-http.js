import { useState } from "react";

export default async function useHttp({ url, method = "GET", headers, body }) {
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  try {
    setIsLoading(true);
    let _res = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });

    if (!_res.ok) {
      let error = new Error("Unable to process request!");
      error.status = 500;
      throw error;
    }
    setData(await _res.json());
    setIsLoading(false);
  } catch (error) {
    if (error.message == "Failed to fetch") {
      setError(error.message);
    } else {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return {
    error,
    isLoading,
    data,
  };
}
