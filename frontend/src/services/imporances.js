import axios from "axios";
const modelUrl = "http://127.0.0.1:8000/model/importances/";

const getAll = async () => {
  const request = axios.get(modelUrl);
  console.log(request);
  console.log("Getting the patient data");
  return request.then((response) => response.data.Payload.data);
};

const predictFeature = async (dataId) => {
  console.log(dataId);
  const predictUrl = modelUrl + dataId;
  const request = axios.get(predictUrl);
  return request.then((response) => response.data.Payload);
};

export default { getAll, predictFeature };
