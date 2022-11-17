import React, { useEffect, useRef, useState } from "react";

import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
// import cloudinary from "cloudinary";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const [picMessage, setPicMessage] = useState(null);

  const fileInput = useRef(null);

  useEffect(() => {}, [fileInput]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwod Do Not Match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        setLoading(true);

        const { data } = await axios.post(
          "https://n07siw-8000.preview.csb.app/api/users",
          { name, email, password, pic },
          config
        );
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };
  const postDetails = (pics) => {
    setPicMessage(null);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dijamrzud");
      ///////
      console.log(fileInput.current.files);

      setTimeout(() => {
        setDisable(false);
        console.log(fileInput.current.files, "toye tttt");
      }, 2000);
      /////
      fetch("https://api.cloudinary.com/v1_1/dijamrzud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => console.log(err));
    } else {
      return setPicMessage("please Select a Imagess");
    }
  };

  return (
    <MainScreen title={"Register"}>
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          {/* <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              // onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group> */}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => postDetails(e.target.files[0])}
              ref={fileInput}
            />
          </Form.Group>

          {disable && (
            <div style={{ color: "red", fontSize: 20 }}>Select One Photo</div>
          )}

          <Button
            variant="primary"
            type="submit"
            className="my-2"
            disabled={disable}
          >
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};
export default RegisterScreen;
