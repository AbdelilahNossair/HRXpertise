import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

function SearchLeave() {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [values, setValues] = useState({});

    const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');


    const navigate = useNavigate('')

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('leave')
                .delete()
                .eq('leave_id', id);

            if (error) {
                console.error('Error deleting employee:', error);
                return;
            }
            console.log('Leave deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting leave:', error);
        }
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
        async function selectLeave() {
            const { leave_id } = values;
            const { data, error } = await supabase
                .from('leave')
                .select('*')
                .eq('leave_id', leave_id);

            if (error) {
                console.error('Error selecting employee:', error);
                return null;
            }
            return data;
        }

        selectLeave().then((result) => {
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
                        <h3>Recherche de congé</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="text">
                                <strong>Identifiant de la demande</strong>
                            </label>
                            <input
                                type="text"
                                onChange={e => setValues({ ...values, leave_id: e.target.value })}
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
                            <th style={{ textAlign: 'center' }}>Identifiant du demandeur</th>
                            <th style={{ textAlign: 'center' }}>Identifiant de la demande</th>
                            <th style={{ textAlign: 'center' }}>Date de départ</th>
                            <th style={{ textAlign: 'center' }}>Date de retour</th>
                            <th style={{ textAlign: 'center' }}>Type</th>
                            <th style={{ textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((leave, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{leave.emp_id}</td>
                                <td style={{ textAlign: 'center' }}>{leave.leave_id}</td>
                                <td style={{ textAlign: 'center' }}>{leave.leave_departure}</td>
                                <td style={{ textAlign: 'center' }}>{leave.leave_return}</td>
                                <td style={{ textAlign: 'center' }}>{leave.leave_type}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link to={'/leaveEdit/' + leave.leave_id} className='btn btn-sm btn-primary me-2'>Modifier</Link>
                                    <button onClick={e => handleDelete(leave.leave_id)} className='btn btn-sm btn-danger' style={{ marginLeft: '10px' }}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default SearchLeave;
