import React, { useEffect, useState } from 'react';
import { Pagination } from '../Pagination';
import Employees from '../Employees/Employees';
import EmployeeServices from '../../services/EmployeeServices';
import Search from '../Search/Search';

const EmployeeList = () => {
  const [employeesPerPage] = useState(20);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  // Fetching Employees
  const retrieveEmployees = () => {
    setLoading(true);
    EmployeeServices.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
        console.info('Employees Loaded');
        setLoading(false);
      })
      .catch((error) => {
        console.error('API Service Thew: ', error.message);
        console.debug(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    retrieveEmployees();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    if (debouncedTerm === '') return;
    searchEmployees();
  }, [debouncedTerm]);

  const searchEmployees = () => {
    EmployeeServices.searchEmployees(debouncedTerm)
      .then((response) => {
        setEmployees(response.data);
        configPaginator();
      })
      .catch(() => {
        console.error('Error retrieving data for search term');
      });
  };

  const onSearchTermChange = (e) => {
    if (e.target.value.length === 0) {
      retrieveEmployees();
    }
    setTerm(e.target.value);
  };

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

  return (
    <div>
      <Search onChange={onSearchTermChange} value={term} />
      <Employees data={currentEmployees} loading={loading} />
      {employees.length > employeesPerPage && (
        <Pagination
          totalItems={employees.length}
          itemsPerPage={employeesPerPage}
          onPaginate={paginate}
        />
      )}
    </div>
  );
};
export default EmployeeList;
