import axios from "axios";
const patientsUrl = "http://0.0.0.0/data/";
const modelUrl = "http://0.0.0.0/model/";

const getAll = async () => {
  const request = axios.get(patientsUrl);
  console.log("Getting the patient data...");
  return request.then((response) => response.data.Payload.data);
};

const predictPatient = async (patientid, user) => {
  const predictUrl = modelUrl + patientid + "?user_id=" + user.id;
  const request = axios.get(predictUrl);
  return request.then((response) => response.data.Payload);
};

const changeFeatures = async (data, user) => {
  const request = axios.post(modelUrl + "change_features", {
    features: data,
    user_id: user.id,
  });
  return request.then((response) => response.data.Payload);
};

export default { getAll, predictPatient, changeFeatures };
