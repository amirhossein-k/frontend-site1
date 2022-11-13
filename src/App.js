
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import './App.css';
import axios from "axios";


const App = () => {

  useEffect(()=>{
    const fett = async () =>{
      const {data} = await axios.get('https://uj9dt0-8000.preview.csb.app/api/test')
      console.log(data)

    }
    fett()
    
  },[])
  return (
    <div>
      momomomomomom
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;
