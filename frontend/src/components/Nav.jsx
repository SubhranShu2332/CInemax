import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { initFlowbite } from 'flowbite'
import axios from 'axios';
import { MyContext } from '../MyContext';


const Nav = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [year, setYear] = useState('');
  const [mail, setmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginMail, setloginMail] = useState("")
  const [loginPassword, setloginPassword] = useState("")

  const [loginAlert, setloginAlert] = useState(false)
  const [logoutAlert, setlogoutAlert] = useState(false)

  const [signupModal, setsignupModal] = useState(false)
  const [signinModal, setsigninModal] = useState(false)

  const { User, setUser } = useContext(MyContext)

  const modalCloseButtonRef = useRef(null)

  const hammenu = useRef(null)
  const navref = useRef(null)

  const registerUser = async (userData) => {
    try {
      const response = await axios.post('/api/users/register', userData);
      console.log('User registered successfully:', response.data);
      setUser(response.data.user)
      if (modalCloseButtonRef.current && hammenu.current) {
        modalCloseButtonRef.current.click();
        hammenu.current.click();
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code outside the range of 2xx
        console.error('Registration failed:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error during registration:', error.message);
      }
    }

  };
  const handleRegisterSubmit = (e) => {
    // e.preventDefault();
    console.log("Register Button Clicked");

    const userData = { name, gender, year, email: mail, password };
    console.log(userData);

    registerUser(userData);
  };
  const loginUser = async (userData) => {
    try {
      const response = await axios.post('/api/users/login', userData);
      console.log('User login successfully:', response.data);
      setUser(response.data.user)
      if (modalCloseButtonRef.current && hammenu.current) {
        modalCloseButtonRef.current.click();
        hammenu.current.click();
      }
      setloginAlert(true)
    } catch (error) {
      if (error.response) {
        console.error('login failed:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error during login:', error.message);
      }
    }

  };
  const handleLogout=(e)=>
  {
    setUser({}); 
    console.log("logout clicked"); 
    setlogoutAlert(true); 
    if (hammenu.current) {
      console.log(hammenu,"ham")
      hammenu.current.click();
    }
  }
  const handleLogin = (e) => {
    e.preventDefault()

    console.log("Login Button Clicked");

    const userData = { email: loginMail, password: loginPassword }; // Prepare user data
    console.log(userData);

    loginUser(userData);

  }
  useEffect(() => {
    initFlowbite();
  }, []);

  useEffect(() => {
    console.log(User)
  })
  useEffect(() => {
    const timer = setTimeout(() => {
      setloginAlert(false);
      setlogoutAlert(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [User]);



  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-950" ref={navref}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4" >
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cinemax</span>
          </Link>
          <div className="flex md:order-2 " >
            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <button ref={hammenu} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false" onClick={(e)=>{
              // navref.current.classList.toggle("")
              // navref.current.classList.toggle("animate__slideInDown")
              // navref.current.classList.toggle("animate__animated")
              // navref.current.classList.toggle("animate__slideOutUp")
                // console.log(navref.current.classList.add("animate__animated animate__slideInDown")) 
            }}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 animate__animated animate__slideInDown" id="navbar-search">
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-900 md:dark:bg-black dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
              </li>

              {!User?.name ? (
                <>
                  {/* Show Login Button if user is not logged in */}
                  <li>
                    <button

                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      type="button"
                      onClick={(e) => { setsigninModal(true); console.log(signinModal) }}
                    >
                      Login
                    </button>
                  </li>
                  {/* Show Get Started Button if user is not logged in */}
                  <li>
                    <button

                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      type="button"
                      onClick={(e) => setsignupModal(true)}
                    >
                      Get Started
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* Show Welcome Message if user is logged in */}
                  <li>
                    <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                      Welcome, {User.name}
                    </button>
                  </li>
                  {/* Show Logout Button if user is logged in */}
                  <li>
                    <button
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

                      onClick={(e) => {
                        handleLogout()
                      }} // Clears user, logs out
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>





        {/* Sign In Modal */}
        {signinModal ?
          <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <button ref={modalCloseButtonRef} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={(e) => setsigninModal(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form className="space-y-4" action="#" onSubmit={handleLogin}>
                    <div>
                      <label htmlFor="email" className="mb-4 font-semibold text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" value={loginMail} onChange={(e) => setloginMail(e.target.value)} required />
                    </div>
                    <div>
                      <label htmlFor="password" className="mb-4 font-semibold text-gray-900 dark:text-white">Your password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={loginPassword} onChange={(e) => setloginPassword(e.target.value)} required />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                      </div>
                      <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered? <button className="text-blue-700 hover:underline dark:text-blue-500" onClick={(e) => { setsigninModal(false);setsignupModal(true); console.log(signupModal) }}>
                        Create your account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          :
          <></>}





        {/* Sign Up Modal */}
        {signupModal ?
          <div
            id="authentication-modal2"
            tabIndex="-1"

            className=" overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-screen backdrop-blur-lg bg-black/30"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Register in to our platform
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={(e) => setsignupModal(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-4 font-semibold text-gray-900 dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Gender</h3>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="gender-male"
                            type="radio"
                            value="Male"
                            name="gender"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label
                            htmlFor="gender-male"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Male
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id="gender-female"
                            type="radio"
                            value="Female"
                            name="gender"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label
                            htmlFor="gender-female"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Female
                          </label>
                        </div>
                      </li>
                    </ul>

                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Year</h3>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((yearOption) => (
                        <li key={yearOption} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                          <div className="flex items-center ps-3">
                            <input
                              id={`year-${yearOption}`}
                              type="radio"
                              value={yearOption}
                              name="year"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              onChange={(e) => setYear(e.target.value)}
                            />
                            <label
                              htmlFor={`year-${yearOption}`}
                              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {yearOption}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-4 font-semibold text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        value={mail}
                        onChange={(e) => setmail(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="mb-4 font-semibold text-gray-900 dark:text-white"
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            required
                          />
                        </div>
                        <label
                          htmlFor="remember"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Lost Password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Create account
                    </button>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Already registered?{' '}
                      <button className="text-blue-700 hover:underline dark:text-blue-500" onClick={(e) => { setsignupModal(false);setsigninModal(true); console.log(signinModal) }}>
                        Log in to your account
                      </button>
                      
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          :
          <></>
        }


      </nav>
      {
        loginAlert ?
          <div id="toast-success"
            class="flex items-center md:ms-auto md:max-w-xs p-4 mt-2 md:me-2 text-lime-700 bg-lime-100 rounded-lg shadow mx-2"
            role="alert">
            <div
              class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-lime-500 bg-lime-100 rounded-lg ">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="sr-only">Check icon</span>
            </div>
            <div class="ml-3 text-md font-normal">Login Successful.</div>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:hover:text-gray-500 text-lime-400 dark:hover:bg-lime-200 dark:bg-lime-100" data-dismiss-target="#toast-success" aria-label="Close" onClick={(e) => {
              setloginAlert(false)
            }}>
              <span class="sr-only">Close</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          :
          <></>
      }
      {
        logoutAlert ?
          <div id="toast-danger"
            class="flex items-center md:ms-auto md:max-w-xs p-4 mt-2 md:me-2 text-red-700 bg-red-100 rounded-lg shadow mx-2"
            role="alert">
            <div
              class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="sr-only">Check icon</span>
            </div>
            <div class="ml-3 text-md font-normal">Logout Successful.</div>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:hover:text-gray-500 text-red-400 dark:hover:bg-red-200 dark:bg-red-100" data-dismiss-target="#toast-success" aria-label="Close" onClick={(e) => {
              setlogoutAlert(false);
            }}>
              <span class="sr-only">Close</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          :
          <></>
      }
    </>
  );
};

export default Nav;