import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './MyForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const onSubmit = (data) => {
    fetch('https://accesshub-backend.onrender.com/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
            toast.success('Data saved successfully',{autoClose:2000});
            navigate('/');
        } else {
          throw new Error('Failed to save data');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to save data');
      });
  };

  const onError = (errors) => {
    console.log(errors);
    toast.error('Errors detected in Form data. Please correct them and try again.',{autoClose:2000});
  };

  const handleCancel = () => {
    reset({
      name: '',
      email: '',
      age: '',
      usertype: 'Crew',
      dateField: '',
    });
    navigate('/'); // Navigate to the home page when cancel is clicked
  };

  return (
    <div className="formdiv">
      <h1>User Maintenance</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <label>
            Name:
            <input type="text" {...register('name', { required: 'Name is required' })} />
          </label>
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div>
          <label>
            Email:
            <input type="text" {...register('email', { required: 'Email is required' })} />
          </label>
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        <div>
          <label>
            Age:
            <input type="text" {...register('age', {
              required: 'Age is required',
              validate: {
                isNumber: value => !isNaN(value) || 'Age must be a number',
                min: value => value >= 18 || 'Age must be at least 18',
                max: value => value <= 50 || 'Age must be at most 50',
              },
            })} />
          </label>
          {errors.age && <span className="error">{errors.age.message}</span>}
        </div>
        <div>
          <label>
            User Type:
            <select {...register('usertype')}>
              <option value="Crew">Crew</option>
              <option value="Fleet Manager">Fleet Manager</option>
              <option value="TSI">TSI</option>
              <option value="Admin">Admin</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Joining Date:
            <input type="date" {...register('dateField')} />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
