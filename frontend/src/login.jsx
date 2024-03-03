/*import React, { useState } from 'react';
import logo from './Images/Logo HRXpertise.png';
import backgroundImage from './Images/image_hospital.avif';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {handleLogin} from './App'
//import {selectEmployee} from '../../Server/index'
//import jwt from 'jsonwebtoken';

function Login() {
    const [error, setError] = useState(null);
    const [values, setValues] = useState({ id: '', password: '' });

   const navigate = useNavigate('')   

    const handleSubmit = async (event) => {
        event.preventDefault();

        const id = event.target.elements.id.value;
        const password = event.target.elements.password.value;
        handleLogin(id, password)
        try {
            const response = await axios.post('http://localhost:3001/login', {
              id: id,
              password: password
            });
      
            console.log(response.data);
            if(response.data.emp_admin==true){
                navigate('/');
              }
              else{
                navigate('/EmpHome/'+id);
              }

            
              
          } catch (error) {
            console.error('Error logging in:', error.message);
            setError('Identifiant ou/et Mot de passe invalide');
          }
    };



    return (
        <table
            style={{
                width: '100%',
                border: 'none',
                borderCollapse: 'collapse',
            }}>
            <tbody>
                <tr>
                    <td style={{ padding: '10px' }}>
                        <div className="d-flex flex-column align-items-center vh-100">
                            <img
                                src={logo}
                                alt="Logo"
                                style={{ width: '200px', height: 'auto', marginBottom: '1rem' }}
                            />
                            <h2 className="text-center mb-6"><strong>HRXpertise</strong></h2>
                            <div className="bg-white p-4 rounded " style={{ width: '30rem' }}>
                            
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="text">
                                            <strong>Identifiant</strong>
                                        </label>
                                        <input
                                            type="text"
                                            onChange={e => setValues({ ...values, id: e.target.value })}
                                            placeholder="Entrer votre identifiant"
                                            name="id"
                                            className="form-control rounded-0"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password">
                                            <strong>Mot de passe</strong>
                                        </label>
                                        <input
                                            type="password"
                                            onChange={e => setValues({ ...values, password: e.target.value })}
                                            placeholder="Entrer votre mot de passe"
                                            name="password"
                                            className="form-control rounded-0"
                                        />
                                    </div>
                                    <button type="submit"
                                        className="btn  w-100 rounded-0"
                                        style={{
                                            background: 'linear-gradient(to right, #87CEEB, #6495ED)',
                                            color: '#fff',
                                        }}>
                                        Se Connecter
                                    </button>
                                    <p className="text-center mt-3">
                                        Vous acceptez notre politique de confidentialité
                                    </p>
                                    <div className='text-center text-danger px-3'>{error}</div>
                                </form>
                            </div>
                        </div>
                    </td>
                    <td  style={{
                        padding: '10px',
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                    }}>
                        <img
                            src={backgroundImage}
                            alt="Image"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </td>
                </tr>
            </tbody>
        </table >
    );
}


export default Login;
*/

// Login.js
import React, { useEffect, useState } from 'react';
import logo from './Images/Logo HRXpertise.png';
import backgroundImage from './Images/image_hospital.avif';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';


function Login({ onLogin }) {
  const [error, setError] = useState(null);
  const [values, setValues] = useState({ id: '', password: '' });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const id = values.id;
    const password = values.password;

    const currentDate = new Date();

    updateEmployeeSolde();

    try {
      const isLoggedIn = await onLogin(id, password);
      if (isLoggedIn) {
        navigate('/');
      } else {
        navigate('/EmpHome/' + id);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Identifiant ou/et Mot de passe invalide');
    }
  };

  const currentDate = new Date();
  const updateEmployeeSolde = async () => {
    

    const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');
    try {
      const { data, error } = await supabase
        .from('employee')
        .select('year_update_solde, emp_solde')
        .eq('emp_id', 1000)
        .single();

      console.log(data);

      if (error) {
        console.error(error);
        return;
      }

      const year = data.year_update_solde;
      const currentYear = currentDate.getFullYear();
      console.log(year === currentYear);

      if (
        currentDate.getMonth() === 0 &&
        currentDate.getDate() === 1 &&
        year === currentYear
      ) {
        try {
          const { data, error } = await supabase.rpc('update_ys', {});
          if (error) {
            console.error(error);
            return;
          }

          console.log('Stored procedure executed successfully!');
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {


  
    
  
  }, []);
  

  return (
    <table
      style={{
        width: '100%',
        border: 'none',
        borderCollapse: 'collapse',
      }}
    >
      <tbody>
        <tr>
          <td style={{ padding: '10px' }}>
            <div className="d-flex flex-column align-items-center vh-100">
              <img
                src={logo}
                alt="Logo"
                style={{ width: '200px', height: 'auto', marginBottom: '1rem' }}
              />
              <h2 className="text-center mb-6">
                <strong>HRXpertise</strong>
              </h2>
              <div className="bg-white p-4 rounded " style={{ width: '30rem' }}>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="text">
                      <strong>Identifiant</strong>
                    </label>
                    <input
                      type="text"
                      value={values.id}
                      onChange={(e) => setValues({ ...values, id: e.target.value })}
                      placeholder="Entrer votre identifiant"
                      name="id"
                      className="form-control rounded-0"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">
                      <strong>Mot de passe</strong>
                    </label>
                    <input
                      type="password"
                      value={values.password}
                      onChange={(e) => setValues({ ...values, password: e.target.value })}
                      placeholder="Entrer votre mot de passe"
                      name="password"
                      className="form-control rounded-0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn  w-100 rounded-0"
                    style={{
                      background: 'linear-gradient(to right, #87CEEB, #6495ED)',
                      color: '#fff',
                    }}
                  >
                    Se Connecter
                  </button>
                  <p className="text-center mt-3">Vous acceptez notre politique de confidentialité</p>
                  <div className="text-center text-danger px-3">{error}</div>
                </form>
              </div>
            </div>
          </td>
          <td
            style={{
              padding: '10px',
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <img
              src={backgroundImage}
              alt="Image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Login;
