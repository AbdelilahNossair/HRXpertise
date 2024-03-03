import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';




function ProfileEdit() {


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
    const { id, password } = useParams();

    useEffect(() => {
        async function selectEmployee() {
            const { data, error } = await supabase
                .from('employee')
                .select('*')
                .eq('emp_id', id)
                .single();

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



    const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');

    async function EditEmployee(Id, Password, Name, DOB, Address, Poste, Salary) {
        try {
            const { data, error } = await supabase.from('employee').upsert([
                {
                    emp_id: Id,
                    emp_pass: Password,
                    emp_name: Name,
                    emp_dob: DOB,
                    emp_address: Address,
                    emp_poste: Poste,
                    emp_salary: Salary
                },
            ]);

            if (error) {
                console.error('Error inserting/updating employee:', error);
                return null;
            }

            return 'yes';
        } catch (error) {
            console.error('Error inserting/updating employee:', error);
            return null;
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const Id = event.target.elements.inputtext4.value;
        const Password = event.target.elements.inputpassword4.value;
        const Name = event.target.elements.inputName4.value;
        const DOB = event.target.elements.inputDOB4.valueAsDate;
        const Address = event.target.elements.inputAddress4.value;
        const Poste = event.target.elements.inputPoste4.value;
        const Salary = event.target.elements.inputSalary4.value;

        const AddEmloyee = await EditEmployee(Id, Password, Name, DOB, Address, Poste, Salary);
        if (AddEmloyee !== null) {
            setError("Les informations de l'employé ont été modifié avec succès");
            //////
            //////
        } else {
            setError("Une erreur est survenue lors de la modification de l'employé");
        }
    };


    return (
        <div className=' d-flex justify-content-center'>
            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='justify-items-center'> Veuillez remplir les champs à modifier</div>
                <div className="col-12" hidden>
                    <label htmlFor="inputEmail4" className="form-label">Identifiant</label>
                    <input type='text' className='form-control' id='inputtext4' placeholder="Entrer l'identifiant de l'employé"
                        onChange={e => setData({ ...data, emp_id: e.target.value })} autoComplete="off" value={data.emp_id} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputDOB4' className="form-label">Mot de passe</label>
                    <input type='password' className='form-control' id='inputpassword4' placeholder="Entrer le mot de passe de l'employé"
                        onChange={e => setData({ ...data, emp_pass: e.target.value })} autoComplete="off" value={data.emp_pass} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputName4' className="form-label">Nom complet</label>
                    <input type='text' className='form-control' id='inputName4' placeholder="Entrer le nom complet de l'employé"
                        onChange={e => setData({ ...data, emp_name: e.target.value })} autoComplete="off" value={data.emp_name} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputDOB4' className="form-label">Date de Naissance</label>
                    <input type='date' className='form-control' id='inputDOB4' placeholder="Entrer la date de naissance de l'employé"
                        onChange={e => setData({ ...data, emp_dob: e.target.valueAsDate })} autoComplete="off" value={data.emp_dob} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputAddress4' className="form-label">Adresse</label>
                    <input type='text' className='form-control' id='inputAddress4' placeholder="Entrer l'adresse de l'employé"
                        onChange={e => setData({ ...data, emp_address: e.target.value })} autoComplete="off" value={data.emp_address} />
                </div>
                <div className='col-12' hidden>
                    <label htmlFor='inputPoste4' className="form-label">Poste</label>
                    <input type='text' className='form-control' id='inputPoste4' placeholder="Entrer le poste de l'employé"
                        onChange={e => setData({ ...data, emp_poste: e.target.value })} autoComplete="off" value={data.emp_poste} />
                </div>
                <div className='col-12' hidden>
                    <label htmlFor='inputSalary4' className="form-label">Salaire</label>
                    <input type='text' className='form-control' id='inputSalary4' placeholder="Entrer le salaire de l'employé"
                        onChange={e => setData({ ...data, emp_salary: e.target.value })} autoComplete="off" value={data.emp_salary} />
                </div>
                <div className='col-12 p-3'>
                    <button type="submit"
                        className="btn  w-100"
                        style={{
                            background: 'linear-gradient(to left, #808080, #000000)',
                            color: '#fff',
                        }}>
                        Modifier les informations de l'employé
                    </button>
                </div>
                <div className='d-flex justify-content-center'>{error}</div>
            </form>
        </div>
    )
}

export default ProfileEdit