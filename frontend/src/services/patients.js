import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/data/";

const getAll = async () => {
  const request = axios.get(baseUrl);
  console.log(request);
  console.log("Getting the patient data");
  return request.then((response) => response.data.Payload.data);
};

export default { getAll };
