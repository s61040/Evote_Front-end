import { Container, Nav, Navbar, Modal, Row ,Col,  NavDropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { React, useState } from "react";
import Axios from "axios";

function Navmas(props) {
  const [lgShow, setLgShow] = useState(false);

  const generatePassword = () => {
    localStorage.clear();
    window.location = "/";
    // Set the generated password as state
  };

  return ( 
      <Navbar>
        <Container>
          <Navbar.Brand href="#home" >{props.head}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              <NavDropdown  title="Event Main" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                <NavDropdown.Item href="/MainAdmin/Event/EventManagement">
                  Event Manage
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/MainAdmin/Event/Eventstat">
                  Event Stat
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="User Main" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                <NavDropdown.Item href="/MainAdmin/Usermain">
                  User Manage
                </NavDropdown.Item> 
              </NavDropdown>
            </Nav>
            <div style={{ paddingRight: 20 }}>
              <Navbar.Text>
                ผู้ควบคุมระบบ: <a href="/adminmanage">{props.role}</a>
              </Navbar.Text>
            </div>
            <Button
             id="button_h_o" 
             onClick={generatePassword}>ออกจากระบบ</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>  
  );
}

export default Navmas;
