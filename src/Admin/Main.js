import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Main.css";
import { Card, Button, Alert, Col, Row, Container } from "react-bootstrap";
import Home from "./../Home/Home";
import Navmas from "../Navmaster/Navmas";

function Main() {
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");
  useEffect(() => {
    check_authen();
    setInterval(() => {
      const dates = new Date();
      setClockState(dates.toLocaleTimeString());
    }, 1000);
  }, []);
  const [clockState, setClockState] = useState();
  const current = new Date();
  const date2 = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

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
            alert("กรุณาล็อคอินใหม่");
            localStorage.clear();
            window.location = "/";
          }
        } else if (tokenC != res.data.tokenC) {
          alert("กรุณาล็อคอินใหม่");
          localStorage.clear();
          window.location = "/";
          // window.location = "/";
        }
      })
      .catch((err) => {
        alert("กรุณาล็อคอินใหม่");
        localStorage.clear();
        window.location = "/";
        console.log("err");
      });
  };

  return (
    <div>
      <Navmas head={"Main Menu"} role={login} />
      <div className="Mainadmin">
        <Card style={{ borderColor: "#FF4B2B" }}>
          <Card.Header
            style={{
              color: "#ffffff",
              border: "3px solid #FF4B2B",
              backgroundColor: "#FF4B2B",
            }}
          >
            ยินดีต้อนรับ
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p> ระบบการเลือกตั้งออนไลน์ </p>
              <footer className="blockquote-footer" title="Source Title">
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
                <Card style={{ borderColor: "#FF4B2B", width: "30rem" }}>
                  <Card.Header>Event Main</Card.Header>
                  <Card.Body>
                    <Button
                      id="button_full_o"
                      href="/MainAdmin/Event"
                      variant="primary"
                    >
                      Event Main
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={{ span: 3, offset: 3 }}>
                <Card style={{ borderColor: "#FF4B2B", width: "30rem" }}>
                  <Card.Header>User Management</Card.Header>
                  <Card.Body>
                    <Button
                      id="button_full_o"
                      href="/MainAdmin/Usermain"
                      variant="primary"
                    >
                      User Management
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* <div className="Card1">
            <Card border="primary" style={{ width: "30rem" }}>
              <Card.Header>Create Event</Card.Header>
              <Card.Body>
                <Button href="/Event" variant="primary">
                  Create
                </Button>
              </Card.Body>
            </Card>
          </div> */}

          {/* <div className="Card2">
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Edit Event</Card.Header>
                <Card.Body>
                  <Button href="/Edit" variant="primary">
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </div>

            <div className="Card3">
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Submit Results</Card.Header>
                <Card.Body>
                  <Button href="/Submit" variant="primary">
                    Results
                  </Button>
                </Card.Body>
              </Card>
            </div> */}

          {/* <div className="Card4" class="col">
            <Card border="primary" style={{ width: "18rem" }}>
              <Card.Header>Create Staff</Card.Header>
              <Card.Body>
                <Button href="/Staff" variant="primary">
                  Create
                </Button>
              </Card.Body>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Main;
