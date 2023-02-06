import axios from 'axios'
import React, { useState } from 'react'
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [valid, setValid] = useState(null)
  // hook from auth kit 
  const signIn = useSignIn()
  // to redirecte to home 
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    // get data from form 
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('lemail'),
      password: data.get('lpassword'),
    }

    // console.log({
    //   email: data.get('lemail'),
    //   password: data.get('lpassword'),
    // });
    // send post request to server with user login data  
    axios.post('http://127.0.0.1:8000/api/login', loginData)
    .then(res => {
      // console.log(res.data);
      // 
      if (signIn({
        // token for auth 
        token: res.data.data.token,
        expiresIn: 10000,
        tokenType: "Bearer",
        // user data information 
        authState: {
          'name' : res.data.data.name , 
          'token' : res.data.data.token,
          'user' : res.data.data.user
        }
      })) {
        // after login in navigate to home page 
        return navigate('/')
      }
      // yo catch error form server 
    }).catch(res => {
      // set error information 
      setValid(res.response.data);
      console.log(res.response.data);
    })
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
            <div className="row g-3">
            <span className="text-red-500 rounded-lg text-center text-lg">{valid?.message}</span>
                <div className="col-12">
                <div className="form-floating">
                    <input type="email" className="form-control" id="lemail" placeholder="Your Email" name='lemail'/>
                    <label htmlFor="email">Your Email</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input type="password" className="form-control" id="lpassword" placeholder="Password" name='lpassword'/>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3 " type="submit">Login</button>
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

export default LoginForm