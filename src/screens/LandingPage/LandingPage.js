import React from "react";
import { Container, Row } from "react-bootstrap";
import  "./Landing.css";

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "93vh",
        alignItems: "center",
        backgroundImage: "url('https://www.upsara.com/do.php?img=26684')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Container>
        <Row>
          <div className="intro_textt">
            <div>
              <h1 className="text-white">Welcom To My Site</h1>
              <p className="text-white"> This is Best Site ForEver</p>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
