import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import logo from './Images/Logo HRXpertise.png';


function AddEmployee() {


  const handlePrint = () => {
    const printContent = `
    <div>
      <img src="${logo}" alt="Logo" style="display: block; margin: 0 auto; width: 100px;">
      <h1 style="text-align: center;">HRXpertise</h1>
      <h2 style="text-align: center;">l'essence de l'ordre</h2>
      <h4>Bonjour,</h4>
      <p>Veuillez accéder notre site web HRXpertise: </p>
      <h4>https://HRXpertise.com</h4>
      <p>Puis entrer votre identifiant et mot de passe pour vous connecter: </p>
      <h4>Identifiant: ${ids.id}</h4>
      <h4>Mot de passe: ${ids.password}</h4>
      <p>Merci pour votre confiance</p>
    </div>
  `;
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.open();
    printWindow.document.write(`
    <html>
      <head>
        <title>Fiche d'identifiant</title>
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

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    Id: '',
    Password: '',
    Name: '',
    DOB: '',
    Address: '',
    Poste: '',
    Salary: '',
    Grade: ''
  })

  const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');

  async function AddEmployee(Id, pass, Name, DOB, Address, Poste, Salary, Admin, type, Grade, Service, PPR, hire) {
    try {
      const { data, error } = await supabase.from('employee').upsert([
        {
          emp_id: Id,
          emp_pass: pass,
          emp_name: Name,
          emp_dob: DOB,
          emp_address: Address,
          emp_poste: Poste,
          emp_salary: Salary,
          emp_grade: Grade,
          emp_admin: Admin,
          emp_service : Service,
          emp_ppr: PPR, 
          hire_date: hire,
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

  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDpt, setSelectedDpt] = useState('');
  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };
  const [selectedPoste, setSelectedPoste] = useState('');

  const handlePosteChange = (event) => {
    setSelectedPoste(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };
  const handleDptChange = (event) => {
    setSelectedDpt(event.target.value);
  };


 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const Id = event.target.elements.inputtext4.value;
    const Password = event.target.elements.inputpassword4.value;
    const Name = event.target.elements.inputName4.value;
    const DOB = event.target.elements.inputDOB4.valueAsDate;
    const Address = event.target.elements.inputAddress4.value;
    const Poste = selectedPoste;
    const Grade = selectedGrade;
    const Service = selectedService;
    const Salary = event.target.elements.inputSalary4.value;
    const PPR = event.target.elements.inputPPR.value;
    const Admin = event.target.elements.checkboxId.checked;
    //const dpt_code = event.target.elements.inputdpt.value;
    const Type = selectedDpt;
    const hire = new Date()

    const AddEmloyee = await AddEmployee(Id, Password, Name, DOB, Address, Poste, Salary, Admin, Type, Grade, Service, PPR, hire);
    if (AddEmloyee !== null) {
      setError("L'employé a été créé avec succès");
      //////
      //////
    } else {
      setError("Une erreur est survenue lors de la création de l'employé");
    }

  };

  const [ids, setIds] = useState({
    id: '',
    password: ''
  });

  useEffect(() => {
    const generateIds = async () => {
      try {
        const { data, error } = await supabase.rpc('get_id_password');

        if (error) {
          console.error('Error retrieving employee IDs and passwords:', error);
          return;
        }

        const { id, password } = data[0];
        console.log('IDs:', id, password);
        setIds({ id, password });

      } catch (error) {
        console.error('Error retrieving employee IDs and passwords:', error);
      }
    };

    generateIds();
  }, []);



  useEffect(() => {
    async function selectEmployee() {
      const { data, error } = await supabase
        .from('employee')
        .select('*');

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


  return (
    <div className=' d-flex justify-content-center'>

      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='justify-items-center'> Veuillez remplir les informations de l'employé</div>
        <label htmlFor="email" hidden>Email</label>
        <div className='col-12' hidden>
          <input
            autoComplete='off'
            type="email"
            id="email"
            className='form-control'
            placeholder="Entrer l'email de l'employé"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='col-12' hidden>
          <label htmlFor='inputtext4' className="form-label">id</label>
          <input type='text' className='form-control' id='inputtext4' placeholder="Entrer le nom complet de l'employé"
            onChange={e => setData({ ...data, Name: e.target.value })} autoComplete="off" hidden value={ids.id} />
        </div>
        
        <div className='col-12' hidden>
          <label htmlFor='inputpassword4' className="form-label">mot de passe</label>
          <input type='text' className='form-control' id='inputpassword4' placeholder="Entrer le nom complet de l'employé"
            onChange={e => setData({ ...data, Name: e.target.value })} autoComplete="off" hidden value={ids.password} />
        </div>
        <div className='col-12'>
          <label htmlFor='inputName4' className="form-label">Nom complet</label>
          <input type='text' className='form-control' id='inputName4' placeholder="Entrer le nom complet de l'employé"
            onChange={e => setData({ ...data, Name: e.target.value })} autoComplete="off" />
        </div>
        <div className='col-12'>
          <label htmlFor='inputDOB4' className="form-label">Date de Naissance</label>
          <input type='date' className='form-control' id='inputDOB4' placeholder="Entrer la date de naissance de l'employé"
            onChange={e => setData({ ...data, DOB: e.target.valueAsDate })} autoComplete="off" />
        </div>
        <div className='col-12'>
          <label htmlFor='inputAddress4' className="form-label">Adresse</label>
          <input type='text' className='form-control' id='inputAddress4' placeholder="Entrer l'adresse de l'employé"
            onChange={e => setData({ ...data, Address: e.target.value })} autoComplete="off" />
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
            <option value="">Choisir le grade de l'employé</option>
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
          <label htmlFor="service" className="form-label">Département</label>
          <select id="service" value={selectedService} onChange={handleServiceChange} className='form-control'>
            <option value="">Choisir le département de l'employé</option>
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
          <label htmlFor="inputPoste4" className="form-label">Poste de responsabilité</label>
          <select id="inputPoste4" value={selectedPoste} onChange={handlePosteChange} className='form-control'>
            <option value="">Choisir le poste de l'employé</option>
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
          <label htmlFor='inputPPR' className="form-label">PPR</label>
          <input type='number' className='form-control' id='inputPPR' placeholder="Entrer le PPR de l'employé"
            onChange={e => setData({ ...data, Salary: e.target.value })} autoComplete="off" />
        </div>
        <div className='col-12'>
          <label htmlFor='inputSalary4' className="form-label">Salaire</label>
          <input type='number' className='form-control' id='inputSalary4' placeholder="Entrer le salaire de l'employé"
            onChange={e => setData({ ...data, Salary: e.target.value })} autoComplete="off" />
        </div>
        {/*<div className="col-12">
          <label htmlFor="inputdpt" className="form-label">Departement</label>
          <input type='text' className='form-control' id='inputdpt' placeholder="Entrer le departement de l'employé"
            onChange={e => setData({ ...data, Id: e.target.value })} autoComplete="off" />
  </div>*/}
  
        <div className='d-flex align-items-center'>
          <span className='me-2'>Administrateur</span>
          <label className='form-check-label'>
            <input
              type='checkbox'
              className='form-check-input'
              id='checkboxId'
              style={{ transform: 'scale(1.5)' }} // Adjust the scale value to make the checkbox larger
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <div className="col-12 p-3 flex-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
  <button
    type="submit"
    className="btn w-100"
    style={{
      background: 'linear-gradient(to right, #808080, #000000)',
      color: '#fff',
      width: 'calc(50% - 5px)',
      marginRight: '10px',
    }}
  >
    Ajouter l'employé
  </button>
  <button
    type="button"
    className="btn w-100"
    style={{
      background: 'linear-gradient(to left, #808080, #000000)',
      color: '#fff',
      width: 'calc(50% - 5px)',
      marginRight: '10px',
    }}
    onClick={handlePrint}
  >
    Imprimer l'ID et le mot de passe
  </button>
</div>




        <div className='d-flex justify-content-center'>{error}</div>
      </form>
    </div>
  )
}

export default AddEmployee