import React, { useEffect } from 'react'
import $ from 'jquery'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Login.css'

const Login = () => {


    useEffect(()=>{
        $(function() {

            // $("#register-form").fadeOut(100);
            // document.getElementById('login-form-link').click();
            $('#login-form-link').click(function(e) {
                $("#login-form").delay(100).fadeIn(100);
                $("#register-form").fadeOut(100);
                $('#register-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            });
            $('#register-form-link').click(function(e) {
                $("#register-form").delay(100).fadeIn(100);
                $("#login-form").fadeOut(100);
                $('#login-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            });
            
            $('#login-form-link').trigger('click');
            });
            window.scrollTo(0, 0)
    },[])

  return (
    <div className='row g-4 mt-5'>
      <div className="col-md-6 offset-md-3">
        <div className="panel-heading">
            <div className="row">
                <div className="col-md-6 text-center py-3 cursor-pointer text-xl text-emerald-600 rounded" id="login-form-link">
                    LOGIN
                </div>
                <div className="col-md-6 text-center py-3 cursor-pointer text-xl text-emerald-600 rounded" id="register-form-link">
                    REGISTER
                </div>
            </div>
            <hr />
        </div>
        <div className="wow fadeInUp" data-wow-delay="0.5s">
            <LoginForm/>
            <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default Login