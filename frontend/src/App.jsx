import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from 'axios';

import Home from "./components/Home";
import Movie from "./components/Movie";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Screening from "./components/Screening";
import Login from "./components/Login";
import Admin from "./components/Admin"

import { MyContext } from "./MyContext";
import { AdminProvider } from './AdminContext'; // Import Admin Context

import Booking from "./components/Booking";


export default function App() {


  const [Hello, setHello] = useState("")
  const [User, setUser] = useState({})

  useEffect(() => {
    axios.get("cinemax/").then((response) => {
      setHello(response.data)
    })
      .catch((error) => {
        console.log(error);

      })
  }, [])




  return (
    <div>
      <MyContext.Provider value={{ User, setUser }}>

        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            {/* <Route path="/" > */}
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/screening/:imdb_id" element={<Screening />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking/:imdb_id" element={<Booking></Booking>}></Route>
            {/* <Route path="contact" element={<Contact />} /> */}
            {/* <Route path="*" element={<NoPage />} /> */}
            {/* </Route> */}
            {/* Wrapping Admin routes with AdminProvider */}
            <Route
              path="/admin"
              element={
                <AdminProvider>
                  <Admin /> {/* Admin component can now access the AdminContext */}
                </AdminProvider>
              }
            />
          </Routes>
        </BrowserRouter>
        <Footer></Footer>
      </MyContext.Provider>
    </div>
  )
}