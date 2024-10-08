import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Adminlogin, user_Login } from '../Service/api';
import { useDispatch } from 'react-redux';
import { setAdmin, setId, setUserData } from './redux/reducer/authSlice'; 

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = await user_Login(email, password);
      console.log(data);
      
      if (data) {
        console.log(data);
        
        localStorage.setItem('user_id', data._id);
        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('userType','user')
        localStorage.setItem('password', data.password);
        dispatch(setUserData(data));
        props.showAlert("Login Successfully", "success");

        navigate("/user/jobs")

      }
      else{
        props.showAlert("Internal server Issue", "danger"); 
      
    }

    } catch (error) {
      console.log(error);
      props.showAlert(error?.response?.data?.message, "danger");
    }
  };

  // const havingData = async () => {
  //   try {
  //     const data = await login(localStorage.getItem('username'), localStorage.getItem('password'));
  //   } catch (error) {
  //     console.log(error);
  //     props.showAlert(error.response.data, "danger");
  //   }
  // }




  return (
    <div className='container col-12 col-md-5' style={{ marginBottom: '5rem' }}>
      <form onSubmit={handleSubmit} className="w-100 "  style={{backgroundColor:'#f8f8f8', paddingBottom:'10rem',border:'solid black 1px'}}>
        <div className="mb-3 row justify-content-center">
          <div  className=' col-10'>
            <label htmlFor="email" className="form-label">
             Email
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
          <button
            type="button"
            className="btn btn-primary mx-4 col-6 col-md-4"
            onClick={() => navigate('/user-register')}
          >
            Register
          </button>
         <div> <Link to={'/forget-password'}>Forget password</Link></div>
        </div>
      </form>
     
     </div>
  );
}
