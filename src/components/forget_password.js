import React, { useState } from 'react'
import { check_OTP, forget_password, reset_Password } from '../Service/api'
import { useNavigate } from 'react-router-dom'

export default function Forget_Password(props) {
  const [email, setEmail] = useState('')
  const [stepOne, setStepOne] = useState(true)
  const [stepTwo, setStepTwo] = useState(false)
  const [stepThree, setStepThree] = useState(false)
  const [password, setPassword] = useState('')
  const [Cpassword, setCPassword] = useState('')
  const [otp, setOtp] = useState('')
  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const data = await forget_password(email);
      console.log(data);

      if (data.varified === true) {
        props.showAlert("OTP sent to mail ID", "success");
        setStepOne(false);
        setStepTwo(true);
      }
    } catch (error) {
      console.log(error);
      props.showAlert(error?.response?.data?.message, "danger");
    }
  }

  const handleCheckOTP = async (e) => {
    e.preventDefault();
    try {
      const data = await check_OTP(email, otp);
      if (data.varified) {
        props.showAlert("OTP verified successfully", "success");
        setStepTwo(false);
        setStepThree(true);
      }
    } catch (error) {
      console.log(error);
      props.showAlert(error?.response?.data?.message, "danger");
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (password === Cpassword) {
        await reset_Password(email, password);
        props.showAlert("Password reset successfully", "success");
        setStepThree(false);
        navigate('/');
      } else {
        props.showAlert("Password and Confirm password do not match", "danger");
      }
    } catch (error) {
      console.log(error);
      props.showAlert(error?.response?.data?.message, "danger");
    }
  }

  return (
    <div className='container col-12 col-md-5' style={{ backgroundColor: '#f8f8f8' }}>
      <form style={{ border: 'solid black 1px' }}>
        {stepOne && (
          <div className="mb-3 row justify-content-center">
            <div className='col-10 text-center'>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleForgetPassword} className="btn btn-primary m-4 col-6 col-md-4">
                Submit
              </button>
            </div>
          </div>
        )}

        {stepTwo && (
          <div className="mb-3 row justify-content-center">
            <div className='col-10 text-center'>
              <label htmlFor="otp" className="form-label">OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={handleCheckOTP} className="btn btn-primary m-4 col-6 col-md-4">
                Submit
              </button>
            </div>
          </div>
        )}

        {stepThree && (
          <div className="mb-3 row justify-content-center">
            <div className='col-10 text-center'>
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder='Password'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="Cpassword" className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="Cpassword"
                placeholder='Confirm Password'
                value={Cpassword}
                required
                onChange={(e) => setCPassword(e.target.value)}
              />
              <button className="btn btn-primary m-4 col-6 col-md-4" onClick={handleResetPassword}>
                Reset Password
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
