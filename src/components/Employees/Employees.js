import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import styled from 'styled-components';
import { ColorPicker } from '../ColorPicker';
import { Card } from '../Card';
import { isNull, isUndefined } from 'lodash';
import debouncedInput from '../DebouncedInput/DebouncedInput';
import EmployeeServices from '../../services/EmployeeServices';

const EmployeeslListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  align-items: flex-start;
  justify-items: flex-start;
`;
const EmployeeImage = styled.img`
  width: 100%;
`;
const EmployeeName = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 3px;
`;
const EmployeeTitle = styled.p`
  font-size: 12px;
  margin-bottom: 15px;
`;
const EmployeeBio = styled.p`
  font-size: 14px;
`;
const EmployeeTextBody = styled.div`
  padding: 10px;
`;

const Employees = ({ data, loading }) => {
  const [employees, setEmployees] = useState(data);
  const DebouncedTextField = debouncedInput(ColorPicker, { timeout: 300 });

  const setEmployeeBackground = (employeeModel, backgroundColor) => {
    EmployeeServices.updateEmployee(employeeModel.uuid, {
      ...employeeModel,
      background: backgroundColor,
    })
      .then((response) => {
        data.forEach((employee, index) => {
          if (employee.uuid === response.data.uuid) {
            data[index] = response.data;
            setEmployees(data);
            buildEmployeeList(employees);
          }
        });
      })
      .catch((error) => {
        console.error('Failed updating background color...', error);
      });
  };

  const handleBackgroundChange = (e, employeeModel) => {
    setEmployeeBackground(employeeModel, e.target.value);
  };

  const employeeList = [];
  const buildEmployeeList = (list) => {
    list.map((employee) => {
      if (
        isNull(employee.avatar) ||
        isUndefined(employee.avatar) ||
        employee.avatar === '0' ||
        employee.avatar === 0 ||
        employee.avatar.includes('httpstat.us/503')
      ) {
        employee.avatar = process.env.PUBLIC_URL + '/default_user_img.jpg';
      }

      employee.bio = employee.bio.replace(/(<([^>]+)>)/gi, '');
      if (employee.bio === '0' || employee.bio === 0) employee.bio = 'N/A';

      employeeList.push(
        <Card
          key={employee.uuid}
          backgroundColor={employee.background || '#ffffff'}>
          <EmployeeImage src={employee.avatar} />
          <EmployeeTextBody>
            <EmployeeName>{employee.name || 'No Name Specified'}</EmployeeName>
            <EmployeeTitle>
              {employee.title || 'No Title Specified'}
            </EmployeeTitle>
            <EmployeeBio>{employee.bio || 'N/A'}</EmployeeBio>
          </EmployeeTextBody>
          <DebouncedTextField
            onChange={(e) => handleBackgroundChange(e, employee)}
            value={employee.background}
          />
        </Card>
      );
    });
  };

  buildEmployeeList(data);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <EmployeeslListLayout>{employeeList}</EmployeeslListLayout>
      )}
    </>
  );
};

export default Employees;
