import React, { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import axios from "axios";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";

import "./App.css";

const App = () => {
  useEffect(() => {
    const fett = async () => {
      const { data } = await axios.get(
        "https://n07siw-8000.preview.csb.app/api/test"
      );
      console.log(data);
    };
    // fett();
  }, []);
 
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" exact element={<LoginScreen />} />
          <Route path="/register" exact element={<RegisterScreen />} />
          <Route path="/createnote" exact element={<CreateNote />} />
          <Route path="/note/:id" exact element={<SingleNote />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
