import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Adminlogin, user_Login } from '../Service/api';
import { useDispatch } from 'react-redux';
import { setAdmin, setId, setUserData } from './redux/reducer/authSlice'; 

export default function AdminLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = await  Adminlogin(email, password);
      console.log(data);
      
      if (data) {
        console.log(data);
        
        localStorage.setItem('user_id', data._id);
        // localStorage.setItem('admin', data.admin);
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('password', data.password);
        localStorage.setItem('userType','admin')
        dispatch(setUserData(data));
        props.showAlert("Login Successfully", "success");
        navigate('/admin/new-application');

      }
      else{
        props.showAlert("Internal server Issue", "danger"); 
      
    }

    } catch (error) {
      console.log(error);
      props.showAlert(error?.response?.data?.message, "danger");
    }
  };

  

  return (
    <div className='container col-12 col-md-5' style={{ marginBottom: '5rem' }}>
      <form onSubmit={handleSubmit} className="w-100 "  style={{backgroundColor:'#f8f8f8', paddingBottom:'10rem',border:'solid black 1px'}}>
        <div className="mb-3 row justify-content-center">
          <div  className=' col-10'>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <div  className=' col-10'>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center ">
          <button type="submit" className="btn btn-primary m-4 col-6 col-md-4">
            Login
          </button>
         
        </div>
      </form>
      
    </div>
  );
}
