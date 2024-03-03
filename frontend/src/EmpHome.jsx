import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useParams } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js';
import backgroundImage from './Images/image_HR.jpg';

function EmpHome() {

    const { id } = useParams();

    const [employeeCount, setEmployeeCount] = useState(null);
    const [leaveCount, setLeaveCount] = useState(null);
    const [AdminCount, setAdminCount] = useState(null);
    const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');
        
    
    async function fetchEmployeeCount() {
            try {
                const { data, error } = await supabase.rpc('count_employee_leave_processed', {
                    empid: id,
                });
    
                if (error) {
                    console.error('Error retrieving employee leave data:', error);
                    return;
                }
                console.log('AA');
                setEmployeeCount(data);
                return data;
    
            } catch (error) {
                console.error('Error retrieving employee leave data:', error);
            }
            
            
        }


        async function fetchLeaveCount() {
            try {
              const { data, error } = await supabase
                .from('employee')
                .select('emp_solde')
                .eq('emp_id', id)
                .single();
          
              if (error) {
                console.error('Error selecting Leave count:', error);
                return;
              }
          
              const leaveCount = data ? data.emp_solde : 0;
          
              setLeaveCount(leaveCount);
            } catch (error) {
              console.error('Error fetching Leave count:', error);
            }
          }

                    

        async function fetchAdminCount() {
            try {
                const { data, error } = await supabase.rpc('count_employee_leave_wip', {
                    empid: id,
                });
    
                if (error) {
                    console.error('Error retrieving employee leave data:', error);
                    return;
                }
                console.log('yes');
                setAdminCount(data);
                return data;
    
            } catch (error) {
                console.error('Error retrieving employee leave data:', error);
            }
            
            
        }

       
          

    useEffect(() => {
        fetchLeaveCount();
        fetchAdminCount();
        fetchEmployeeCount();


    }, []);

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
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
                                            <h4>Congé En cours</h4>
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
                                            <h4>Congé traité</h4>
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
                                            <h4>Solde Restant</h4>
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
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default EmpHome