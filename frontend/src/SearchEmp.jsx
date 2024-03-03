import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import logo from './Images/Logo HRXpertise.png';

function SearchEmp() {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [values, setValues] = useState({});

    const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');


    const navigate = useNavigate('')

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('employee')
                .delete()
                .eq('emp_id', id);

            if (error) {
                console.error('Error deleting employee:', error);
                return;
            }
            console.log('Employee deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handlePrint = (employee) => {
        const printContent = `
          <div>
            <img src="${logo}" alt="Logo" style="display: block; margin: 0 auto; width: 100px;">
            <h1 style="text-align: center;">HRXpertise</h1>
            <h2 style="text-align: center;">l'essence de l'ordre</h2>
            <p>Fiche d'employé:</p>
            <p>Identifiant: ${employee.emp_id}</p>
            <p>Nom complet: ${employee.emp_name}</p>
            <p>Date de Naissance: ${employee.emp_dob}</p>
            <p>Adresse: ${employee.emp_address}</p>
            <p>Poste: ${employee.emp_poste}</p>
            <p>Grade: ${employee.emp_grade}</p>
            <p>Salaire: MAD${employee.emp_salary}</p>
            <p>Departement: ${employee.dpt_code}</p>
          </div>
        `;
        const printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Fiche de l'employé</title>
              <style>
                h1, h2 {
                  font-family: Arial, sans-serif;
                }
              </style>
            </head>
            <body>
              ${printContent}
              <script type="text/javascript">
                window.onload = function() {
                  window.print();
                  window.onafterprint = function() {
                    window.close();
                  };
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
    };

    /*
    const handleSubmit = async (event) => {
        event.preventDefault();

        //const id = event.target.elements.id.value;

        //const selectedEmployee = await selectEmployee(id);

        //if (selectedEmployee) {
        //  console.log('Selected employee:', selectedEmployee);
        //  window.location.reload();
        //} else {
        //    setError('Aucun employé ne correspond à notre recherche');
        //}
        const { emp_id } = values;

        try {
            const { error } = await supabase
            .from('employee')
            .select('*')
            .eq('emp_id', emp_id);

            if (error) {
                console.error('Error deleting employee:', error);
                return;
            }
            console.log('Employee deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };*/

    const handleSubmit = async (event) => {
        event.preventDefault();
        async function selectEmployee() {
            const { emp_id } = values;
            const { data, error } = await supabase
                .from('employee')
                .select('*')
                .eq('emp_id', emp_id);

            if (error) {
                console.error('Error selecting employee:', error);
                return null;
            }
            return data;
        }

        selectEmployee().then((result) => {
            if (result) {
                setData(result);
            }
        });
    }


    return (
        <div>
            <div className='flex-column align-content-around justify-content-center center'>
                <div className='px-5 py-1'>
                    <div className='p-1'>
                        <h3>Recherche d'employés</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="text">
                                <strong>Identifiant</strong>
                            </label>
                            <input
                                type="text"
                                onChange={e => setValues({ ...values, emp_id: e.target.value })}
                                placeholder="Entrer votre identifiant"
                                name="id"
                                className="form-control rounded-0"
                            />
                        </div>
                        <button type="submit"
                            className="btn  w-100 rounded-0"
                            style={{
                                background: 'linear-gradient(to right, #87CEEB, #6495ED)',
                                color: '#fff',
                            }}>
                            Rechercher
                        </button>
                        <div className='text-center text-danger px-3'>{error}</div>
                        {/*<div className='text-danger'>{error && error}</div>
                        <div className='text-center text-danger px-3'>{error}</div>*/}
                    </form>
                </div>
            </div>
            <div className='flex-row'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Identifiant</th>
                            <th style={{ textAlign: 'center' }}>Mot de passe</th>
                            <th style={{ textAlign: 'center' }}>Nom complet</th>
                            <th style={{ textAlign: 'center' }}>Date de Naissance</th>
                            <th style={{ textAlign: 'center' }}>Adresse</th>
                            <th style={{ textAlign: 'center' }}>Poste</th>
                            <th style={{ textAlign: 'center' }}>Grade</th>
                            <th style={{ textAlign: 'center' }}>Salaire</th>
                            <th style={{ textAlign: 'center' }}>Action</th>
                            <th style={{ textAlign: 'center' }}>Imprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((employee, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{employee.emp_id}</td>
                                <td style={{ textAlign: 'center' }}>{employee.emp_pass}</td>
                                <td style={{ textAlign: 'center' }}>{employee.emp_name}</td>
                                <td style={{ textAlign: 'center' }}>{employee.emp_dob}</td>
                                <td style={{ textAlign: 'center' }}>{employee.emp_address}</td>
                                <td style={{ textAlign: 'center' }}>{employee.emp_poste}</td>
                                <td style={{ textAlign: 'center' }}>{employee.emp_grade}</td>
                                <td style={{ textAlign: 'center' }}>{employee.emp_salary}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link to={'/employeeEdit/' + employee.emp_id} className='btn btn-sm btn-primary me-2'>Modifier</Link>
                                    <button onClick={e => handleDelete(employee.emp_id)} className='btn btn-sm btn-danger' style={{ marginLeft: '10px' }}>Supprimer</button>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button onClick={e => handlePrint(employee)} className='btn btn-success btn-sm' style={{ marginLeft: '10px' }}>Imprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default SearchEmp;
