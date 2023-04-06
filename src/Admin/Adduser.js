import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Main.css";
import { Space, Table, Tag } from "antd";
import { Card, Button, Alert, Col,Modal,Form, Row, Container } from "react-bootstrap";
import Home from "./../Home/Home";
import Navmas from "../Navmaster/Navmas";
import Staff from "./StaffCreate";
import Addcandidate from './Addcandidate';

var dataTable = [];

function Adduser() {
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const [password, setPassword] = useState([]);
  const tokenC = localStorage.getItem("token");

  
  const [lgShow, setLgShow] = useState(false);
  const [lgsShow, setLgsShow] = useState(false);

  const [nameuser , setNameuser] = useState("");
  const [lastnameuser , setLastnameuser] = useState("");
  const [mailuser , setMailuser] = useState("");
  const [passworduser , setPassworduser] = useState(""); 

  const [adminList, setAdminList] = useState([]); 
  const [nameevent, setNameevent] = useState([]); 
  const [checkevent, setCheckevent] = useState([]); 

  const eventnow = localStorage.getItem("event");

  const [namestaff, setNamestaff] = useState([]); 
  const [event_now, setEvent_now] = useState([]);
  const navi = useNavigate();

  const { Column, ColumnGroup } = Table;
  useEffect(() => { 
    check_authen();  
  },[]);

// CHECK AUTHEN -------------------------------------------------------------------
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
            console.log("res.data", res.data.message);
            showname();
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

// showname  -------------------------------------------------------------------

  const showname = (e) => { 
    Axios.post(`${window._env_.API_URL}/showadrole`, {
      eventnow: eventnow,
    })
    .then((res) => {
      setNamestaff(res.data.massage); 
      setEvent_now(eventnow); 
      console.log(res.data.massage);   
      console.log("data.User");   
      console.log("test = " , namestaff);    
      dataTable = [];
      for(var i = 0; i < res.data.massage.length;i++){
        dataTable.push({
        key : res.data.massage[i].User_id,
        Name : res.data.massage[i].Name,
        Surname : res.data.massage[i].Surname,
        Email : res.data.massage[i].Email
       }) 
      } 
      });  
  };

  // const adddata = () => {  
  //   dataTable = [];
  //   namestaff.map((item) => (
  //     dataTable.push({
  //      key : item.User_id,
  //      Name : item.Name,
  //      Surname : item.Surname,
  //      Email : item.Email
  //     }) 
  //   )) 
  // }  


// GEN PASSWORD ---------------------------------------------------- 

  const Checkadmin = (name , lastname , Email) => {
    setNameuser(name);
    setLastnameuser(lastname);
    console.log(name , lastname)
    setMailuser(Email);
    setLgShow(true)
  }

  const Check_staff = (name , lastname , Email) => {
    setNameuser(name);
    setLastnameuser(lastname);
    console.log(name , lastname)
    setMailuser(Email);
    setLgsShow(true)
    Axios.get(`${window._env_.API_URL}/showevent`).then((res) => {
      setNameevent(res.data.massage);
      console.log(res.data.massage);
      console.log("data.User");
    }); 
  }
 
//Add admin -----------------------------------------------------------
const add_admin = (e) => {  
  Axios.post(`${window._env_.API_URL}/createadmin`, { 
    mailuser: mailuser,
    passworduser: passworduser,
    nameuser :nameuser,
    lastnameuser :lastnameuser, 
  })
    .then((res) => {
      setAdminList([
        ...adminList,
        {
          mailuser: mailuser, 
          passworduser: passworduser, 
          nameuser :nameuser, 
          lastnameuser :lastnameuser, 
        }
      ])
      if(res.data.massage == "Values_insert"){
        alert("Add admin success");
        setLgShow(false); 
      } else {
        alert("Add admin fail");
        setLgShow(false); 
      }
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// add staff ----------------------------------------------------------
const add_staff = (e) => {  
  console.log("EventName == " , checkevent);
  console.log("EventName2 == " , nameevent);
  Axios.post(`${window._env_.API_URL}/createstaff`, { 
    mailuser: mailuser,
    passworduser: passworduser,
    nameuser :nameuser,
    lastnameuser :lastnameuser, 
    checkevent : checkevent,
  })
    .then((res) => {
      setAdminList([
        ...adminList,
        {
          mailuser: mailuser,
          passworduser: passworduser,
          nameuser :nameuser,
          lastnameuser :lastnameuser, 
          checkevent : checkevent, 
        }
      ])
      if(res.data.massage == "Values_insert"){
        alert("Add staff success");
        setLgsShow(false); 
      } else {
        alert("Add staff fail");
        setLgsShow(false); 
      }
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};



  return (
    <div>
      <Navmas head={"Main Menu"} role={login} />
      <div className="Mainadmin">
        <Card>
          <Card.Header>Setting Role </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p> สำหรับ Admin เพื่อการตั้งค่าผู้ที่มีส่วนเกี่ยวข้องกับการโหว {event_now} </p>
              <footer className="blockquote-footer">
                Power!!! <cite title="Source Title">title</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
        <div className="Main_Admin">
          <Card>
          <Card.Header as="h5">Detail Name List</Card.Header>
          <Card.Body>
            <Container>
              <Table dataSource={dataTable}>
              <Column title="#" dataIndex="key" key="key" />   
                <ColumnGroup title="Name">
                  <Column
                    title="First Name"
                    dataIndex="Name"
                    key="Name"
                  />
                  <Column title="Last Name" dataIndex="Surname" key="Surname" />
                </ColumnGroup>
                <Column title="Email" dataIndex="Email" key="Email" />  
                <ColumnGroup title="Roll">
                  <Column 
                    title="Add Admin"
                    key="Add Admin"
                    render={(_, record) => (
                      <Space size="small">
                        <Button  
                        onClick={() => Checkadmin(record.Name,record.Surname,record.Email)}
                        >Add Admin</Button>
                      </Space>
                    )}
                  />
                  <Column 
                    title="Add Staff" 
                    key="Add Staff"
                    render={(_, record) => (
                      <Space size="small">
                        <Button   onClick={() => Check_staff(record.Name,record.Surname,record.Email)}>
                          Add Staff</Button>
                      </Space>
                    )}
                  />   
                </ColumnGroup> 
              </Table>
              <Button   style ={{margintop: 50}} >Next Page</Button>  
            </Container> 
            </Card.Body>
          </Card>  
        </div>

        <Modal
        size="lg"
        show={lgShow}
        onHide={() => Checkadmin()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
            Modal Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
          <Form id="fromcan">
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>Name Admin</h3>
                  <Form.Control
                    type="email"
                    value={nameuser}
                    disabled={true}
                    placeholder="Candidate" 
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>LastName Admin</h3>
                  <Form.Control
                    type="email"
                    value={lastnameuser}
                    placeholder="Candidate"
                    disabled={true} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>Email</h3>
                  <Form.Control 
                  type="email"
                  value={mailuser}
                  placeholder="Email"
                  disabled={true}  
                  />
                </Form.Group>
            <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>Password</h3>
                  <Form.Control 
                    placeholder="password" 
                    onChange={(e) => {
                      setPassworduser(e.target.value);
                    }}
                  />
                </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            > 
            </Form.Group> 
          <Row>
            <Col>
            <Button
              variant="outline-secondary"
              id="button-addon2" 
              onClick={() => add_admin()}
            >
              ADD
            </Button> 
            </Col>
            <Col>
            <Button
              variant="outline-secondary"
              id="button-addon2" 
              onClick={() => setLgShow(false)}
            >
              Back
            </Button> 
            </Col>
          </Row> 
          </Form>
          </Container>
        </Modal.Body>
      </Modal> 


      <Modal
        size="lg"
        show={lgsShow}
        onHide={() => Check_staff()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
            Modal Staff
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
          <Form id="fromcan">
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>Name Staff</h3>
                  <Form.Control
                    type="email"
                    value={nameuser}
                    disabled={true}
                    placeholder="Candidate" 
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>LastName Staff</h3>
                  <Form.Control
                    type="email"
                    value={lastnameuser}
                    placeholder="Candidate"
                    disabled={true} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>Email</h3>
                  <Form.Control 
                  type="email"
                  value={mailuser}
                  placeholder="Email"
                  disabled={true}  
                  />
                </Form.Group> 
                <h3>Event</h3>
                <Form.Select aria-label="Default select example"
                onChange={(e) => {
                  setCheckevent(e.target.value);
                }}>
                  <option>Open this select menu</option>
                  {nameevent.map((item) => (
                    <option 
                      value={item.Event_name} 
                      >{item.Event_name}</option> 
                  ))} 
                </Form.Select>
            <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>Password</h3>
                  <Form.Control 
                    placeholder="password" 
                    onChange={(e) => {
                      setPassworduser(e.target.value);
                    }}
                  />
                </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            > 
            </Form.Group> 
          <Row>
            <Col>
            <Button
              variant="outline-secondary"
              id="button-addon2" 
              onClick={() => add_staff()}
            >
              ADD
            </Button> 
            </Col>
            <Col>
            <Button
              variant="outline-secondary"
              id="button-addon2" 
              onClick={() => setLgsShow(false)}
            >
              Back
            </Button> 
            </Col>
          </Row> 
          </Form>
          </Container>
        </Modal.Body>
      </Modal> 
      </div>
    </div>
  );
}

export default Adduser;
