import { Container, Nav, Navbar, Modal, Row ,Col,  NavDropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { React, useState } from "react";
import Axios from "axios";

function Navmas_staff(props) {
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
            <Nav.Link href="/MainStaff/Eventmanage">จัดการกิจกรรมที่กำลังดำเนินอยู่</Nav.Link>
            <Nav.Link href="/MainStaff/historyevent">จัดการกิจกรรมที่หมดเวลาแล้ว</Nav.Link>
            </Nav>
            <div style={{ paddingRight: 20 }}>
              <Navbar.Text>
                ผู้ดูแลการเลือกตั้ง: <a>{props.role}</a>
              </Navbar.Text>
            </div>
            <Button  id="button_full_o" onClick={generatePassword}>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
  );
}

export default Navmas_staff;
