import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Main.css";
import { Card, Button, Alert, Col, Row, Container } from "react-bootstrap";
import Home from "./../Home/Home";
import Navmas_staff from "../Navmaster/Navmas_staff";

function Staffmain() {
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
            alert("กรุณาล็อคอินใหม่อีกครั้ง");
            localStorage.clear();
            window.location = "/";
          }
        } else if (tokenC != res.data.tokenC) {
          alert("กรุณาล็อคอินใหม่อีกครั้ง");
          localStorage.clear();
          window.location = "/";
          // window.location = "/";
        }
      })
      .catch((err) => {
        alert("กรุณาล็อคอินใหม่อีกครั้ง");
        localStorage.clear();
        window.location = "/";
        console.log("err");
      });
  };

  return (
    <div>
      <header id="H">
        <Navmas_staff head={"Staff Main"} role={login} />
      </header>
      <div className="Mainadmin">
        <Card
          style={{
            border: "0.2px solid #FF4B2B",
          }}
        >
          <Card.Header
            style={{
              color: "#ffffff",
              border: "3px solid #FF4B2B",
              backgroundColor: "#FF4B2B",
            }}
          >
            Setting Election{" "}
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {" "}
                สำหรับ Admin และ Staff เพื่อการตั้งค่าการโหวตได้อย่างรวดเร็ว{" "}
              </p>
              <footer className="blockquote-footer">
                {date2} {clockState} <cite title="Source Title">Title</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
        <div className="Main_Admin">
          <Container>
            <Row>
              <Col md={4}>
                <Card   style={{ border: "0.2px solid #FF4B2B", width: "30rem" }}>
                  <Card.Header
                     style={{
                      color: "#ffffff",
                      border: "3px solid #FF4B2B",
                      backgroundColor: "#FF4B2B",
                    }}
                  >จัดการกิจกรรมที่กำลังดำเนินอยู่ </Card.Header>
                  <Card.Body>
                    <Button id="button_h_o" href="/MainStaff/Eventmanage" variant="primary">
                      Event Management
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={{ span: 3, offset: 3 }}>
              <Card   style={{ border: "0.2px solid #FF4B2B", width: "30rem" }}>
                  <Card.Header
                     style={{
                      color: "#ffffff",
                      border: "3px solid #FF4B2B",
                      backgroundColor: "#FF4B2B",
                    }}>จัดการกิจกรรมที่หมดเวลาแล้ว</Card.Header>
                  <Card.Body>
                    <Button id="button_h_o" href="/MainStaff/historyevent" variant="primary">
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

export default Staffmain;
