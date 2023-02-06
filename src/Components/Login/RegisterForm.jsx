import axios from 'axios';
import React, { useState } from 'react'
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterForm = () => {

  const [valid, setValid] = useState()
  const signIn = useSignIn()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signupData = {
      email: data.get('email'),
      password: data.get('password'),
      confirm_password: data.get('cpassword'),
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      phone: data.get('phone')
    }
    
    axios.post('http://127.0.0.1:8000/api/register', signupData).then(res => {
      console.log(res.data);
      if (signIn({
        token: res.data.token,
        expiresIn: 10000,
        tokenType: "Bearer",
        authState: {
          'name' : res.data.data.name , 
          'token' : res.data.data.token,
          'user' : res.data.data.user
        }
      })) {
        Swal.fire({
          icon: 'success',
          title: 'Succussfully Registeration',
          text: 'The Page will redirect to home page after 5 seconds',
        })
  
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    }).catch(res => {
      console.log(res.response.data);
      setValid(res.response.data);
    })
    console.log(signupData);
  };

  return (
    <form id="register-form" onSubmit={handleSubmit}>
            <div className="row g-3">
              <span className="text-start text-red-500 text-sm"> {valid?.errors?.first_name} {valid?.errors?.last_name}</span>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" className="form-control" id="fname" placeholder="First Name" name='firstName'/>
                  <label htmlFor="fname">First Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input type="text" className="form-control" id="lname" placeholder="Last Name" name='lastName'/>
                  <label htmlFor="lname">Last Name</label>
                </div>
              </div>
              <div className="col-12">
              <span className="text-start text-red-500 text-sm"> {valid?.errors?.email}</span>
                <div className="form-floating">
                  <input type="email" className="form-control" id="email" placeholder="Your Email" name='email'/>
                  <label htmlFor="email">Your Email</label>
                </div>
              </div>
              <div className="col-12">
              <span className="text-start text-red-500 text-sm"> {valid?.errors?.phone}</span>
                <div className="form-floating">
                  <input type="text" className="form-control" id="phone" placeholder="Your Phone Number" name='phone'/>
                  <label htmlFor="phone">Phone Number</label>
                </div>
              </div>
              <div className="col-12">
              <span className="text-start text-red-500 text-sm"> {valid?.errors?.password}</span>
                <div className="form-floating">
                  <input type="password" className="form-control" id="password" placeholder="Password" name='password'/>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="col-12">
              <span className="text-start text-red-500 text-sm"> {valid?.errors?.confirm_password}</span>
                <div className="form-floating">
                  <input type="password" className="form-control" id="cpassword" placeholder="Confirmation Password" name='cpassword'/>
                  <label htmlFor="cpassword">Confirmation Password</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">Create Account</button>
              </div>
              {/* <div className="col-12 text-center text-2xl">
                OR
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">Login Via Google</button>
              </div> */}
            </div>
          </form>
  )
}

export default RegisterForm