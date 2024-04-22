import axios from "axios";
const url = "http://127.0.0.1:8000/users/";

const createUser = async (user) => {
  const request = axios.post(url, {
    userid: user.id,
  });
  return request.then((response) => {
    response.data.StatusCode;
  });
};

const predictPatient = async (patientid) => {
  console.log(patientid);
  const predictUrl = modelUrl + patientid;
  const request = axios.get(predictUrl);
  return request.then((response) => response.data.Payload);
};

const changeFeatures = async (data) => {
  const request = axios.post(modelUrl + "change_features", data);
  return request.then((response) => response.data.Payload);
};

export default { createUser };
