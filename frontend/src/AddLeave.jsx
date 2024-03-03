import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';


function AddLeave() {
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

    const [selectedType, setSelectedType] = useState('');
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
      };

    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emp_Id = event.target.elements.inputtext4.value;
        const leave_id = event.target.elements.inputtext5.value;
        const departure = event.target.elements.inputDeparture.value;
        const return_date = event.target.elements.inputReturn.valueAsDate;
        const type = selectedType;

        const result = await addLeave(emp_Id, leave_id, departure, return_date, type);

        if (result !== null) {
            setError("Le congé a été créé avec succès");
        } else {
            setError("Votre solde est insuffisant pour la création de ce congé");
        }
    };



    return (
        <div className=' d-flex justify-content-center'>

            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='justify-items-center'> Veuillez remplir les informations du congé</div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Identifiant du demandeur</label>
                    <input type='number' className='form-control' id='inputtext4' placeholder="Entrer l'identifiant de l'employé"
                        onChange={e => setData({ ...data, Id: e.target.value })} autoComplete="off" />
                </div>
                <div className="col-12" hidden>
                    <label htmlFor="inputE4" className="form-label">Identifiant de la demande</label>
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
                    <label htmlFor="inputType" className="form-label">Type</label>
                    <select id="inputType" value={selectedType} onChange={handleTypeChange} className='form-control'>
                        <option value="">Choisir le type du congé</option>
                        <option value="Administratif">Administratif</option>
                        <option value="Maternité">Maternité</option>
                        <option value="Exceptionel">Exceptionel</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                {/*<div className='col-12'>
                    <label htmlFor='inoutcountry' className="form-label">
                        <input
                            htmlFor= 'inoutcountry'
                            type="checkbox"
                            checked={checked}
                            onChange={handleCheckboxChange}
                        />
                        à l'étranger
                    </label>
    </div>*/}
                <div className='col-12 p-3'>
                    <button type="submit"
                        className="btn  w-100 rounded-0"
                        style={{
                            background: 'linear-gradient(to left, #808080, #000000)',
                            color: '#fff',
                        }}>
                        Ajouter le congé
                    </button>
                </div>
                <div className='d-flex justify-content-center'>{error}</div>
            </form>
        </div>
    )
}

export default AddLeave