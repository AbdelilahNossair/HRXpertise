
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import logo from './Images/Logo HRXpertise.png';

function Employee() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [supabase] = useState(createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc'));

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  useEffect(() => {
    async function selectEmployee() {
      const { data, error } = await supabase
        .from('employee')
        .select('*');

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
  }, []);

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
        <p>Departement: ${employee.emp_type}</p>
        <p>Adresse: ${employee.emp_address}</p>
        <p>PPR: ${employee.emp_ppr}</p>
        <p>Poste: ${employee.emp_poste}</p>
        <p>Grade: ${employee.emp_grade}</p>
        <p>Service: ${employee.emp_service}</p>
        <p>Date de recrutement: ${employee.hire_date}</p>
        <p>Salaire: MAD${employee.emp_salary}</p>
       
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

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked again, reverse the sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If a different column is clicked, set the new column and sort direction to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const toggleColumn = (column) => {
    if (hiddenColumns.includes(column)) {
      setHiddenColumns(hiddenColumns.filter((col) => col !== column));
    } else {
      setHiddenColumns([...hiddenColumns, column]);
    }
  };

  const isColumnHidden = (column) => hiddenColumns.includes(column);

  return (
    <div>
      <div className='flex-column align-content-around justify-content-center center'>
        <div className='px-5 py-1'>
          <div className='p-1'>
            <h3>Liste d'employés</h3>
          </div>
        </div>
      </div>
      <div className='col-10'>
        <button onClick={() => toggleColumn('emp_pass')}> {isColumnHidden('emp_pass') ? ' Afficher le mot de passe' : 'Masquer le mot de passe'}</button>
        <button onClick={() => toggleColumn('emp_name')}> {isColumnHidden('emp_name') ? ' Afficher le nom' : 'Masquer le nom'}</button>
        <button onClick={() => toggleColumn('emp_dob')}> {isColumnHidden('emp_dob') ? ' Afficher la date de naissance' : 'Masquer la date de naissance'}</button>
        <button onClick={() => toggleColumn('emp_address')}> {isColumnHidden('emp_address') ? " Afficher l'adresse" : "Masquer l'adresse"}</button>
        <button onClick={() => toggleColumn('emp_poste')}> {isColumnHidden('emp_poste') ? ' Afficher le poste' : 'Masquer le poste'}</button>
        <button onClick={() => toggleColumn('emp_grade')}> {isColumnHidden('emp_grade') ? ' Afficher le grade' : 'Masquer le grade'}</button>
        <button onClick={() => toggleColumn('emp_service')}> {isColumnHidden('emp_service') ? ' Afficher le service' : 'Masquer le service'}</button>
        <button onClick={() => toggleColumn('emp_salary')}> {isColumnHidden('emp_salary') ? ' Afficher le salaire' : 'Masquer le salaire'}</button>
        <button onClick={() => toggleColumn('emp_type')}> {isColumnHidden('emp_type') ? ' Afficher le type' : 'Masquer le type'}</button>
        <button onClick={() => toggleColumn('emp_ppr')}> {isColumnHidden('emp_ppr') ? ' Afficher le PPR' : 'Masquer le PPR'}</button>
        <button onClick={() => toggleColumn('hire_date')}> {isColumnHidden('hire_date') ? ' Afficher la date de recrutement' : 'Masquer la date de recrutement'}</button>

      </div>
      <div className='flex-row'>
        <table className='table'>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_id')}>
                  Identifiant {sortColumn === 'emp_id' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              
              {!isColumnHidden('emp_pass') && (
                <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_pass')}>
                  Mot de passe {sortColumn === 'emp_pass' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              
              </th>
              )}
              {!isColumnHidden('emp_name') && (
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_name')}>
                  Nom complet {sortColumn === 'emp_name' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              )}
              {!isColumnHidden('emp_dob') && (
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_dob')}>
                  Date de Naissance {sortColumn === 'emp_dob' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              )}
              {!isColumnHidden('emp_address') && (
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_address')}>
                  Adresse {sortColumn === 'emp_address' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              )}
              {!isColumnHidden('emp_poste') && (
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_poste')}>
                  Poste {sortColumn === 'emp_poste' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              )}
              {!isColumnHidden('emp_grade') && (
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_grade')}>
                  Grade {sortColumn === 'emp_grade' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              )}
              {!isColumnHidden('emp_service') && (
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_service')}>
                  Service {sortColumn === 'emp_service' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              )}
              {!isColumnHidden('emp_salary') && (
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_salary')}>
                  Salaire {sortColumn === 'emp_salary' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              )}
              {!isColumnHidden('emp_ppr') && (
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_ppr')}>
                  PPR {sortColumn === 'emp_ppr' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              )}
              {!isColumnHidden('hire_date') && (
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('hire_date')}>
                  Date de recrutement {sortColumn === 'hire_date' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              )}
              {!isColumnHidden('emp_type') && (
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_type')}>
                  Type {sortColumn === 'emp_type' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              )}
              <th style={{ textAlign: 'center' }}>Action</th>
              <th style={{ textAlign: 'center' }}>Imprimer</th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => {
                // Sorting logic based on the selected column and direction
                if (sortColumn && sortDirection) {
                  if (sortDirection === 'asc') {
                    return a[sortColumn] > b[sortColumn] ? 1 : -1;
                  } else {
                    return a[sortColumn] < b[sortColumn] ? 1 : -1;
                  }
                } else {
                  return 0;
                }
              })
              .map((employee, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{employee.emp_id}</td>
                  {!isColumnHidden('emp_pass') && (
                    <td style={{ textAlign: 'center' }}>{employee.emp_pass}</td>
                  )}
                  {!isColumnHidden('emp_name') && (
                  <td style={{ textAlign: 'center' }}>{employee.emp_name}</td>
                  )}
                  {!isColumnHidden('emp_dob') && (
                  <td style={{ textAlign: 'center' }}>{employee.emp_dob}</td>
                  )}
                  {!isColumnHidden('emp_address') && (
                  <td style={{ textAlign: 'center' }}>{employee.emp_address}</td>
                  )}
                  {!isColumnHidden('emp_poste') && (
                  <td style={{ textAlign: 'center' }}>{employee.emp_poste}</td>
                  )}
                  {!isColumnHidden('emp_grade') && (
                  <td style={{ textAlign: 'center' }}>{employee.emp_grade}</td>
                  )}
                  {!isColumnHidden('emp_service') && (
                  <td style={{ textAlign: 'center' }}>{employee.emp_service}</td>
                  )}
                  {!isColumnHidden('emp_salary') && (
                  <td style={{ textAlign: 'center' }}>{employee.emp_salary}</td>
                  )}
                  {!isColumnHidden('emp_ppr') && (
                  <td style={{ textAlign: 'center' }}>{employee.emp_ppr}</td>
                  )}
                    {!isColumnHidden('hire_date') && (
                  <td style={{ textAlign: 'center' }}>{employee.hire_date}</td>
                  )}
                  {!isColumnHidden('emp_type') && (
                  <td style={{ textAlign: 'center' }}>{employee.emp_type}</td>
                  )}
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Link to={'/employeeEdit/' + employee.emp_id} className='btn btn-sm btn-primary me-2' style={{ flex: 1 }}>
                        Modifier
                      </Link>
                      <button onClick={e => handleDelete(employee.emp_id)} className='btn btn-sm btn-danger' style={{ flex: 1 }}>
                        Supprimer
                      </button>
                    </div>
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

export default Employee;
