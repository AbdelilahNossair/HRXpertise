import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';



function StatusLeave() {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [values, setValues] = useState([]);
    const [value, setValue] = useState([]);
    const [state, setState] = useState([]);
    const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');
    const [employeeLeaves, setEmployeeLeaves] = useState([]);

    const selectLeave = async (empId, empPass) => {
        try {
            const { data, error } = await supabase.rpc('get_employee_leave', {
                empid: empId,
                emppass: empPass,
            });

            if (error) {
                console.error('Error retrieving employee leave data:', error);
                return;
            }
            console.log('yes');
            setEmployeeLeaves(data);
            return data;

        } catch (error) {
            console.error('Error retrieving employee leave data:', error);
        }
        
    };

    async function selectLeaveConfirmed(empId, empPass) {
        try {
            const { data, error } = await supabase.rpc('get_employee_leave_confirmed', {
                empid: empId,
                emppass: empPass,
            });

            if (error) {
                console.error('Error retrieving employee leave data:', error);
                return;
            }
            console.log('yes');
            setValue(data);
            return data;

        } catch (error) {
            console.error('Error retrieving employee leave data:', error);
        }
      };
  
      async function selectLeaveRefused(empId, empPass) {
        try {
            const { data, error } = await supabase.rpc('get_employee_leave_refused', {
                empid: empId,
                emppass: empPass,
            });

            if (error) {
                console.error('Error retrieving employee leave data:', error);
                return;
            }
            console.log('yes');
            setState(data);
            return data;

        } catch (error) {
            console.error('Error retrieving employee leave data:', error);
        }
      };

    const handleSubmit = (event) => {
        event.preventDefault();

        const empid = event.target.elements.id.value;
        const emppass = event.target.elements.pass.value;

        selectLeave(empid, emppass);
        selectLeaveConfirmed(empid, emppass);
        selectLeaveRefused(empid, emppass);

    };





    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Menu</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <Link to='/RequestLeave' href="#" className="nav-link align-middle px-0 text-white">
                                    <i className="fs-4 bi-pencil-square"></i> <span className="ms-1 d-none d-sm-inline">Demande de Congé</span>
                                </Link>

                            </li>
                            <li className="nav-item">
                                <Link to='/StatusLeave' href="#" className="nav-link align-middle px-0 text-white">
                                    <i className="fs-4 bi-search"></i> <span className="ms-1 d-none d-sm-inline">Status de Congés</span>
                                </Link>

                            </li>
                            <li>
                                <Link to='/ProfileEmp' href="#" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
                            </li>
                            <li>
                                <Link to='/login' href="#" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4  bi-box-arrow-right"></i> <span className="ms-1 d-none d-sm-inline">Se Déconnecter</span> </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className='p-4 d-flex justify-content-center'>
                        <h3>Système de Gestion RH<i> - HRXpertise</i></h3>
                    </div>
                    <div>
                        <div className='flex-column align-content-around justify-content-center center'>
                            <div className='px-5 py-1'>
                                <div className='p-1'>
                                    <h3>Status des congés</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="text">
                                                <strong>Identifiant</strong>
                                            </label>
                                            <input
                                                type="number"
                                                onChange={e => setValues({ ...values, emp_id: e.target.value })}
                                                placeholder="Entrer votre identifiant"
                                                name="id"
                                                className="form-control rounded-0"
                                            />
                                            <label htmlFor="text">
                                                <strong>Mot de passe</strong>
                                            </label>
                                            <input
                                                type="password"
                                                onChange={e => setValues({ ...values, emp_pass: e.target.value })}
                                                placeholder="Entrer votre mot de passe"
                                                name="pass"
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

                        </div>
                        <div className='flex-row'>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        {/*<th style={{ textAlign: 'center' }}>Identifiant du demandeur</th>*/}
                                        <th style={{ textAlign: 'center' }}>Identifiant de la demande</th>
                                        <th style={{ textAlign: 'center' }}>Date de départ</th>
                                        <th style={{ textAlign: 'center' }}>Date de retour</th>
                                        <th style={{ textAlign: 'center' }}>Type</th>
                                        <th style={{ textAlign: 'center' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeeLeaves.map((leave, index) => (
                                        <tr key={index}>
                                            {/*<td style={{ textAlign: 'center' }}>{data.emp_id}</td>*/}
                                            <td style={{ textAlign: 'center' }}>{leave.leave_id}</td>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_departure}</td>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_return}</td>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_type}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                En Cours
                                            </td>
                                        </tr>
                                    ))}
                                    {value.map((leave, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_id}</td>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_departure}</td>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_return}</td>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_type}</td>
                                            <td style={{ textAlign: 'center' }}>Confirmé</td>
                                        </tr>
                                    ))}
                                    {state.map((leave, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_id}</td>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_departure}</td>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_return}</td>
                                            <td style={{ textAlign: 'center' }}>{leave.leave_type}</td>
                                            <td style={{ textAlign: 'center' }}>Refusé</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusLeave