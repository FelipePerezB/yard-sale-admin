import endPoints from "@services/api";
import axios from "axios";

const options = {
  Headers:{
    accept: "*/*",
    "Content-Type": "application/json"
  }
}; 

const addProduct = async (product) => {
  const response = await axios.post(endPoints.products.create, product, options);
  return response.data;
};

const deleteProduct = async (id) =>{
  const response = await axios.delete(endPoints.products.delete(id), options);
  return response.data;
};

const updateProduct = async (id, product) =>{
  const response = await axios.put(endPoints.products.update(id), product, options);
  return response.data;
};
export {addProduct, deleteProduct, updateProduct};