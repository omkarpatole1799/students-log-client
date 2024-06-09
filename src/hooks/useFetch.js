import { toast } from "react-toastify";

export const useFetch = async ({
  method = "POST",
  url,
  contentType = "application/json",
  data,
}) => {
  let jwtToken = localStorage.getItem("token");

  let _res = await fetch(`${process.env.REACT_APP_SERVER_IP}/${url}`, {
    method,
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${jwtToken}`,
    },
    body: contentType == "application/json" ? JSON.stringify(data) : data,
    mode: "cors",
  });

  let { _success, _message, _data } = await _res.json();

  toast(_message);

  return { _success, _message, _data };
};
