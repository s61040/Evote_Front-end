import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Addlist.css";
import {
  Card,
  Button,
  Alert,
  Col,
  Row,
  Container,
  Form,
} from "react-bootstrap";
import Home from "./../Home/Home";
import Event from "./Eventcreate";
import Navmas from "./../Navmaster/Navmas";
import axios from "axios";

function Adminmanage() {
  const [login, setLogin] = useState([]);

  const [name, setName] = useState([]);
  const [surname, setSurname] = useState([]);
  const [email, setEmail] = useState([]); 
  const [namelist, setNamelist] = useState([]);

  const [password, setPassword] = useState([]);
  const [password_C, setPassword_C] = useState([]);


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
            alert(res.data);
            setLogin(authen);
            Show_totaluser();
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

  const Add_list_check = () => {
    if ((password.length != 0, password_C.length != 0)) {
      if (password === password_C) {
        Axios.post(`${window._env_.API_URL}/C_admin`, {
          name: name,
          password: password,
          email: email,
        }).then((res, err) => {
          console.log(res.data, "sdas");
          if (res.data.Massage == "Can") {
            // console.log(name, surname);
            // Add_list();
          } else if (res.data.Massage == "CheckEmail") {
            alert("CheckEmail");
          } else if (res.data.Massage == "CheckName/Surname") {
            alert("Check Name/Surname");
          }
        });
      } else {
        alert("เช็ครหัสผ่านให้ตรงกัน");
      }
    } else {
      alert("Login fail");
    }
  };

  const Show_totaluser = () => {
    axios.get(`${window._env_.API_URL}/showadmin`).then((response) => {
      console.log("data = ", response.data.result);
      setName(response.data.result[0].Name);
      setEmail(response.data.result[0].Email);
    });
  };

//   const Add_list = () => {
//     Axios.post("http://localhost:3001/addnamelist", {
//       name: name,
//       surname: surname,
//       email: email,
//     })
//       .then((res, err) => {
//         console.log("Create");
//         setNamelist([
//           ...namelist,
//           {
//             name: name,
//             surname: surname,
//             email: email,
//           },
//         ]);
//         console.log("data", res.data);
//         alert("add User");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

  return (
    <div>
      <Navmas head={<h3> Addmin manage </h3>} role={login} />
      <div className="Mainadlist">
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
            <div class="row">
              <div class="col">
                <h4
                  style={{
                    color: "#ffffff" 
                  }}
                > Admin Manage From </h4>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Name">
                <Form.Label> ชื่อ Admin </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Name"
                  value={name}
                  disabled={true}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="Surname">
                    <Form.Label> Surname </Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Surname"
                        onChange={(e) => {
                            setSurname(e.target.value);
                          }}  
                    />
                </Form.Group> */}

              <Form.Group className="mb-3" controlId="Email">
                <Form.Label> Email สำหรับ admin </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  disabled={true}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <h2> แก้ไขรหัสผ่าน </h2>

              <Form.Group className="mb-3" controlId="Email">
                <Form.Label> ตั้งรหัสผ่าน </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="รหัสผ่านใหม่"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Email">
                <Form.Label> ยืนยันรหัสผ่าน </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ยืนยันรหัสผ่าน"
                  onChange={(e) => {
                    setPassword_C(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
            <div style={{ padding: 20 }}>
              <Row>
                <Col>
                  <Button
                    onClick={() => Add_list_check()}
                    type="submit"
                    id="button_h_o"
                    href={"/MainAdmin"}
                  >
                    Submit
                  </Button>
                </Col>
                <Col>
                  <Button href="/MainAdmin" id="button_h_o" >Back Page</Button>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Adminmanage;
