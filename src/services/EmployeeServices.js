import api from '../api/api';

const getAllEmployees = () => {
  return api.get('/employees');
};

const updateEmployee = (id, data) => {
  return api.put(`/employees/${id}`, data);
};

const searchEmployees = (term) => {
  return api.get(`/employees/?q=${term}`);
};

export default {
  getAllEmployees,
  updateEmployee,
  searchEmployees,
};
