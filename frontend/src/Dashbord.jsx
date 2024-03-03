import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet } from 'react-router-dom'


function Dashbord() {

    const [collapsed, setCollapsed] = useState(false);
    const [employeeCollapsed, setEmployeeCollapsed] = useState(false);
    const [leaveCollapsed, setLeaveCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const toggleEmployeeCollapse = () => {
        setEmployeeCollapsed(!employeeCollapsed);
        setLeaveCollapsed(false);
    };

    const toggleLeaveCollapse = () => {
        setLeaveCollapsed(!leaveCollapsed);
        setEmployeeCollapsed(false);
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
                                <Link to='/' href="#" className="nav-link align-middle px-0 text-white">
                                    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Tableau de Bord</span>
                                </Link>

                            </li>
                            <li>
                                <a href="#"
                                    className="nav-link px-0 align-middle text-white"
                                    onClick={toggleEmployeeCollapse}
                                    aria-expanded={employeeCollapsed}
                                >
                                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Gérer les Employés</span>
                                </a>
                                <ul className={`collapse${employeeCollapsed ? ' show' : ''} nav flex-column ms-1`} data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link
                                            to="createEmp" href="#" className="nav-link px-0">
                                            <span className="d-none d-sm-inline text-white bi-plus"> Ajout d'employé</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/employee' href="#" className="nav-link px-0">
                                            <span className="d-none d-sm-inline text-white bi-pencil-square"> Liste d'employés</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/SearchEmp' href="#" className="nav-link px-0">
                                            <span className="d-none d-sm-inline text-white bi-search"> Recherche d'employé</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"
                                    className="nav-link px-0 align-middle text-white"
                                    onClick={toggleLeaveCollapse}
                                    aria-expanded={leaveCollapsed}
                                >
                                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Gérer les Congés</span>
                                </a>
                                <ul className={`collapse${leaveCollapsed ? ' show' : ''} nav flex-column ms-1`} data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link
                                            to="createLeave" href="#" className="nav-link px-0">
                                            <span className="d-none d-sm-inline text-white bi-plus"> Ajout de congé</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/leave' href="#" className="nav-link px-0">
                                            <span className="d-none d-sm-inline text-white bi-pencil-square"> Liste de Congés</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/leaveSearch' href="#" className="nav-link px-0">
                                            <span className="d-none d-sm-inline text-white bi-search"> Recherche de Congé</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to='/profile' href="#" className="nav-link px-0 align-middle text-white">
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
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashbord