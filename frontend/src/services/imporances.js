import axios from "axios";
const modelUrl = "http://127.0.0.1:8000/model/";

const getAll = async () => {
  const request = axios.get(modelUrl + "importances/");
  console.log(request);
  console.log("Getting importances...");
  return request.then((response) => response.data.Payload);
};

const predictFeature = async (dataId) => {
  console.log(dataId);
  const predictUrl = modelUrl + "var_importances/" + dataId;
  const request = axios.get(predictUrl);
  return request.then((response) => response.data.Payload);
};

const getRecurrence = async (feature) => {
  const predictUrl = modelUrl + "recurrence/" + feature;
  const request = axios.get(predictUrl);
  return request.then((response) => response.data.Payload.recurrence_rates);
};

const changeFeatures = async (data) => {};

export default { getAll, predictFeature, getRecurrence };
