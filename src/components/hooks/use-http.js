import { toast } from "react-toastify";

export default async function useHttp({
  url,
  method = "POST",
  headers = {
    "Content-Type": "application/json",
  },
  body,
}) {
  try {
    let __res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    let __data = await __res.json();

  } catch (error) {
    if (error.message == "failed to fetch") {
      toast("Not able to connect to server");
    }
    console.log(error, "==error in useHttp==");
  }

}
