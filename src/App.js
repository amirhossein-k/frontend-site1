
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import './App.css';
import axios from "axios";


const App = () => {

  useEffect(()=>{
    const fett = async () =>{
      const {data} = await axios.get('/api/notes')
      console.log(data)

    }
    
    console.log('amif')
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
