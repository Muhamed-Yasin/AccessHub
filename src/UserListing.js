import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserListing.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserListing = () => {
  const [userdata, setUserdata] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/user')
      .then((res) => res.json())
      .then((resp) => setUserdata(resp))
      .catch((err) => console.log(err));
  }, []);

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleEdit = () => {
    if (selectedIds.length !== 1) {
      toast.error('Please select exactly one user to edit.', {autoClose:2000});
    } else {
      navigate(`/user/edit/${selectedIds[0]}`);
    }
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      toast.error('Please select at least one user to delete.', {autoClose:2000});
    } else {
      selectedIds.forEach((id) => {
        fetch(`http://localhost:8000/user/${id}`, {
          method: 'DELETE',
        })
          .then((res) => {
            if (res.ok) {
              setUserdata(userdata.filter(user => user.id !== id));
              setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
            } else {
              throw new Error('Failed to Delete User');
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error('Failed to Delete User');
          });
      });
    }
  };

  const handleAddNew = () => {
    navigate('/user/create');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>User Listing</h2>
          <div className="divbtn">
            <button onClick={handleAddNew} className="btn btn-success">Add New</button>
            <button onClick={handleEdit} className="btn btn-primary">Edit</button>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th className="bg-dark">Select</th>
                <th className="bg-dark">Name</th>
                <th className="bg-dark">Email</th>
                <th className="bg-dark">User Type</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((user) => (
                <tr key={user.id}>
                  <td onClick={() => handleSelect(user.id)}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => handleSelect(user.id)}
                    />
                  </td>
                  <td onClick={() => handleSelect(user.id)}>{user.name}</td>
                  <td onClick={() => handleSelect(user.id)}>{user.email}</td>
                  <td onClick={() => handleSelect(user.id)}>{user.usertype}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListing;
