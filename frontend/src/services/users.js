import axios from "axios";
const url = "http://127.0.0.1:8000/user/";

const getAll = async () => {
  const request = axios.get(url);
  console.log(request);
  console.log("Getting the patient data");
  return request.then((response) => response.data.Payload.data);
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

export default { getAll, predictPatient, changeFeatures };
