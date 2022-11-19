import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import "./Header.css";

const Header = ({ setSearch }) => {
  let navigate = useNavigate();

  // const [isuser, setIsuser] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logouthandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="link">
              Navbar scroll
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </Nav>
            {userInfo ? (
              <Nav style={{ maxHeight: "200px" }} navbarScroll>
                <Nav.Link href="/mynotes">
                  <Link to="/mynotes" className="link">
                    My Notes
                  </Link>
                </Nav.Link>
                {/* <Nav.Link href="#action2">Link</Nav.Link> */}
                <NavDropdown
                  title={userInfo?.name}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logouthandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
