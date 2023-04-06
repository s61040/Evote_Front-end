import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Main.css";
import { Card, Button, Alert, Col, Row, Container } from "react-bootstrap";
import Home from "./../Home/Home";
import Event from './Eventcreate';
import Navmas from './../Navmaster/Navmas';

function Usermain() {
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");
  useEffect(() => {
    check_authen();
  }, []);

   const check_authen = () => {
    Axios.post(`${window._env_.API_URL}/authen`, {
      tokenC: tokenC,
    })
      .then((res, err) => {
        if (tokenC != null) {
          if (res.data.message == "admin" || res.data.message == "staff") {
            console.log("res = ", res);
            // alert(res.data);
            setLogin(authen);
            console.log("res.data", res.data.message);
          } else {
            alert("Fail Authen");
            localStorage.clear();
            window.location = "/";
          }
        } else if (tokenC != res.data.tokenC) {
          alert("No Token");
          localStorage.clear();
          window.location = "/";
          // window.location = "/";
        }
      })
      .catch((err) => {
        alert("authen catch");
        localStorage.clear();
        window.location = "/";
        console.log("err");
      });
  };

  return (
    <div> 
        <Navmas
          head = {"UserMain"}
          role = {login} 
        /> 
      <div className="Mainadmin">
        <Card>
          <Card.Header style={{backgroundColor:'#FF4B2B'}}>UserMain </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {" "}
                สำหรับ Admin และ Staff เพื่อการตั้งค่าการโหวตได้อย่างรวดเร็ว{" "}
              </p>
              <footer className="blockquote-footer">
                Power!!! <cite title="Source Title">Title</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
        <div className="Main_Admin">
        <Container>
          <Row>
            <Col md={4}><Card border="primary" style={{ width: "30rem" }}>
              <Card.Header>Name List</Card.Header>
              <Card.Body>
                <Button href="/MainAdmin/Usermain/NameListuser" variant="primary">
                  Name List
                </Button>
              </Card.Body>
            </Card></Col>
            <Col md={{ span: 3, offset: 3 }} >
            <Card border="primary" style={{ width: "30rem" }}>
            <Card.Header>User  Manage</Card.Header>
            <Card.Body>
              <Button  
                id="button_h_o"
                href="/MainAdmin/Usermain/UserManage" variant="primary">
                  User  Manage
              </Button>
            </Card.Body>
          </Card></Col>
          </Row> 
        </Container>  
        <div style={{paddingTop:80}} className="Card1"> 
                <Button 
                  id="button_h_o"
                  href="/MainAdmin" variant="primary">
                  Back
                </Button> 
          </div> 
        </div>
      </div>
    </div>
  );
}

export default Usermain;
