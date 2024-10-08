import axios from "axios";
const url = "https://fairml-481932072131.europe-west1.run.app/users/";

const createUser = async (user) => {
  const request = axios.post(url, {
    userid: user.id,
  });
  return request.then((response) => {
    response.data.StatusCode;
  });
};

const predictPatient = async (patientid) => {
  const predictUrl = modelUrl + patientid;
  const request = axios.get(predictUrl);
  return request.then((response) => response.data.Payload);
};

const changeFeatures = async (data) => {
  const request = axios.post(modelUrl + "change_features", data);
  return request.then((response) => response.data.Payload);
};

export default { createUser };
