import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
/////////////////
const ProfileScreen = () => {
  /////////
  let navigate = useNavigate();
  ///////////
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  //////////////
  const fileInput = useRef(null);
  const [disable, setDisable] = useState(true);
  const [messagepic, setMessagePic] = useState("select photo");

  ////////////
  const dispatch = useDispatch();
  ////////////
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;
  ////////////////////////
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo, fileInput]);
  //////////////////////
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }));
  };
  const postDetails = (pics) => {
    ///////////

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
      setMessagePic("please wite for upload photo");

      setTimeout(() => {
        setDisable(false);
        console.log(fileInput.current.files, "toye tttt");
      }, 5000);
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
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              {/* <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                  onChange={(e) => postDetails(e.target.files[0])}
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
                <div style={{ color: "red", fontSize: 20 }}>{messagepic}</div>
              )}
              <Button
                type="submit"
                varient="primary"
                disabled={disable}
                className="my-2"
              >
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilepic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
