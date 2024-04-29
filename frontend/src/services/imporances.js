import axios from "axios";
const modelUrl = "http://127.0.0.1:8000/model/";

const getModel = async (user) => {
  const request = axios.get(modelUrl + "?user_id=" + user.id);
  console.log("Getting importances...");
  return request.then((response) => response.data.Payload);
};

const getAll = async (user) => {
  const request = axios.get(modelUrl + "importances/?user_id=" + user.id);
  console.log("Getting importances...");
  return request.then((response) => response.data.Payload);
};

const predictFeature = async (dataId) => {
  const predictUrl = modelUrl + "var_importances/" + dataId;
  const request = axios.get(predictUrl);
  return request.then((response) => response.data.Payload);
};

const getRecurrence = async (feature) => {
  const predictUrl = modelUrl + "recurrence/" + feature;
  const request = axios.get(predictUrl);
  return request.then((response) => response.data.Payload.recurrence_rates);
};

export default { getModel, getAll, predictFeature, getRecurrence };
