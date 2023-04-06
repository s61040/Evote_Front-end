import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Main.css";
import { Card, Button, Alert, Col, Row, Container } from "react-bootstrap";
import Home from "./../Home/Home";
import Event from "./Eventcreate";
import Navmas from "../Navmaster/Navmas";

function Eventmain() {
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");

  const current = new Date();
  const date2 = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const [clockState, setClockState] = useState();

  useEffect(() => {
    check_authen();
    setInterval(() => {
      const dates = new Date();
      setClockState(dates.toLocaleTimeString());
    }, 1000);
  }, []);

  const checkeventstatus = () => {
    Axios.post(`${window._env_.API_URL}/Checkevent`, {
      date: date,
      clockState: clockState,
    }).then((res, err) => {
      if (err) {
        alert(err);
        console.log(err);
        console.log(res);
      } else {
        alert("OK");
      }
    });
  };

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
      <header >
        <Navmas head={"eventnow"} role={login} />
        {/* <h1 id="main"> Event </h1>

        <div id="Number">
          <p>{login}</p>
          <a href="/">Logout</a>
        </div> */}
      </header>
      <div className="Mainadmin">
        <Card style={{ borderColor: "#FF4B2B" }}>
          <Card.Header 
          style={{color:'#ffffff',border:'0.2px solid #f0806d',backgroundColor:'#FF4B2B' }}
          >Setting Election </Card.Header>
          <Card.Body  >
            <blockquote className="blockquote mb-0">
              <p>
                {" "}
                สำหรับ Admin และ Staff เพื่อการตั้งค่าการโหวตได้อย่างรวดเร็ว{" "}
              </p>
              <footer  title="Source Title">
                <cite title="Source Title">
                  <Row className="justify-content-md-center">
                    <Col xs lg="2">
                      {" "}
                      วันที่ : {date2}{" "}
                    </Col>
                    <Col xs lg="2">
                      {" "}
                      เวลา : {clockState}{" "}
                    </Col>
                  </Row>
                </cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
        <div className="Main_Admin">
          <Container>
            <Row>
              <Col md={4}>
                <Card   style={{ width: "30rem" ,borderColor: "#FF4B2B"}}>
                  <Card.Header>Event Management</Card.Header>
                  <Card.Body>
                    <Button
                      id="button_full_o"
                      href="/MainAdmin/Event/EventManagement"
                      variant="primary"
                    >
                      Event Management
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={{ span: 3, offset: 3 }}>
                <Card  style={{ width: "30rem",borderColor: "#FF4B2B" }}>
                  <Card.Header>History Event</Card.Header>
                  <Card.Body>
                    <Button
                      id="button_full_o"
                      href="/MainAdmin/Event/Eventstat"
                      variant="primary"
                    >
                      History Event
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <div style={{ paddingTop: 80 }} className="Card1">
            <Button id="button_h_o" href="/MainAdmin" variant="primary">
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eventmain;
