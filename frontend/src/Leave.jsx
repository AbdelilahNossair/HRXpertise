import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import logo from './Images/Logo HRXpertise.png';

function Leave() {

  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [state, setState] = useState([]);
  const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');

  useEffect(() => {

    async function selectLeave() {
      const { data, error } = await supabase
        .from('leave')
        .select('*')
        .is('leave_status', null);

      if (error) {
        console.error('Error selecting leave:', error);
        return null;
      }
      return data;
    }

    selectLeave().then((result) => {
      if (result) {
        setData(result);
      }
    });

    async function selectLeaveConfirmed() {
      const { data, error } = await supabase
        .from('leave')
        .select('*')
        .eq('leave_status', true);


      if (error) {
        console.error('Error selecting leave:', error);
        return null;
      }

      return data;
    }

    selectLeaveConfirmed().then((result) => {
      if (result) {
        setValue(result);
      }
    });

    async function selectLeaveRefused() {
      const { data, error } = await supabase
        .from('leave')
        .select('*')
        .eq('leave_status', false);


      if (error) {
        console.error('Error selecting leave:', error);
        return null;
      }

      return data;
    }

    selectLeaveRefused().then((result) => {
      if (result) {
        setState(result);
      }
    });

  }, []);


  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('leave')
        .delete()
        .eq('leave_id', id)

      if (error) {
        console.error('Error deleting leave:', error);
        return;
      }
      console.log('Employee deleted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting leave:', error);
    }
  };


  const handleConfirmation = async (id) => {
    try {
      const { error } = await supabase
        .from('leave')
        .update({ leave_status: true })
        .eq('leave_id', id);

      if (error) {
        console.error('Error updating leave status:', error);
        return;
      }

      // If the update is successful, update the local data state
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return { ...item, leave_status: true };

        }
        return item;
      });

      setData(updatedData);
      console.log('Leave status updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating leave status:', error);
    }
  };

  const handleRejection = async (id) => {
    try {
      const { error } = await supabase
        .from('leave')
        .update({ leave_status: false })
        .eq('leave_id', id);

      if (error) {
        console.error('Error updating leave status:', error);
        return;
      }

      // If the update is successful, update the local data state
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return { ...item, leave_status: false };

        }
        return item;
      });

      setData(updatedData);
      console.log('Leave status updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating leave status:', error);
    }
  };

  const handlePrint = (leave) => {
    const printContent = `
      <div>
        <img src="${logo}" alt="Logo" style="display: block; margin: 0 auto; width: 100px;">
        <h1 style="text-align: center;">HRXpertise</h1>
        <h2 style="text-align: center;">l'essence de l'ordre</h2>
        <p> </p>
        <p> </p>
        <p>Fiche de congé:</p>
        <p>Identifiant de la demande: ${leave.leave_id}</p>
        <p>Identifiant du demandeur: ${leave.emp_id}</p>
        <p>Date de départ: ${leave.leave_departure}</p>
        <p>Date de retour: ${leave.leave_return}</p>
        <p>Type de congé: ${leave.leave_type}</p>
      </div>
    `;
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Fiche de congé</title>
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

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

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

  return (
    <div>
      <div className='flex-column align-content-around justify-content-center center'>
        <div className='px-5 py-1'>
          <div className='p-1'>
            <h3>Liste de congés En cours</h3>
          </div>
        </div>
      </div>
      <div className='flex-row'>

        <table className='table'>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('emp_id')}>
                  Identifiant du demandeur {sortColumn === 'emp_id' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('leave_id')}>
                  Identifiant de la demande {sortColumn === 'leave_id' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('leave_departure')}>
                  Date de départ {sortColumn === 'leave_departure' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('leave_return')}>
                  Date de retour {sortColumn === 'leave_return' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              <th style={{ textAlign: 'center' }}>
                <div onClick={() => handleSort('leave_type')}>
                  Type {sortColumn === 'leave_type' && <span>{sortDirection === 'asc' ? '' : ''}</span>}
                </div>
              </th>
              <th style={{ textAlign: 'center' }}>Confirmation</th>
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
              .map((leave, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{leave.emp_id}</td>
                  <td style={{ textAlign: 'center' }}>{leave.leave_id}</td>
                  <td style={{ textAlign: 'center' }}>{leave.leave_departure}</td>
                  <td style={{ textAlign: 'center' }}>{leave.leave_return}</td>
                  <td style={{ textAlign: 'center' }}>{leave.leave_type}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="button-group">
                      <button onClick={e => handleConfirmation(leave.leave_id)} className='btn btn-sm btn-primary col-12' >Confirmer</button>
                      <button onClick={e => handleRejection(leave.leave_id)} className='btn btn-sm btn-danger col-12' style={{ marginTop: '10px' }}>Rejeter</button>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <Link to={'/leaveEdit/' + leave.leave_id} className='btn btn-sm btn-primary col-12'>Modifier</Link>
                    <button onClick={e => handleDelete(leave.leave_id)} className='btn btn-sm btn-danger col-12' style={{ marginTop: '10px' }}>Supprimer</button>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={e => handlePrint(leave)} className='btn btn-success btn-sm' style={{ marginLeft: '10px', textAlign: 'center'  }}>Imprimer</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className='flex-column align-content-around justify-content-center center'>
        <div className='px-5 py-1'>
          <div className='p-1'>
            <h3>Liste de congés Traités</h3>
          </div>
        </div>
      </div>
      <div className='flex-row'>

        <table className='table'>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Identifiant du demandeur</th>
              <th style={{ textAlign: 'center' }}>Identifiant de la demande</th>
              <th style={{ textAlign: 'center' }}>Date de départ</th>
              <th style={{ textAlign: 'center' }}>Date de retour</th>
              <th style={{ textAlign: 'center' }}>Type</th>
              <th style={{ textAlign: 'center' }}>Status</th>
              <th style={{ textAlign: 'center' }}>Action</th>
              <th style={{ textAlign: 'center' }}>Imprimer</th>
            </tr>
          </thead>
          <tbody>
            {value.map((leave, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center' }}>{leave.emp_id}</td>
                <td style={{ textAlign: 'center' }}>{leave.leave_id}</td>
                <td style={{ textAlign: 'center' }}>{leave.leave_departure}</td>
                <td style={{ textAlign: 'center' }}>{leave.leave_return}</td>
                <td style={{ textAlign: 'center' }}>{leave.leave_type}</td>
                <td style={{ textAlign: 'center' }}>Confirmé</td>
                <td style={{ textAlign: 'center' }}>
                  <Link to={'/leaveEdit/' + leave.leave_id} className='btn btn-sm btn-primary me-2'>Modifier</Link>
                  <button onClick={e => handleDelete(leave.leave_id)} className='btn btn-sm btn-danger' style={{ marginLeft: '10px' }}>Supprimer</button>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={e => handlePrint(leave)} className='btn btn-success btn-sm' style={{ marginLeft: '10px' }}>Imprimer</button>
                </td>
              </tr>
            ))}
            {state.map((leave, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center' }}>{leave.emp_id}</td>
                <td style={{ textAlign: 'center' }}>{leave.leave_id}</td>
                <td style={{ textAlign: 'center' }}>{leave.leave_departure}</td>
                <td style={{ textAlign: 'center' }}>{leave.leave_return}</td>
                <td style={{ textAlign: 'center' }}>{leave.leave_type}</td>
                <td style={{ textAlign: 'center' }}>Refusé</td>
                <td style={{ textAlign: 'center' }}>
                  <Link to={'/leaveEdit/' + leave.leave_id} className='btn btn-sm btn-primary me-2'>Modifier</Link>
                  <button onClick={e => handleDelete(leave.leave_id)} className='btn btn-sm btn-danger' style={{ marginLeft: '10px' }}>Supprimer</button>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={e => handlePrint(leave)} className='btn btn-success btn-sm' style={{ marginLeft: '10px' }}>Imprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Leave