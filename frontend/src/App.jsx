/*import React from 'react'
import Login from './login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashbord from './Dashbord'
import Employee from './Employee'
import Profile from './Profile'
import Home from './Home'
import AddEmployee from './AddEmployee'
import Leave from './Leave'
import AddLeave from './AddLeave'
import EmployeeEdit from './employeeEdit'
import LeaveEdit from './LeaveEdit'
import SearchEmp from './SearchEmp'
import SearchLeave from './SearchLeave'
import ProfileEdit from './ProfileEdit'
import EmpHome from './EmpHome'
import ProfileEmp from './ProfileEmp'
import ProfileEditEmp from './ProfileEditEmp'
import RequestLeave from './RequestLeave'
import StatusLeave from './StatusLeave'



function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<Login/>}>
        <Route path='/' element={<Dashbord/>}>
          <Route path ='' element={<Home/>}></Route>
          <Route path ='/employee' element={<Employee/>}></Route>
          <Route path ='/profile' element={<Profile/>}></Route>
          <Route path ='/leave' element={<Leave/>}></Route>
          <Route path ='/createEmp' element={<AddEmployee/>}></Route>
          <Route path = '/createLeave' element={<AddLeave/>}></Route>
          <Route path = '/employeeEdit/:id' element={<EmployeeEdit/>}></Route>
          <Route path = '/leaveEdit/:id' element={<LeaveEdit/>}></Route>
          <Route path = '/SearchEmp/' element={<SearchEmp/>}></Route>
          <Route path = '/leaveSearch/' element={<SearchLeave/>}></Route>
          <Route path = '/ProfileEdit/:id' element={<ProfileEdit/>}></Route>
          
          
        </Route>
        <Route path = '/EmpHome/:id' element={<EmpHome/>}></Route>
        <Route path = '/ProfileEmp' element={<ProfileEmp/>}></Route>
        <Route path = '/ProfileEditEmp/:id' element={<ProfileEditEmp/>}></Route>  
        <Route path = '/RequestLeave' element={<RequestLeave/>}></Route>  
        <Route path = '/StatusLeave' element={<StatusLeave/>}></Route>  
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App*/
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Dashboard from './Dashbord';
import Employee from './Employee';
import Profile from './Profile';
import Home from './Home';
import AddEmployee from './AddEmployee';
import Leave from './Leave';
import AddLeave from './AddLeave';
import EmployeeEdit from './EmployeeEdit';
import LeaveEdit from './LeaveEdit';
import SearchEmp from './SearchEmp';
import SearchLeave from './SearchLeave';
import ProfileEdit from './ProfileEdit';
import EmpHome from './EmpHome';
import ProfileEmp from './ProfileEmp';
import ProfileEditEmp from './ProfileEditEmp';
import RequestLeave from './RequestLeave';
import StatusLeave from './StatusLeave';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoggedInEmp, setLoggedInEmp] = useState(false);

  const handleLogin = async (id, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        id: id,
        password: password
      });

      console.log(response.data);
      if (response.data.emp_admin === true) {
        setLoggedIn(true);
        setLoggedInEmp(false);
        return true;
      } else {
        setLoggedIn(false);
        setLoggedInEmp(true);
      }

    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Identifiant ou/et Mot de passe invalide');
    }
  };

  const handleOnLogin = async (id, password) => {
    await handleLogin(id, password);
    if (handleLogin.IsLoggingIn === true) {
      navigate('/');
    } else {
      navigate('/EmpHome/' + id);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {isLoggedIn ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
        {true ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/employee" element={<Navigate to="/employee" replace />} />
        )}
        {isLoggedIn ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/profile" element={<Navigate to="/login" replace />} />
        )}
        {true ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/leave" element={<Navigate to="/leave" replace />} />
        )}
        {isLoggedIn ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/createEmp" element={<Navigate to="/login" replace />} />
        )}
         {isLoggedIn ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/createLeave" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedIn ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/employeeEdit/:id" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedIn ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/leaveEdit/:id" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedIn ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/SearchEmp" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedIn ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/leaveSearch" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedIn ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/createEmp" element={<AddEmployee />} />
            <Route path="/createLeave" element={<AddLeave />} />
            <Route path="/employeeEdit/:id" element={<EmployeeEdit />} />
            <Route path="/leaveEdit/:id" element={<LeaveEdit />} />
            <Route path="/SearchEmp/" element={<SearchEmp />} />
            <Route path="/leaveSearch/" element={<SearchLeave />} />
            <Route path="/ProfileEdit/:id" element={<ProfileEdit />} />
          </Route>
        ) : (
          <Route path="/ProfileEdit/:id" element={<Navigate to="/login" replace />} />
        )}
        

        {isLoggedInEmp ? (
          <Route path="/EmpHome/:id" element={<EmpHome />} />
        ) : (
          <Route path="/EmpHome/:id" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedInEmp ? (
          <Route path='/ProfileEmp' element={<ProfileEmp />}></Route>
        ) : (
          <Route path="/ProfileEmp" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedInEmp ? (
          <Route path='/ProfileEditEmp/:id' element={<ProfileEditEmp />}></Route>
        ) : (
          <Route path="/ProfileEditEmp/:id" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedInEmp ? (
          <Route path='/RequestLeave' element={<RequestLeave />}></Route>
        ) : (
          <Route path="/RequestLeave" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedInEmp ? (
          <Route path='/StatusLeave' element={<StatusLeave />}></Route>
        ) : (
          <Route path="/StatusLeave" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
