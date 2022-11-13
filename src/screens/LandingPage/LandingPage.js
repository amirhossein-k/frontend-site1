import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./Landing.css";

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "93vh",
        alignItems: "center",
        backgroundImage: "url('https://www.upsara.com/do.php?img=26684')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Row>
          <div className="intro_textt">
            <div>
              <h1 className="text-white">iii To My Site</h1>
              <p className="text-white"> This is Best Site ForEver</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
