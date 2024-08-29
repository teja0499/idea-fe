
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {user_Ragister } from '../Service/api';

export default function Register(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber,setMobileNumber]=useState()
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      try {
        event.preventDefault(); 
        // localStorage.clear();
        if(password===confirmPassword)
       { const body = {
        name,
            password,
            email,
            mobileNumber
        };
        const data = await user_Ragister(body);
        if(data)
        {
            props.showAlert("Account created Successfully","success")
            // localStorage.setItem('user_id', data.id);
            // localStorage.setItem('admin', data.admin);
            // localStorage.setItem('username', data.username);
            // localStorage.setItem('password', data.password);
                                                                        // navigate("/create-post")
              navigate("/")                                                          
        }
        console.log(data);}
        else{
            props.showAlert("Password Missmatch","danger")  
        }
      } catch (error) {
        console.log(error.response);
        
        props.showAlert(error?.response?.data?.message,"danger")
      }
    };

    return (
        <div className='container  col-12 col-md-5 '>
        <div className="d-flex justify-content-center " >
            <form onSubmit={handleSubmit} className="w-100 "  style={{backgroundColor:'#f8f8f8',border:'solid black 1px' }}>
                <div className="mb-3 row justify-content-center">
                    <div className="col-12 col-md-6">
                        <input
                         style={{marginTop:'10%'}}
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3 row justify-content-center">
                    <div className="col-12 col-md-6">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3 row justify-content-center">
                    <div className="col-12 col-md-6">
                    <input
                            type="tel"
                            className="form-control"
                            id="mobileNumber"
                            placeholder='Phone no.'
                            value={mobileNumber}
                            pattern="\d{10}"
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3 row justify-content-center">
                    <div className="col-12 col-md-6">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder='Password'
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3 row justify-content-center">
                    <div className="col-12 col-md-6">
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="text-center w-40">
                    <button type="submit" className="btn btn-primary mx-3 col-12 col-md-6">
                        Sign Up
                    </button>
                </div>
                <div className="text-center mt-3">
                    <Link to="/" className="card-link">Already have an account? Log in</Link>
                </div>
            </form>
        </div>
    </div>
    
    );
}

