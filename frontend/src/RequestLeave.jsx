import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';



function RequestLeave() {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');

    async function addLeave(emp_Id, leave_id, departure, return_date, type) {
  try {
    const { data, error } = await supabase.from('leave').upsert([
      {
        leave_id: leave_id,
        leave_departure: departure,
        leave_return: return_date,
        leave_type: type,
        emp_id: emp_Id,
      },
    ]);

    if (error) {
      console.error('Error inserting/updating leave:', error);
      return null;
    }

    return 'yes';
  } catch (error) {
    console.error('Error inserting/updating leave:', error);
    return null;
  }
}

const [ids, setIds] = useState({
  id: '',
});

useEffect(() => {
  const generateIds = async () => {
    try {
      const { data, error } = await supabase.rpc('get_leave_id');

      if (error) {
        console.error('Error retrieving leave Id:', error);
        return;
      }

      const { id } = data[0];
      console.log('ID:', id);
      setIds({ id });
    } catch (error) {
      console.error('Error retrieving leave:', error);
    }
  };

  generateIds();
}, []);

const handleSubmit = async (event) => {
  event.preventDefault();

  const emp_Id = event.target.elements.inputtext4.value;
  const leave_id = event.target.elements.inputtext5.value;
  const departure = event.target.elements.inputDeparture.value;
  const return_date = event.target.elements.inputReturn.value;
  const type = event.target.elements.inputType.value;

  const result = await addLeave(emp_Id, leave_id, departure, return_date, type);

  if (result !== null) {
    setError("Le congé a été créé avec succès");
  } else {
    setError("Une erreur est survenue lors de la création du congé");
  }
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
                    <div className=' d-flex justify-content-center'>

                        <form className='row g-3 w-50' onSubmit={handleSubmit}>
                            <div className='justify-items-center'> Veuillez remplir les informations du congé</div>
                            <div className="col-12">
                                <label htmlFor="inputEmail4" className="form-label">Identifiant du demandeur</label>
                                <input type='text' className='form-control' id='inputtext4' placeholder="Entrer l'identifiant de l'employé"
                                    onChange={e => setData({ ...data, Id: e.target.value })} autoComplete="off" />
                            </div>
                            <div className="col-12" hidden>
                                <label htmlFor="inputE4" className="form-label">Identifiant du demandeur</label>
                                <input type='text' className='form-control' id='inputtext5' placeholder="Entrer l'identifiant de la demande"
                                    onChange={e => setData({ ...data, Id1: e.target.value })} autoComplete="off" value={ids.id} />
                            </div>
                            <div className='col-12'>
                                <label htmlFor='inputDeparture' className="form-label">Date de départ</label>
                                <input type='date' className='form-control' id='inputDeparture' placeholder="Entrer la date de départ"
                                    onChange={e => setData({ ...data, Password: e.target.value })} autoComplete="off" />
                            </div>
                            <div className='col-12'>
                                <label htmlFor='inputReturn' className="form-label">Date de retour</label>
                                <input type='date' className='form-control' id='inputReturn' placeholder="Entrer la date de retour"
                                    onChange={e => setData({ ...data, Name: e.target.value })} autoComplete="off" />
                            </div>
                            <div className='col-12'>
                                <label htmlFor='inputType' className="form-label">Type</label>
                                <input type='text' className='form-control' id='inputType' placeholder="Entrer le type de congé"
                                    onChange={e => setData({ ...data, DOB: e.target.valueAsDate })} autoComplete="off" />
                            </div>
                            <div className='col-12 p-3'>
                                <button type="submit"
                                    className="btn  w-100 rounded-0"
                                    style={{
                                        background: 'linear-gradient(to left, #808080, #000000)',
                                        color: '#fff',
                                    }}>
                                    Demande le congé
                                </button>
                            </div>
                            <div className='d-flex justify-content-center'>{error}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestLeave