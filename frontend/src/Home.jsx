import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import backgroundImage from './Images/image_HR.jpg';

function Home() {

    const [employeeCount, setEmployeeCount] = useState(0);
    const [leaveCount, setLeaveCount] = useState(0);
    const [AdminCount, setAdminCount] = useState(0);

    useEffect(() => {

        const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');
        async function fetchEmployeeCount() {
            const { data, error } = await supabase
                .from('employee')
                .select('count', { count: 'exact' })
                .eq('emp_admin', false);

            if (error) {
                console.error('Error selecting employee count:', error);
                return;
            }

            const count = data.length > 0 ? data[0].count : 0;
            setEmployeeCount(count);
        }

        fetchEmployeeCount();

        async function fetchLeaveCount() {
            const { data, error } = await supabase
                .from('leave')
                .select('count', { count: 'exact' });

            if (error) {
                console.error('Error selecting Leave count:', error);
                return;
            }

            const count = data.length > 0 ? data[0].count : 0;
            setLeaveCount(count);
        }

        fetchLeaveCount();

        async function fetchAdminCount() {
            const { data, error } = await supabase
                .from('employee')
                .select('count', { count: 'exact' })
                .eq('emp_admin', true);

            if (error) {
                console.error('Error selecting Admin count:', error);
                return;
            }

            const count = data.length > 0 ? data[0].count : 0;
            setAdminCount(count);
        }

        fetchAdminCount();

    }, []);

    return (

        <div className='d-flex justify-content-center'>
            {/*
            <div className='p-3 d-flex justify-content-around'>
                <div className='px-5 pt-2 pb-5 border shadow-sm w-100'>
                    <div className='text-center pb-1'>
                        <h4>Administrateur</h4>
                        <hr />
                    </div>
                    <div>
                        <h5>Total: { }</h5>
                    </div>
                </div>
                <div className='px-5 pt-2 pb-5 border shadow-sm w-100'>
                    <div className='text-center pb-1'>
                        <h4>Employé</h4>
                        <hr />
                    </div>
                    <div>
                        <h5>Total: { }</h5>
                    </div>
                </div>
                <div className='px-5 pt-2 pb-5 border shadow-sm w-100'>
                    <div className='text-center pb-1'>
                        <h4>Salaire</h4>
                        <hr />
                    </div>
                    <div>
                        <h5>Total: { }</h5>
                    </div>
                </div>

            </div>
            */}
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                        <div className="px-4 py-2 border shadow-sm mb-4">
                            <div className="text-center pb-1">
                                <h4>Administrateur</h4>
                                <hr />
                            </div>
                            <div>
                                <h5>Total: {AdminCount}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                        <div className="px-4 py-2 border shadow-sm mb-4">
                            <div className="text-center pb-1">
                                <h4>Employé</h4>
                                <hr />
                            </div>
                            <div>
                                <h5>Total: {employeeCount}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                        <div className="px-4 py-2 border shadow-sm">
                            <div className="text-center pb-1">
                                <h4>Congé</h4>
                                <hr />
                            </div>
                            <div>
                                <h5>Total: {leaveCount}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className='mt-4 px-5 p-3'>
                <h3>Liste d'administrateur</h3>
                <table className='table'>
                    <thead>
                        <tr>
                        <th>Email</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>*/}
            <div
                style={{
                    padding: '10px',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Adjust the shadow properties as needed
                    marginRight: '50px'
                }}
            >
                <img
                    src={backgroundImage}
                    alt="Image"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px',
                    }}
                />
            </div>

        </div>
    )
}

export default Home