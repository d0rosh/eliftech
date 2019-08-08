import axios from 'axios';
const domain = 'http://localhost:3333';

const addItem = name => {
  return axios.post(`${domain}/api/add_item`, {
    name: name
  });
};

const editItem = item => {
  return axios.put(`${domain}/api/edit_item`, item);
};

const deleteItem = id => {
  return axios.delete(`${domain}/api/delete_item/${id}`);
};

const getItems = () => {
  return axios.get(`${domain}/api/get_items`);
};

export const apiService = {
  addItem,
  editItem,
  deleteItem,
  getItems
};
