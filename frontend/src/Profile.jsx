import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function Profile() {
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        Id: '',
        Password: '',
        Name: '',
        DOB: '',
        Address: '',
        Poste: '',
        Salary: ''
    })
    const { id } = useParams();

    const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const Id = event.target.elements.inputtext4.value;
        const Password = event.target.elements.inputpassword4.value;

        const { data, error } = await supabase
            .from('employee')
            .select('*')
            .eq('emp_id', Id)
            .eq('emp_pass', Password)
            .single();

        if (error) {
            console.error("L'identifant ou/et le mot de passe est invalide", error);
            setError("L'identifant ou/et le mot de passe est invalide");
            return null;
        }

        navigate('/ProfileEdit/' + Id)
        return data;


    };


    return (
        <div className=' d-flex justify-content-center'>

            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='justify-items-center'> Veuillez remplir les champs à modifier</div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Identifiant</label>
                    <input type='text' className='form-control' id='inputtext4' placeholder="Entrer l'identifiant de l'employé"
                        onChange={e => setData({ ...data, emp_id: e.target.value })} autoComplete="off" value={data.emp_id} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputDOB4' className="form-label">Mot de passe</label>
                    <input type='password' className='form-control' id='inputpassword4' placeholder="Entrer le mot de passe de l'employé"
                        onChange={e => setData({ ...data, emp_pass: e.target.value })} autoComplete="off" value={data.emp_pass} />
                </div>
                <div className='col-12 p-3'>
                    <button
                        type="submit"
                        className="btn  w-100 rounded-0"
                        style={{
                            background: 'linear-gradient(to left, #808080, #000000)',
                            color: '#fff',
                        }}
                    >Accès à mon profile</button>
                </div>
                <div className="text-center text-danger px-3">{error}</div>
            </form>
        </div >
    )
}

export default Profile