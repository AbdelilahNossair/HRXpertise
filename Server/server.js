import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');

app.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    const { data, error } = await supabase
      .from('employee')
      .select('*')
      .eq('emp_id', id)
      .eq('emp_pass', password)
      .single();

    if (error) {
      console.error('Error selecting employee:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json(data);

  } catch (error) {
    console.error('Error selecting employee:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/counts', async (req, res) => {
  try {
    const employeeCount = await fetchEmployeeCount();
    const leaveCount = await fetchLeaveCount();
    const adminCount = await fetchAdminCount();

    return res.json({ employeeCount, leaveCount, adminCount });

  } catch (error) {
    console.error('Error fetching counts:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

async function fetchEmployeeCount() {
  const { data, error } = await supabase
    .from('employee')
    .select('count', { count: 'exact' })
    .eq('emp_admin', false);

  if (error) {
    console.error('Error selecting employee count:', error);
    return 0;
  }

  const count = data.length > 0 ? data[0].count : 0;
  return count;
}

async function fetchLeaveCount() {
  const { data, error } = await supabase
    .from('leave')
    .select('count', { count: 'exact' });

  if (error) {
    console.error('Error selecting Leave count:', error);
    return 0;
  }

  const count = data.length > 0 ? data[0].count : 0;
  return count;
}

async function fetchAdminCount() {
  const { data, error } = await supabase
    .from('employee')
    .select('count', { count: 'exact' })
    .eq('emp_admin', true);

  if (error) {
    console.error('Error selecting Admin count:', error);
    return 0;
  }

  const count = data.length > 0 ? data[0].count : 0;
  return count;
}


async function AddEmployee(Id, pass, Name, DOB, Address, Poste, Salary, Admin, Dpt, Grade) {
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
        dpt_code: Dpt
      },
    ]);

    if (error) {
      console.error('Error inserting/updating employee:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error inserting/updating employee:', error);
    return null;
  }
}

app.post('/newemp', async (req, res) => {
  const {Id, pass, Name,DOB , Address, Poste, Salary, Admin, Dpt, Grade} = req.body;
  try {
    const data = await AddEmployee(Id, pass, Name, DOB, Address, Poste, Salary, Admin, Dpt, Grade);

    return res.json(data);

  } catch (error) {
    console.error('Error fetching counts:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



