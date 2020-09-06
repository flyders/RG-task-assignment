import React, { useEffect, useState } from 'react';
import { Pagination } from '../Pagination';
import Employees from '../Employees/Employees';
import EmployeeServices from '../../services/EmployeeServices';
import Search from '../Search/Search';
import debouncedInput from '../DebouncedInput/DebouncedInput';

const EmployeeList = () => {
  const [employeesPerPage] = useState(20);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetching Employees
  const retrieveEmployees = () => {
    EmployeeServices.getAllEmployees()
      .then((response) => {
        setLoading(true);
        setEmployees(response.data);
        console.info('Employees Loaded');

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('API Service Thew: ', error.message);
        console.debug(error);
      });
  };

  useEffect(() => {
    retrieveEmployees();
  }, []);

  let currentEmployees = [];
  const configPaginator = () => {
    const end = currentPage * employeesPerPage;
    const start = end - employeesPerPage;
    currentEmployees = employees.slice(start, end);
  };

  configPaginator();

  const paginate = (pageNumber) => {
    if (pageNumber !== currentPage) setCurrentPage(pageNumber);
  };

  const searchEmployees = (term) => {
    EmployeeServices.searchEmployees(term)
      .then((response) => {
        setEmployees(response.data);
        configPaginator();
      })
      .catch((error) => {
        console.error('Error retrieving data for search term');
      });
  };

  const DebouncedTextField = debouncedInput(Search, { timeout: 500 });

  const onSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length === 0) {
      retrieveEmployees();
    } else {
      searchEmployees(e.target.value);
    }
  };

  return (
    <div>
      <DebouncedTextField onChange={onSearchTermChange} value={searchTerm} />
      <Employees data={currentEmployees} loading={loading} />
      <Pagination
        totalItems={employees.length}
        itemsPerPage={employeesPerPage}
        onPaginate={paginate}
      />
    </div>
  );
};
export default EmployeeList;
