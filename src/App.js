
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import './App.css';
import axios from "axios";


const App = () => {

  useEffect(()=>{
    axios.get('/api/notes')
    .then(res=> console.log(res))
  },[])
  return (
    <div>
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;
