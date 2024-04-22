import axios from "axios";
const patientsUrl = "http://127.0.0.1:8000/data/";
const modelUrl = "http://127.0.0.1:8000/model/";

const getAll = async () => {
  const request = axios.get(patientsUrl);
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

const changeFeatures = async (data, user) => {
  console.log("1.", data);
  console.log("2.", user);
  const request = axios.post(modelUrl + "change_features", {
    features: data,
    user_id: user.id,
  });
  return request.then((response) => response.data.Payload);
};

export default { getAll, predictPatient, changeFeatures };
