import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';



function EmployeeEdit() {


    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedPoste, setSelectedPoste] = useState('');

    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value);
    };

    const handlePosteChange = (event) => {
        setSelectedPoste(event.target.value);
    };
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

    async function EditEmployee(Id, Password, Name, DOB, Address, Poste, Salary, type, Grade, Service, ppr) {
        try {
            const { data, error } = await supabase.from('employee').upsert([
                {
                    emp_id: Id,
                    emp_pass: Password,
                    emp_name: Name,
                    emp_dob: DOB,
                    emp_address: Address,
                    emp_poste: Poste,
                    emp_salary: Salary,
                    emp_service: Service,
                    emp_grade: Grade,
                    emp_ppr: ppr,
                    emp_type: type
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
        const Poste = selectedPoste;
        const Grade = selectedGrade;
        const Salary = event.target.elements.inputSalary4.value;
        const ppr = event.target.elements.inputppr.value;
        const type = selectedDpt;
        const Service = selectedService;


        const AddEmloyee = await EditEmployee(Id, Password, Name, DOB, Address, Poste, Salary, type, Grade, Service, ppr);
        if (AddEmloyee !== null) {
            setError("Les informations de l'employé ont été modifié avec succès");
            //////
            //////
        } else {
            setError("Une erreur est survenue lors de la modification de l'employé");
        }
    };

    const [selectedService, setSelectedService] = useState('');
    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const [selectedDpt, setSelectedDpt] = useState('');
    const handleDptChange = (event) => {
        setSelectedDpt(event.target.value);
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
                    <input type='text' className='form-control' id='inputpassword4' placeholder="Entrer le mot de passe de l'employé"
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
                <div className='col-12'>
                    <label htmlFor="dpt" className="form-label">Type</label>
                    <select id="dpt" value={selectedDpt} onChange={handleDptChange} className='form-control'>
                        <option value="">Choisir le type de l'employé</option>
                        <option value="Médical">Médical</option>
                        <option value="Paramédical">Paramédical</option>
                        <option value="Personnel administratif">Personnel administratif</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className='col-12'>
                    <label htmlFor="grade" className="form-label">Grade</label>
                    <select id="grade" value={selectedGrade} onChange={handleGradeChange} className='form-control'>
                        <option value={data.emp_grade}>{data.emp_grade}</option>
                        <option value="Aucun">Aucun</option>
                        <option value="Principal (Docteur)">{"Principal (Docteur)"}</option>
                        <option value="Exceptionel (Docteur)">{"Exceptionel (Docteur)"}</option>
                        <option value="Hors-Grade (Docteur)">{"Hors-Grade (Docteur)"}</option>
                        <option value="IDE (Infirmier)">{"IDE (Infirmier)"}</option>
                        <option value="Sage-femme (Infirmier)">{"Sage-femme (Infirmier)"}</option>
                        <option value="Technicien-Labo (Infirmier)">{"Technicien Labo (Infirmier)"}</option>
                        <option value="Ambulancier (Infirmier)">{"Ambulancier (Infirmier)"}</option>
                        <option value="Aide-soignon (Infirmier)">{"Aide-soignon (Infirmier)"}</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className='col-12'>
                    <label htmlFor="inputPoste4" className="form-label">Poste de responsabilité</label>
                    <select id="inputPoste4" value={selectedPoste} onChange={handlePosteChange} className='form-control'>
                        <option value={data.emp_poste}>{data.emp_poste}</option>
                        <option value="Aucun">Aucun</option>
                        <option value="Directeur">Directeur</option>
                        <option value="Administrateur Econome">Administrateur Econome</option>
                        <option value="PAM">PAM</option>
                        <option value="PSI">PSI</option>
                        <option value="Chef départements">Chef départements</option>
                        <option value="Medecin Chef services">Medecin Chef services</option>
                        <option value="Medecin reanimateur">Medecin reanimateur</option>
                        <option value="Aide opératoire">Aide opératoire</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className='col-12'>
                    <label htmlFor="service" className="form-label">Service</label>
                    <select id="service" value={selectedService} onChange={handleServiceChange} className='form-control'>
                        <option value={data.emp_service}>{data.emp_service}</option>
                        <option value="Aucun">Aucun</option>
                        <option value="Médecine">Médecine</option>
                        <option value="Chirurgie">Chirurgie</option>
                        <option value="Mère Enfant">Mère Enfant</option>
                        <option value="Radiologie">Radiologie</option>
                        <option value="Laboratoire">Laboratoire</option>
                        <option value="Urgence">Urgence</option>
                        <option value="Hoptial jour">Hoptial jour</option>
                        <option value="Bloc opératoire">Bloc opératoire</option>
                        <option value="Sanitaire">Sanitaire</option>
                    </select>
                </div>
                <div className='col-12'>
                    <label htmlFor='inputppr' className="form-label">PPR</label>
                    <input type='number' className='form-control' id='inputppr' placeholder="Entrer le PPR de l'employé"
                        onChange={e => setData({ ...data, emp_ppr: e.target.value })} autoComplete="off" value={data.emp_ppr} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputSalary4' className="form-label">Salaire</label>
                    <input type='number' className='form-control' id='inputSalary4' placeholder="Entrer le salaire de l'employé"
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

export default EmployeeEdit