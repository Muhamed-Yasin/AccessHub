import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom'; // Import the useParams and useNavigate hooks
import './MyForm.css';
import { toast } from 'react-toastify';

const EditForm = () => {
    const { userid } = useParams();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        fetch("https://accesshub-backend.onrender.com/user/" + userid)
            .then((res) => res.json())
            .then((resp) => {
                setUserData(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [userid]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        fetch("https://accesshub-backend.onrender.com/user/" + userid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success('Data saved successfully', {autoClose:2000});
                    navigate('/'); // Navigate to the home page after successful submission
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
        <div className='Main'>
            <div className="formdiv">
                <h1>User Maintenance</h1>
                {userData && (
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <div>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    defaultValue={userData.name}
                                />
                            </label>
                            {errors.name && <span className="error">{errors.name.message}</span>}
                        </div>
                        <div>
                            <label>
                                Email:
                                <input
                                    type="text"
                                    {...register('email', { required: 'Email is required' })}
                                    defaultValue={userData.email}
                                />
                            </label>
                            {errors.email && <span className="error">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label>
                                Age:
                                <input
                                    type="text"
                                    {...register('age', {
                                        required: 'Age is required',
                                        validate: {
                                            isNumber: (value) => !isNaN(value) || 'Age must be a number',
                                            min: (value) => value >= 18 || 'Age must be at least 18',
                                            max: (value) => value <= 50 || 'Age must be at most 50',
                                        },
                                    })}
                                    defaultValue={userData.age}
                                />
                            </label>
                            {errors.age && <span className="error">{errors.age.message}</span>}
                        </div>
                        <div>
                            <label>
                                User Type:
                                <select {...register('usertype')} defaultValue={userData.usertype}>
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
                                <input type="date" {...register('dateField')} defaultValue={userData.dateField} />
                            </label>
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                            <button type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditForm;
