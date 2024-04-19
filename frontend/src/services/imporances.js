import axios from "axios";
const modelUrl = "http://127.0.0.1:8000/model/importances/";
const predictVarUrl = "http://127.0.0.1:8000/model/var_importances/";
const modelRecurrence = "http://127.0.0.1:8000/model/recurrence/";

const getAll = async () => {
  const request = axios.get(modelUrl);
  console.log(request);
  console.log("Getting importances...");
  return request.then((response) => response.data.Payload);
};

const predictFeature = async (dataId) => {
  console.log(dataId);
  const predictUrl = predictVarUrl + dataId;
  const request = axios.get(predictUrl);
  return request.then((response) => response.data.Payload);
};

const getRecurrence = async (feature) => {
  const predictUrl = modelRecurrence + feature;
  const request = axios.get(predictUrl);
  return request.then((response) => response.data.Payload.recurrence_rates);
};

export default { getAll, predictFeature, getRecurrence };
