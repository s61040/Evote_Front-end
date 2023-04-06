import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Main.css";
import { Space, Table, Tag,Input } from "antd";
import { Card, Button, Alert, Col, Row, Container } from "react-bootstrap";
import Home from "./../Home/Home";
import Navmas from "../Navmaster/Navmas";
import Staff from "./StaffCreate";
import Addcandidate from './Addcandidate';

var dataTable = [];
var Check_adapar = 0;
const { Search } = Input;
const onSearch = (value) => console.log(value);

function Eventaddrole() {
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const [password, setPassword] = useState([]);
  const tokenC = localStorage.getItem("token");
  const [userlist, setUserlist] = useState([]);
  
  const [query, setQuery] = useState("");
  

  const eventnow = localStorage.getItem("event");
  const [namestaff, setNamestaff] = useState([]);
  const [totaluser, setTotaluser] = useState(0); 
  const [event_now, setEvent_now] = useState([]);
  const navi = useNavigate();

  const [lgShow, setLgShow] = useState(false);


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
            // alert(res.data);
            setLogin(authen);
            console.log("res.data", res.data.message);
            showname();
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

// showname  -------------------------------------------------------------------

  const showname = (e) => { 
    Axios.post(`${window._env_.API_URL}/showadrole2`, {
      eventnow: eventnow,
    })
    .then((res) => {
      setNamestaff(res.data.massage); 
      setEvent_now(eventnow); 
      console.log(res.data.massage);   
      console.log("data.User == " , res.data.massage);   
      console.log("test = " , namestaff);    
      dataTable = [];
      for(var i = 1; i < res.data.massage.length;i++){
        if(res.data.massage[i].Authem_admin == 'not'){
          Check_adapar = 1;
        }
        if(res.data.massage[i].Event == 'dupplicate'){
          Check_adapar =  1;
        }
        dataTable.push({
        key : res.data.massage[i].User_id,
        Name : res.data.massage[i].Name,
        Surname : res.data.massage[i].Surname,
        Email : res.data.massage[i].Email,
        Check : Check_adapar
       }) 
       Check_adapar = 0;
      } 
      });  
  };

  
// GEN PASSWORD ----------------------------------------------------
  const generatePassword = () => { 
    // Create a random password
        setPassword(Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)); 
  }

  

  const prepare_user = (key, Email) => {
    generatePassword();
    const Authen = "participant";
    if (event_now.length > 0 && Email.length > 0 && password.length > 0) {
      console.log("key = ", key, "Email = ", Email);
      console.log("password = ", password, "event_now = ", event_now);
      Axios.post(`${window._env_.API_URL}/addparticipant`, {
        key: key,
        Email: Email,
        password: password,
        event_now: event_now,
        Authen : Authen,
      })
        .then((res, err) => {
          if (res.data.massage == "datadup") {
            alert("NameList");
          } else {
            setUserlist([
              ...userlist,
              {
                key: key,
                Email: Email,
                password: password,
                event_now: event_now,
                Authen : Authen,
              },
            ]);
            alert("เพิ่มผู้มีสิทธิ์เลือกตั้ง");
            showname();
            setTotaluser(res.data.lengthdata);
            console.log("mail ==> ", Email);
            console.log("password ==> ", password);
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(event_now.length, Email.length);
      alert("กรุณาตรวจสอบข้อมูล");
    }
  };

  // const Addcandidate =(Name,Surname) => {
  //   localStorage.setItem('namecandidate',Name );
  //   localStorage.setItem('Surnamecandidate',Surname );
  //   navi('\AddCandidate');
  // }

  const Go_sum =() =>{
    navi('\Eventsum');
  }  
  return (
    <div>
      <Navmas head={"Main Menu"} role={login} />
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
          > {event_now} </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p> การจัดการผู้มีสิทธิ์เลือกตั้งสำหรับ</p>
              <footer className="blockquote-footer">
                การเลือกตั้ง = <cite title="Source Title">{event_now}</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
        <div className="Main_Admin">
          <Card
            style={{
              border: "0.2px solid #FF4B2B",
            }}
          >
          <Card.Header as="h5" 
             style={{
              color: "#ffffff",
              border: "3px solid #FF4B2B",
              backgroundColor: "#FF4B2B",
            }}
          >รายชื่อผู้ใช้งานระบบ</Card.Header>
          <Card.Body>
            <Container>
            <Input
              placeholder="input search text"
              allowClear 
              size="large"
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: 304,
                marginLeft: 1000,
              }} 
            /> 
              <Table
                style={{ 
                  marginTop: 20,
                }}   
                dataSource={dataTable.filter((item) => 
                item.Name.includes(query)
                )}>
              <Column title="#" dataIndex="key" key="key" />  
                  <Column
                    title="ชื่อ"
                    dataIndex="Name"
                    key="Name"
                  />
                  <Column title="นามสกุล" dataIndex="Surname" key="Surname" /> 
                <Column title="อีเมลล์" dataIndex="Email" key="Email" />   
                  <Column 
                    title="เพิ่มผู้มีสิทธ์เลือกตั้ง"
                    key="Check"
                    render={(_, record) => (
                      <Space size="small">
                        <Button 
                          id="button_full_o"
                          disabled = {record.Check}
                          onClick={() => prepare_user(record.key,record.Email)} 
                        >เพิ่มผู้มีสิทธ์เลือกตั้ง</Button>
                      </Space>
                    )}
                  /> 
              </Table>
              <Row>
                <Col> <Button id="button_h_o" href="/MainAdmin/Event/EventManagement/EventCreate"  style ={{margintop: 50}} >กลับ</Button> </Col>

                <Col> <Button id="button_h_o" onClick={() => Go_sum()}  style ={{margintop: 50}} >หน้าต่อไป</Button> </Col>
                </Row>
                 
            </Container> 
            </Card.Body>
          </Card>  
        </div>
      </div>
 
    </div>
  );
}

export default Eventaddrole;
