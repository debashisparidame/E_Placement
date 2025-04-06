import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../../assets/CPMS.png";
import Toast from '../../components/Toast';
import isAuthenticated from '../../utility/auth.utility';
import { BASE_URL } from '../../config/backend_url';

function Signup() {
  document.title = 'CareerConnect | Student Sign Up';
  const navigate = useNavigate();
  const location = useLocation();

  const prefillEmail = location?.state?.prefillEmail || '';

  // if login user visit redirect to home page
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../student/dashboard");
    }
  }, [navigate]);

  // useState for toast display
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [error, setError] = useState({});

  // useState for from data 
  const [formData, setFormData] = useState({
    first_name: '',
    email: prefillEmail,
    number: '',
    password: '',
  });

  const { first_name, number, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'first_name') setError({ ...error, first_name: '' })
    if (e.target.name === 'email') setError({ ...error, email: '' })
    if (e.target.name === 'number') setError({ ...error, number: '' })
    if (e.target.name === 'password') {
      setError({ ...error, password: '' })
      if (!validatePassword(e.target.value)) setError({ ...error, password: 'Password Must Contains: Minimum 8 Char with atleast 1 Special Char, 1 Number, 1 Uppercase, 1 Lowercase' })
    }
  }

  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.email && !formData?.first_name && !formData?.number && !formData?.password)
      return setError({ email: 'Email Required!', first_name: 'Name Required!', number: 'Number Required!', password: 'Password Required!' })
    if (!formData?.email || !formData?.first_name || !formData?.number || !formData?.password) {
      let email, first_name, number, password;
      if (!formData?.email) email = 'Email Required!';
      if (!formData?.first_name) first_name = 'Name Required!';
      if (!formData?.number) number = 'Number Required!';
      if (!formData?.password) password = 'Password Required!';
      setError({ email: email, first_name: first_name, number: number, password: password })
      return;
    }

    if (!validatePassword(formData?.password)) return setError({ password: 'Password Must Contains: Minimum 8 Char with atleast 1 Special Char, 1 Number, 1 Uppercase, 1 Lowercase' })

    if (formData?.number?.length !== 10) return setError({ ...error, number: 'Number Length Should be 10 digital only!' })

    try {
      const response = await axios.post(`${BASE_URL}/student/signup`, formData);
      // console.log(response.data);
      setToastMessage("User Created Successfully! Now You Can Login.");
      setShowToast(true);

      const dataToPass = {
        showToastPass: true,
        toastMessagePass: "User Created Successfully! Now You Can Login."
      }
      navigate('../student/login', { state: dataToPass });

      // after 3sec to go login page
      // setTimeout(() => navigate("../student/login"), 2000);
    } catch (error) {
      if (error.response.data.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
      console.log("Student Signup.jsx => ", error);
    }
  }

  // toggle eye
  const [isEyeOpen, setEyeOpen] = useState(false);

  const handleEye = () => {
    setEyeOpen(!isEyeOpen);
  }

  return (
    <>
      {/* for any message "toast" */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      <div className="flex justify-center items-center py-2 min-h-screen bg-gradient-to-r from-red-400 from-10% via-pink-300 via-40% to-purple-300 to-100% ">
        <form className="form-signin flex justify-center items-center flex-col gap-3 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-8 w-1/3 max-lg:w-2/3 max-md:w-3/4 max-[400px]:w-4/5" onSubmit={handleSubmit}>
          <div className='flex flex-col items-center justify-center'>
            <img className="mb-4 rounded-xl w-30 h-28 lg:w-30 lg:h-40" src={`${Logo}`} alt="Logo Image" />
            <h1 className="mb-3 h3 font-weight-normal">Sign Up as a Student</h1>
          </div>
          <div className="w-full">
            <label htmlFor="inputName" className="sr-only">Name</label>
            <input type="text" id="inputName" className="ml-1 form-control" placeholder="Name" autoFocus="" fdprocessedid="gwlj3s" autoComplete='Name' name='first_name' value={first_name} onChange={handleChange} />
            <div className="ml-2 text-red-500">
              <span>{error?.first_name}</span>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="inputEmail" className="sr-only">Email Address</label>
            <input type="email" id="inputEmail" className="ml-1 form-control" placeholder="Email Address" autoFocus="" fdprocessedid="gwlj3s" autoComplete='email' name='email' value={email} onChange={handleChange} />
            <div className="ml-2 text-red-500">
              <span>{error?.email}</span>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="inputNumber" className="sr-only">Phone Number</label>
            <input
              type="number"
              id="inputNumber"
              className="ml-1 form-control"
              placeholder="Phone Number"
              autoFocus=""
              fdprocessedid="gwlj3s"
              autoComplete='number'
              name='number'
              value={number}
              onChange={handleChange}
              onInput={(e) => {
                if (e.target.value > 10) {
                  e.target.value = e.target.value.slice(0, 10);
                }
              }}
            />
            <div className="ml-2 text-red-500">
              <span>{error?.number}</span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type={`${isEyeOpen ? "text" : "password"}`} id="inputPassword" className="form-control" placeholder="Password" fdprocessedid="9sysne" autoComplete='current-password' name='password' value={password} onChange={handleChange} />
              <i className={`${isEyeOpen ? "fa-solid fa-eye" : "fa-regular fa-eye-slash"} -ml-6 cursor-pointer`} onClick={handleEye}></i>
            </div>
            <div className="ml-2 text-red-500">
              <span>{error?.password}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              className="btn btn-primary btn-block"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <span className='text-center'>Already having account?
            <span className='px-1 font-bold text-blue-500 cursor-pointer' onClick={() => navigate('../student/login')}>Login</span>
          </span>
          <p className="text-center text-gray-400 text-muted"><span className="font-semibold text-violet-600">© CareerConnect 2025</span></p>
        </form>
      </div>
    </>
  )
}

export default Signup
